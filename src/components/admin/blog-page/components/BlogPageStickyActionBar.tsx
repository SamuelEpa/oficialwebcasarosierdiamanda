"use client";

import { memo } from "react";
import Button from "@/components/ui/Button";
import type { BlogPageEditorState } from "../hooks/useBlogPageEditor";

function BlogPageStickyActionBarComponent({
  summaryMeta,
  isSaving,
  onPreview,
  onSaveDraft,
  onSavePublished,
}: Pick<BlogPageEditorState, "summaryMeta" | "isSaving"> & {
  onPreview: () => void;
  onSaveDraft: () => void;
  onSavePublished: () => void;
}) {
  const syncLabel =
    summaryMeta.syncStatus === "saving" || summaryMeta.syncStatus === "pending"
      ? "Sync…"
      : summaryMeta.syncStatus === "saved"
        ? "Sync OK"
        : summaryMeta.syncStatus === "error"
          ? "Sync error"
          : null;
  const metaLine = `${summaryMeta.publishedCount} artículos · ${summaryMeta.featuredCount} destacados · ${summaryMeta.ideaLabel} · ${summaryMeta.faqLabel}${syncLabel ? ` · ${syncLabel}` : ""}`;

  return (
    <div className="admin-sticky-actionbar">
      <span className="admin-sticky-actionbar__meta hidden sm:inline">{metaLine}</span>
      <Button type="button" variant="ghost" className="secondary-btn !h-10" onClick={onPreview}>
        Vista previa
      </Button>
      <Button type="button" variant="ghost" className="secondary-btn !h-10" onClick={onSaveDraft} disabled={isSaving}>
        {isSaving ? "Guardando…" : "Borrador"}
      </Button>
      <Button type="button" variant="solid" className="primary-btn !h-10" onClick={onSavePublished} disabled={isSaving}>
        {isSaving ? "Publicando…" : "Publicar"}
      </Button>
    </div>
  );
}

export const BlogPageStickyActionBar = memo(BlogPageStickyActionBarComponent);
