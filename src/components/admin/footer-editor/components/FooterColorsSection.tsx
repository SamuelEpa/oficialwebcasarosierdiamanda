"use client";

import { memo } from "react";
import ColorPickerField from "@/components/admin/ColorPickerField";
import { SectionCard } from "@/components/admin/class-edit/components/SectionCard";
import type { FooterEditorFormState } from "../hooks/useFooterEditorForm";

function FooterColorsSectionComponent({
  form,
  embedded = false,
}: {
  form: FooterEditorFormState;
  embedded?: boolean;
}) {
  const { buttonBackgroundColor, setButtonBackgroundColor, buttonContentColor, setButtonContentColor } = form;

  return (
    <SectionCard
      compact={embedded}
      title={embedded ? undefined : "Colores"}
      description={
        embedded
          ? undefined
          : "Afectan al botón del formulario de contacto y a los botones de redes sociales."
      }
    >
      <div className="cms-footer-color-grid">
        <ColorPickerField
          label="Color de botón (background)"
          value={buttonBackgroundColor}
          onChange={setButtonBackgroundColor}
        />
        <ColorPickerField label="Color de texto e iconos" value={buttonContentColor} onChange={setButtonContentColor} />
      </div>
    </SectionCard>
  );
}

export const FooterColorsSection = memo(FooterColorsSectionComponent);
