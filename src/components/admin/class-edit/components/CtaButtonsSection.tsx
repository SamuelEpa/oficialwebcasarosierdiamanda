"use client";

import { AdminInput } from "@/components/ui/AdminField";
import type { Offering } from "@/lib/cms/types";
import type { ClassEditFormState } from "../hooks/useClassEditForm";
import { useBasicTabFields } from "../hooks/useBasicTabFields";
import { CtaTogglePanel } from "./CtaTogglePanel";
import { SectionCard } from "./SectionCard";

type CtaButtonsSectionProps = {
  offering: Offering;
  form: ClassEditFormState;
};

export function CtaButtonsSection({ offering, form }: CtaButtonsSectionProps) {
  const { details, updateDetails } = form;
  const {
    consultLabelPlaceholder,
    enrollLabelPlaceholder,
    ctaHrefPlaceholder,
  } = useBasicTabFields(form, offering);

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
          onCheckedChange={(checked) => updateDetails({ showConsultCta: checked })}
        >
          <AdminInput
            label="Texto del botón"
            value={details.ctaConsultLabel}
            placeholder={consultLabelPlaceholder}
            help="Texto final visible en la página pública."
            onChange={(event) => updateDetails({ ctaConsultLabel: event.target.value })}
          />
          <AdminInput
            label="URL de Consultar"
            value={details.ctaConsultHref}
            placeholder={ctaHrefPlaceholder}
            help="Destino del botón principal."
            onChange={(event) => updateDetails({
              ctaConsultHref: event.target.value,
              ctaHref: event.target.value,
            })}
          />
        </CtaTogglePanel>

        <CtaTogglePanel
          checked={details.showEnrollCta}
          label="Mostrar Inscribirme"
          description="Controla el CTA final de la ficha pública."
          onCheckedChange={(checked) => updateDetails({ showEnrollCta: checked })}
        >
          <AdminInput
            label="Texto del botón"
            value={details.ctaEnrollLabel}
            placeholder={enrollLabelPlaceholder}
            help="Texto final visible en la página pública."
            onChange={(event) => updateDetails({ ctaEnrollLabel: event.target.value })}
          />
          <AdminInput
            label="URL de Inscribirme"
            value={details.ctaEnrollHref}
            placeholder={ctaHrefPlaceholder}
            help="Destino del CTA final."
            onChange={(event) => updateDetails({ ctaEnrollHref: event.target.value })}
          />
        </CtaTogglePanel>
      </div>
    </SectionCard>
  );
}
