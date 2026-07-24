"use client";

import { memo } from "react";
import Button from "@/components/ui/Button";
import type { FooterEditorFormState } from "../hooks/useFooterEditorForm";

function FooterEditorStickyBarComponent({ form }: { form: FooterEditorFormState }) {
  const { socialLinks, isSaving, error, includesContactForm } = form;
  const count = socialLinks.length;

  return (
    <div className="admin-sticky-actionbar cms-footer-editor-sticky">
      <div className="admin-sticky-actionbar__meta cms-footer-editor-sticky__meta">
        <span>
          {count} {count === 1 ? "red social" : "redes sociales"}
        </span>
        {includesContactForm ? <span>Footer + formulario de contacto</span> : <span>Footer global</span>}
        {error ? <span className="text-error">{error}</span> : null}
      </div>
      <Button type="submit" disabled={isSaving} aria-busy={isSaving}>
        {isSaving
          ? "Publicando…"
          : includesContactForm
            ? "Publicar footer y formulario"
            : "Publicar cambios"}
      </Button>
    </div>
  );
}

export const FooterEditorStickyBar = memo(FooterEditorStickyBarComponent);
