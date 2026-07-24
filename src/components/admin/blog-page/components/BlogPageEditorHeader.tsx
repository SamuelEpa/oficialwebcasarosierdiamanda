"use client";

import { memo } from "react";
import Link from "@/components/admin/AdminLink";
import Button from "@/components/ui/Button";
import type { BlogPageEditorState } from "../hooks/useBlogPageEditor";

function BlogPageEditorHeaderComponent({
  status,
  summaryMeta,
  isSaving,
  onSaveDraft,
  onSavePublished,
}: {
  status: BlogPageEditorState["status"];
  summaryMeta: BlogPageEditorState["summaryMeta"];
  isSaving: boolean;
  onSaveDraft: () => void;
  onSavePublished: () => void;
}) {
  return (
    <header className="cms-page-editor-head">
      <div className="cms-page-editor-head__main">
        <p className="auth-kicker mb-1">CMS · Página</p>
        <h1>Bitácora</h1>
        <p className="text-body-md text-on-surface-variant">Edición personalizada de la página de blog</p>
        <div className="cms-page-editor-meta mt-3 flex flex-wrap gap-2" aria-label="Resumen de página">
          <span className={`status-pill status-pill--${status}`}>{status}</span>
          <span className="rounded-full bg-surface-container-high px-3 py-1 text-label-md text-on-surface-variant">
            {summaryMeta.publishedCount} artículos publicados
          </span>
          <span className="rounded-full bg-surface-container-high px-3 py-1 text-label-md text-on-surface-variant">
            {summaryMeta.featuredCount} destacados
          </span>
          <span className="rounded-full bg-surface-container-high px-3 py-1 text-label-md text-on-surface-variant">
            {summaryMeta.ideaLabel}
          </span>
          <span className="rounded-full bg-surface-container-high px-3 py-1 text-label-md text-on-surface-variant">
            {summaryMeta.faqLabel}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-label-md ${
              summaryMeta.syncStatus === "error"
                ? "bg-error-container text-on-error-container"
                : summaryMeta.syncStatus === "saving" || summaryMeta.syncStatus === "pending"
                  ? "bg-secondary-container/40 text-secondary"
                  : "bg-surface-container-high text-on-surface-variant"
            }`}
            title={summaryMeta.syncError ?? undefined}
          >
            {summaryMeta.syncStatus === "pending"
              ? "Pendiente de sync"
              : summaryMeta.syncStatus === "saving"
                ? "Sincronizando…"
                : summaryMeta.syncStatus === "saved"
                  ? "Sincronizado"
                  : summaryMeta.syncStatus === "error"
                    ? "Error al sincronizar"
                    : "Listo"}
          </span>
        </div>
      </div>
      <div className="cms-page-editor-actions flex flex-wrap items-center gap-2">
        <Link className="secondary-btn" href="/admin">
          Volver
        </Link>
        <Button type="button" variant="ghost" className="secondary-btn cms-outline-accent !h-10" onClick={onSaveDraft} disabled={isSaving}>
          {isSaving ? "Guardando…" : "Borrador"}
        </Button>
        <Button type="button" variant="solid" className="primary-btn !h-10" onClick={onSavePublished} disabled={isSaving}>
          {isSaving ? "Publicando…" : "Publicar"}
        </Button>
      </div>
    </header>
  );
}

export const BlogPageEditorHeader = memo(BlogPageEditorHeaderComponent);
