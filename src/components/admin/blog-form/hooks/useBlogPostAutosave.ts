"use client";

import { useEffect, useRef, useState } from "react";
import { saveBlogPostAction } from "@/lib/admin/bitacora-actions";
import type { BlogPostStatus } from "@/lib/cms/types";
import { buildBlogPostSavePayload, type BlogPostFormFields } from "../utils/blogPostPayload";

export type BlogPostSyncStatus = "idle" | "pending" | "saving" | "saved" | "error";

const AUTOSAVE_DELAY_MS = 800;

export function useBlogPostAutosave(
  mode: "create" | "edit",
  postId: string | undefined,
  fields: BlogPostFormFields,
  status: BlogPostStatus,
  enabled: boolean,
) {
  const [syncStatus, setSyncStatus] = useState<BlogPostSyncStatus>("idle");
  const [syncError, setSyncError] = useState<string | null>(null);
  const skipFirst = useRef(true);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latest = useRef({ fields, status, postId });
  latest.current = { fields, status, postId };

  useEffect(() => {
    if (!enabled || mode !== "edit" || !postId) return;

    if (skipFirst.current) {
      skipFirst.current = false;
      return;
    }

    if (!fields.title.trim()) return;

    setSyncStatus("pending");
    setSyncError(null);

    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      setSyncStatus("saving");
      const payload = buildBlogPostSavePayload(latest.current.fields, latest.current.status);
      const result = await saveBlogPostAction("edit", latest.current.postId, payload);
      if (result.ok) {
        setSyncStatus("saved");
        setSyncError(null);
      } else {
        setSyncStatus("error");
        setSyncError(result.error);
      }
    }, AUTOSAVE_DELAY_MS);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [
    enabled,
    mode,
    postId,
    fields.title,
    fields.slug,
    fields.excerpt,
    fields.listingExcerpt,
    fields.featuredImageId,
    fields.categoryMode,
    fields.customCategory,
    fields.visibleInListing,
    fields.sortOrder,
    fields.tagsInput,
    fields.seoTitle,
    fields.seoDescription,
    fields.seoImage,
    fields.hero,
    fields.blocks,
    status,
  ]);

  return { syncStatus, syncError };
}
