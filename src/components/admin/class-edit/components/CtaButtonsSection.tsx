"use client";

import { memo } from "react";
import { AdminInput } from "@/components/ui/AdminField";
import type { Offering } from "@/lib/cms/types";
import type { ClassEditFormState } from "../hooks/useClassEditForm";
import { useCtaSectionHandlers } from "../hooks/useCtaSectionHandlers";
import { CtaTogglePanel } from "./CtaTogglePanel";
import { SectionCard } from "./SectionCard";

type CtaButtonsSectionProps = {
  offering: Pick<Offering, "type">;
  form: ClassEditFormState;
};

function CtaButtonsSectionComponent({ offering, form }: CtaButtonsSectionProps) {
  const {
    details,
    placeholders,
    setShowConsultCta,
    setShowEnrollCta,
    setConsultLabel,
    setConsultHref,
    setEnrollLabel,
    setEnrollHref,
  } = useCtaSectionHandlers(form, offering);

  return (
    <SectionCard
      compact
      description="Define a dónde dirige cada botón de la página pública. Si un campo queda vacío, se usará WhatsApp."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <CtaTogglePanel
          checked={details.showConsultCta}
          label="Mostrar Consultar / Comprar"
          description="Controla el botón principal dentro de la ficha pública."
          onCheckedChange={setShowConsultCta}
        >
          <AdminInput
            label="Texto del botón"
            value={details.ctaConsultLabel}
            placeholder={placeholders.consultLabelPlaceholder}
            help="Texto final visible en la página pública."
            onChange={(event) => setConsultLabel(event.target.value)}
          />
          <AdminInput
            label="URL de Consultar"
            value={details.ctaConsultHref}
            placeholder={placeholders.ctaHrefPlaceholder}
            help="Destino del botón principal."
            onChange={(event) => setConsultHref(event.target.value)}
          />
        </CtaTogglePanel>

        <CtaTogglePanel
          checked={details.showEnrollCta}
          label="Mostrar Inscribirme"
          description="Controla el CTA final de la ficha pública."
          onCheckedChange={setShowEnrollCta}
        >
          <AdminInput
            label="Texto del botón"
            value={details.ctaEnrollLabel}
            placeholder={placeholders.enrollLabelPlaceholder}
            help="Texto final visible en la página pública."
            onChange={(event) => setEnrollLabel(event.target.value)}
          />
          <AdminInput
            label="URL de Inscribirme"
            value={details.ctaEnrollHref}
            placeholder={placeholders.ctaHrefPlaceholder}
            help="Destino del CTA final."
            onChange={(event) => setEnrollHref(event.target.value)}
          />
        </CtaTogglePanel>
      </div>
    </SectionCard>
  );
}

export const CtaButtonsSection = memo(CtaButtonsSectionComponent);
