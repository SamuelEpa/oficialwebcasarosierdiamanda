"use client";

import { memo } from "react";
import Button from "@/components/ui/Button";
import type { StudioPageEditorState } from "../hooks/useStudioPageEditor";

function StudioPageStickyActionBarComponent({
  summaryMeta,
  isSaving,
  onPreview,
  onSaveDraft,
  onSavePublished,
}: Pick<StudioPageEditorState, "summaryMeta" | "isSaving"> & {
  onPreview: () => void;
  onSaveDraft: () => void;
  onSavePublished: () => void;
}) {
  const metaLine = `${summaryMeta.publishedCount} especialistas publicados · ${summaryMeta.ideaLabel} · ${summaryMeta.faqLabel}`;

  return (
    <div className="admin-sticky-actionbar">
      <span className="admin-sticky-actionbar__meta hidden sm:inline">{metaLine}</span>
      <Button type="button" variant="ghost" className="secondary-btn !h-10" onClick={onPreview}>
        Vista previa
      </Button>
      <Button
        type="button"
        variant="ghost"
        className="secondary-btn !h-10"
        onClick={onSaveDraft}
        disabled={isSaving}
      >
        {isSaving ? "Guardando…" : "Borrador"}
      </Button>
      <Button
        type="button"
        variant="solid"
        className="primary-btn !h-10"
        onClick={onSavePublished}
        disabled={isSaving}
      >
        {isSaving ? "Publicando…" : "Publicar"}
      </Button>
    </div>
  );
}

export const StudioPageStickyActionBar = memo(StudioPageStickyActionBarComponent);
