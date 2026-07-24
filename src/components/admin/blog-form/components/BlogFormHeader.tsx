"use client";

import { memo } from "react";
import Link from "@/components/admin/AdminLink";
import Button from "@/components/ui/Button";
import { BITACORA_LIST_ADMIN_PATH } from "@/lib/admin/bitacora-actions";
import type { BlogPostFormState } from "../hooks/useBlogPostForm";

function BlogFormHeaderComponent({
  editorTitle,
  status,
  readingTime,
  visibleBlockCount,
  syncStatus,
  syncError,
  isSaving,
  onSaveDraft,
  onSavePublished,
}: {
  editorTitle: string;
  status: BlogPostFormState["status"];
  readingTime: number;
  visibleBlockCount: number;
  syncStatus: BlogPostFormState["syncStatus"];
  syncError: string | null;
  isSaving: boolean;
  onSaveDraft: () => void;
  onSavePublished: () => void;
}) {
  return (
    <header className="cms-page-editor-head">
      <div className="cms-page-editor-head__main">
        <p className="auth-kicker mb-1">CMS · Artículo</p>
        <h1>{editorTitle}</h1>
        <p className="text-body-md text-on-surface-variant">Edición de entrada de bitácora</p>
        <div className="cms-page-editor-meta mt-3 flex flex-wrap gap-2" aria-label="Resumen del artículo">
          <span className={`status-pill status-pill--${status}`}>{status}</span>
          <span className="rounded-full bg-surface-container-high px-3 py-1 text-label-md text-on-surface-variant">
            {readingTime} min de lectura
          </span>
          <span className="rounded-full bg-surface-container-high px-3 py-1 text-label-md text-on-surface-variant">
            {visibleBlockCount} bloques visibles
          </span>
          <span
            className={`rounded-full px-3 py-1 text-label-md ${
              syncStatus === "error"
                ? "bg-error-container text-on-error-container"
                : syncStatus === "saving" || syncStatus === "pending"
                  ? "bg-secondary-container/40 text-secondary"
                  : syncStatus === "saved"
                    ? "bg-surface-container-high text-on-surface-variant"
                    : "bg-surface-container-high text-on-surface-variant"
            }`}
            title={syncError ?? undefined}
          >
            {syncStatus === "pending"
              ? "Pendiente de sync"
              : syncStatus === "saving"
                ? "Sincronizando…"
                : syncStatus === "saved"
                  ? "Sincronizado"
                  : syncStatus === "error"
                    ? "Error al sincronizar"
                    : "Listo"}
          </span>
        </div>
      </div>
      <div className="cms-page-editor-actions flex flex-wrap items-center gap-2">
        <Link className="secondary-btn" href={BITACORA_LIST_ADMIN_PATH}>
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

export const BlogFormHeader = memo(BlogFormHeaderComponent);
