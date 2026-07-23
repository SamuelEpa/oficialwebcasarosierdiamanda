"use client";

import { AdminInput } from "@/components/ui/AdminField";
import { AdminRichTextField } from "@/components/ui/AdminRichTextField";
import {
  DEFAULT_DESCRIPTION_TYPOGRAPHY,
  DEFAULT_RICH_TEXT_TYPOGRAPHY,
  normalizeRichTextTypography,
} from "@/lib/cms/rich-text-typography";
import type { Offering } from "@/lib/cms/types";
import { DETAIL_PAGE_RICH_TEXT_CONTROLS } from "../constants/rich-text-controls";
import type { ClassEditFormState } from "../hooks/useClassEditForm";
import { useBasicTabFields } from "../hooks/useBasicTabFields";
import { SectionCard } from "./SectionCard";

type BasicInfoSectionProps = {
  offering: Offering;
  form: ClassEditFormState;
};

export function BasicInfoSection({ offering, form }: BasicInfoSectionProps) {
  const { title, slug, subtitle, description, details, errors } = form;
  const {
    handleSlugBlur,
    handleTitleChange,
    handleSlugChange,
    handleSubtitleChange,
    handleDescriptionChange,
    updateDetails,
  } = useBasicTabFields(form, offering);

  const subtitleTypography = normalizeRichTextTypography(details.subtitleTypography ?? DEFAULT_RICH_TEXT_TYPOGRAPHY);
  const detailQuestionTypography = normalizeRichTextTypography(details.detailQuestionTypography ?? DEFAULT_RICH_TEXT_TYPOGRAPHY);
  const highlightTypography = normalizeRichTextTypography(details.highlightDescriptionTypography ?? DEFAULT_RICH_TEXT_TYPOGRAPHY);
  const descriptionTypography = normalizeRichTextTypography(details.descriptionTypography ?? DEFAULT_DESCRIPTION_TYPOGRAPHY);

  return (
    <SectionCard compact>
      <div className="class-edit-field-grid class-edit-field-grid--identity">
        <AdminInput
          label="Título del menú"
          required
          value={details.menuTitle}
          error={errors.menuTitle}
          validationKey="menuTitle"
          help="Nombre visible de esta página dentro del menú público."
          onChange={(event) => updateDetails({ menuTitle: event.target.value })}
        />
        <AdminInput
          label="Slug"
          required
          value={slug}
          error={errors.slug}
          validationKey="slug"
          help="Si el slug ya existe, se agregará automáticamente un número al final."
          onChange={(event) => handleSlugChange(event.target.value)}
        />
        <AdminInput
          label="Etiqueta interna"
          required
          value={title}
          error={errors.title}
          validationKey="title"
          help="Nombre administrativo de la página."
          onChange={(event) => handleTitleChange(event.target.value)}
          onBlur={handleSlugBlur}
        />
      </div>

      <div className="class-edit-rich-text-stack">
        <AdminRichTextField
          label="Titulo de pagina"
          labelPlacement="editor"
          value={subtitle}
          typography={subtitleTypography}
          controls={DETAIL_PAGE_RICH_TEXT_CONTROLS}
          layout="compact"
          onChange={handleSubtitleChange}
          onTypographyChange={(next) => updateDetails({ subtitleTypography: next })}
          minHeight="100px"
          help="Tipografía global en el panel inferior. Usa negrita, cursiva o subrayado para énfasis parcial."
        />
        <AdminRichTextField
          label="Pregunta / frase introductoria"
          labelPlacement="editor"
          value={details.detailQuestion}
          typography={detailQuestionTypography}
          controls={DETAIL_PAGE_RICH_TEXT_CONTROLS}
          layout="compact"
          onChange={(value) => updateDetails({ detailQuestion: value })}
          onTypographyChange={(next) => updateDetails({ detailQuestionTypography: next })}
          minHeight="100px"
        />
        <AdminRichTextField
          label="Texto remarcado (café)"
          labelPlacement="editor"
          value={details.highlightDescription}
          typography={highlightTypography}
          controls={DETAIL_PAGE_RICH_TEXT_CONTROLS}
          layout="compact"
          onChange={(value) => updateDetails({ highlightDescription: value })}
          onTypographyChange={(next) => updateDetails({ highlightDescriptionTypography: next })}
          minHeight="110px"
        />
        <AdminRichTextField
          label="Texto normal / descripción"
          labelPlacement="editor"
          value={description}
          typography={descriptionTypography}
          controls={DETAIL_PAGE_RICH_TEXT_CONTROLS}
          layout="compact"
          onChange={handleDescriptionChange}
          onTypographyChange={(next) => updateDetails({ descriptionTypography: next })}
          minHeight="130px"
        />
      </div>

      <div className="class-edit-field-grid class-edit-field-grid--meta">
        <AdminInput
          label="Duración"
          value={details.durationText}
          placeholder="Sesiones de 2 h."
          onChange={(event) => updateDetails({ durationText: event.target.value })}
        />
        <AdminInput
          label="WhatsApp"
          value={details.whatsappNumber}
          error={errors.whatsappNumber}
          validationKey="whatsappNumber"
          help="Formato internacional sin espacios. Ej: 34633788860"
          onChange={(event) => updateDetails({ whatsappNumber: event.target.value })}
        />
      </div>
    </SectionCard>
  );
}
