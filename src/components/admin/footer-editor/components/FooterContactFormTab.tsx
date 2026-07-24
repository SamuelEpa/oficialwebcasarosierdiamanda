"use client";

import Link from "next/link";
import { memo } from "react";
import type { FooterContactFormEditor } from "../hooks/useFooterContactFormEditor";
import { FooterContactFormFieldsSection } from "./contact-form/FooterContactFormSections";

function FooterContactFormTabComponent({ contact }: { contact: FooterContactFormEditor }) {
  return (
    <div id="formulario-contacto" className="cms-footer-editor-form-tab">
      <FooterContactFormFieldsSection contact={contact} embedded />
      <p className="text-label-md text-on-surface-variant">
        Mensaje de éxito, redirección y notificaciones por email se configuran en{" "}
        <Link
          href={`/admin/formularios/${contact.formId}/edit`}
          className="text-primary underline-offset-2 hover:underline"
        >
          Formularios → Envío y notificaciones
        </Link>
        . No aparecen en la vista previa del footer.
      </p>
    </div>
  );
}

export const FooterContactFormTab = memo(FooterContactFormTabComponent);
