"use client";

import { useEffect, useRef, useState } from "react";
import { saveBlogPageSettingsAction, type BlogPageSavePayload } from "@/lib/admin/blog-page-actions";

export type BlogPageSyncStatus = "idle" | "pending" | "saving" | "saved" | "error";

const AUTOSAVE_DELAY_MS = 750;

export function useBlogPageAutosave(payload: BlogPageSavePayload, enabled = true) {
  const [syncStatus, setSyncStatus] = useState<BlogPageSyncStatus>("idle");
  const [syncError, setSyncError] = useState<string | null>(null);
  const skipFirst = useRef(true);
  const latestPayload = useRef(payload);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  latestPayload.current = payload;

  useEffect(() => {
    if (!enabled) return;

    if (skipFirst.current) {
      skipFirst.current = false;
      return;
    }

    setSyncStatus("pending");
    setSyncError(null);

    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      setSyncStatus("saving");
      const result = await saveBlogPageSettingsAction(latestPayload.current);
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
    payload.status,
    payload.hero,
    payload.showIdeaPromptSection,
    payload.showFaqSection,
    payload.faqGroupId,
    payload.seo_title,
    payload.seo_description,
    payload.seo_image,
  ]);

  return { syncStatus, syncError };
}
