"use client";

import type { Offering } from "@/lib/cms/types";
import type { ClassEditFormState } from "../hooks/useClassEditForm";
import { HomeCardEditorSection } from "../components/HomeCardEditorSection";
import { HomeCardPreviewPanel } from "../components/HomeCardPreviewPanel";

type HomeTabProps = {
  offering: Offering;
  form: ClassEditFormState;
};

export function ClassEditHomeTab({ offering, form }: HomeTabProps) {
  return (
    <div className="class-edit-home-layout">
      <div className="class-edit-home-main">
        <header className="class-edit-home-main__head">
          <p className="class-edit-home-main__kicker">Tarjeta para Home</p>
          <h2 className="class-edit-home-main__title">Tarjeta destacada de portada</h2>
          <p className="class-edit-home-main__description">
            Configura imagen, textos y tipografía de la tarjeta que puede aparecer en la sección de destacados del inicio.
          </p>
        </header>
        <HomeCardEditorSection offering={offering} form={form} />
      </div>

      <aside className="class-edit-home-preview" aria-label="Vista previa de tarjeta Home">
        <HomeCardPreviewPanel offering={offering} form={form} />
      </aside>
    </div>
  );
}
