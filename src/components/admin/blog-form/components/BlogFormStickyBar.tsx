"use client";

import { memo } from "react";
import Button from "@/components/ui/Button";
import type { BlogPostFormState } from "../hooks/useBlogPostForm";

function BlogFormStickyBarComponent({
  readingTime,
  visibleBlockCount,
  syncStatus,
  isSaving,
  onPreview,
  onSaveDraft,
  onSavePublished,
}: {
  readingTime: number;
  visibleBlockCount: number;
  syncStatus: BlogPostFormState["syncStatus"];
  isSaving: boolean;
  onPreview: () => void;
  onSaveDraft: () => void;
  onSavePublished: () => void;
}) {
  const syncHint =
    syncStatus === "saving" || syncStatus === "pending" ? " · sync…" : syncStatus === "saved" ? " · sync OK" : "";

  return (
    <div className="admin-sticky-actionbar">
      <span className="admin-sticky-actionbar__meta hidden sm:inline">
        {readingTime} min · {visibleBlockCount} bloques{syncHint}
      </span>
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

export const BlogFormStickyBar = memo(BlogFormStickyBarComponent);
