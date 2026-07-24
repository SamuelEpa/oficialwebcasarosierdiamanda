"use client";

import Link from "next/link";
import { memo } from "react";
import { SectionCard } from "@/components/admin/class-edit/components/SectionCard";
import type { FooterEditorFormState } from "../hooks/useFooterEditorForm";

function FooterContactSectionComponent({
  form,
  embedded = false,
}: {
  form: FooterEditorFormState;
  embedded?: boolean;
}) {
  const {
    contactTitle,
    setContactTitle,
    contactText,
    setContactText,
    address,
    setAddress,
    mapUrl,
    setMapUrl,
    singleton,
  } = form;

  return (
    <div className="cms-footer-editor-contact-stack">
      <SectionCard
        compact={embedded}
        title={embedded ? undefined : "Bloque de información"}
        description={
          embedded
            ? undefined
            : "Lo que ves a la derecha en la vista previa. El texto admite saltos de línea; la última línea es el título sobre las redes."
        }
      >
        <div className="cms-footer-editor-fields grid gap-4 md:grid-cols-2">
          <label className="field md:col-span-2">
            <span>Título del bloque</span>
            <input value={contactTitle} onChange={(event) => setContactTitle(event.target.value)} />
          </label>
          <label className="field md:col-span-2">
            <span>Texto visible (teléfono, horario, etc.)</span>
            <textarea
              rows={6}
              value={contactText}
              onChange={(event) => setContactText(event.target.value)}
              className="min-h-[140px] resize-y"
            />
          </label>
          <label className="field md:col-span-2">
            <span>Dirección corta (opcional)</span>
            <input
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Barcelona, España"
            />
            <span className="text-label-md text-on-surface-variant">
              Si la rellenas, se muestra como línea extra bajo el texto (además del contenido del textarea).
            </span>
          </label>
          <label className="field md:col-span-2">
            <span>Enlace Google Maps</span>
            <input
              type="url"
              value={mapUrl}
              onChange={(event) => setMapUrl(event.target.value)}
              placeholder="https://maps.google.com/..."
            />
            <span className="text-label-md text-on-surface-variant">
              Muestra el enlace «Ver en Google Maps» en la vista previa.
              {singleton
                ? " Al publicar, la dirección y el mapa se copian también a Configuración global → Contacto (como respaldo del sitio)."
                : null}
            </span>
          </label>
        </div>
      </SectionCard>

      {singleton ? (
        <p className="text-label-md text-on-surface-variant">
          Email, teléfono y WhatsApp del sitio se editan en{" "}
          <Link href="/admin/settings" className="text-primary underline-offset-2 hover:underline">
            Configuración global → Contacto
          </Link>
          . No aparecen en el footer público; usa el «Texto visible» de arriba.
        </p>
      ) : null}
    </div>
  );
}

export const FooterContactSection = memo(FooterContactSectionComponent);
