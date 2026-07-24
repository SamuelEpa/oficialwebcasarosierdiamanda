"use client";

import { memo } from "react";
import { SectionCard } from "@/components/admin/class-edit/components/SectionCard";
import type { FooterEditorFormState } from "../hooks/useFooterEditorForm";

function FooterGeneralSectionComponent({
  form,
  embedded = false,
}: {
  form: FooterEditorFormState;
  embedded?: boolean;
}) {
  const { name, setName } = form;

  return (
    <SectionCard
      compact={embedded}
      title={embedded ? undefined : "Información general"}
      description={embedded ? undefined : "Nombre interno para identificar este footer en el CMS."}
    >
      <label className="field span-2">
        <span>Nombre</span>
        <input value={name} onChange={(event) => setName(event.target.value)} autoComplete="off" />
      </label>
    </SectionCard>
  );
}

export const FooterGeneralSection = memo(FooterGeneralSectionComponent);
