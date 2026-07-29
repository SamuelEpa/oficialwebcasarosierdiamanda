"use client";

import { memo } from "react";
import { CmsRichTextField } from "@/components/admin/CmsRichTextField";
import Card from "@/components/ui/Card";
import type { StudioPageEditorState } from "../hooks/useStudioPageEditor";

function StudioPageContentSectionComponent({
  introHeading,
  setIntroHeading,
  introContent,
  setIntroContent,
  introContentTypography,
  setIntroContentTypography,
}: Pick<
  StudioPageEditorState,
  | "introHeading"
  | "setIntroHeading"
  | "introContent"
  | "setIntroContent"
  | "introContentTypography"
  | "setIntroContentTypography"
>) {
  return (
    <Card padding="lg" className="form-block cms-editor-card rounded-2xl space-y-6">
      <div className="cms-editor-card__head">
        <p className="auth-kicker">Paso 3</p>
        <h3 className="text-headline-sm text-on-surface">Introducción del equipo</h3>
        <p className="text-body-md text-on-surface-variant mt-1">
          Columna izquierda: titular editorial. Columna derecha: texto de apoyo.
        </p>
      </div>
      <label className="field block">
        <span className="field__label">Titular (columna izquierda)</span>
        <textarea
          className="field__input min-h-[96px]"
          value={introHeading}
          onChange={(event) => setIntroHeading(event.target.value)}
          placeholder="Quienes hacen posible el taller"
        />
      </label>
      <CmsRichTextField
        label="Texto de apoyo (columna derecha)"
        value={introContent}
        typography={introContentTypography}
        minHeight="280px"
        onChange={setIntroContent}
        onTypographyChange={setIntroContentTypography}
      />
    </Card>
  );
}

export const StudioPageContentSection = memo(StudioPageContentSectionComponent);
