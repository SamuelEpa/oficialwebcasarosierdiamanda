"use client";

import { memo } from "react";
import Link from "@/components/admin/AdminLink";
import Button from "@/components/ui/Button";
import type { StudioPageEditorState } from "../hooks/useStudioPageEditor";

function StudioPageEditorHeaderComponent({
  status,
  summaryMeta,
  isSaving,
  onSaveDraft,
  onSavePublished,
}: {
  status: StudioPageEditorState["status"];
  summaryMeta: StudioPageEditorState["summaryMeta"];
  isSaving: boolean;
  onSaveDraft: () => void;
  onSavePublished: () => void;
}) {
  return (
    <header className="cms-page-editor-head">
      <div className="cms-page-editor-head__main">
        <p className="auth-kicker mb-1">CMS · Página</p>
        <h1>El Estudio</h1>
        <p className="text-body-md text-on-surface-variant">Edición personalizada de página del estudio</p>
        <div className="cms-page-editor-meta mt-3 flex flex-wrap gap-2" aria-label="Resumen de página">
          <span className={`status-pill status-pill--${status}`}>{status}</span>
          <span className="rounded-full bg-surface-container-high px-3 py-1 text-label-md text-on-surface-variant">
            {summaryMeta.publishedCount} especialistas publicados
          </span>
          <span className="rounded-full bg-surface-container-high px-3 py-1 text-label-md text-on-surface-variant">
            {summaryMeta.ideaLabel}
          </span>
          <span className="rounded-full bg-surface-container-high px-3 py-1 text-label-md text-on-surface-variant">
            {summaryMeta.faqLabel}
          </span>
        </div>
      </div>
      <div className="cms-page-editor-actions flex flex-wrap items-center gap-2">
        <Link className="secondary-btn" href="/admin">
          Volver
        </Link>
        <Button
          type="button"
          variant="ghost"
          className="secondary-btn cms-outline-accent !h-10"
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
    </header>
  );
}

export const StudioPageEditorHeader = memo(StudioPageEditorHeaderComponent);
