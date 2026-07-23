"use client";

import { AdminInput } from "@/components/ui/AdminField";
import { AdminRichTextField } from "@/components/ui/AdminRichTextField";
import { DEFAULT_RICH_TEXT_TYPOGRAPHY, normalizeRichTextTypography } from "@/lib/cms/rich-text-typography";
import type { Offering } from "@/lib/cms/types";
import { DETAIL_PAGE_RICH_TEXT_CONTROLS } from "../constants/rich-text-controls";
import type { ClassEditFormState } from "../hooks/useClassEditForm";
import { MediaPickerField } from "./MediaPickerField";
import { SectionCard } from "./SectionCard";

type HomeCardEditorSectionProps = {
  offering: Offering;
  form: ClassEditFormState;
};

export function HomeCardEditorSection({ offering, form }: HomeCardEditorSectionProps) {
  const { title, details, uploadingTarget, uploadImage, setPickerTarget, updateHomeCard } = form;
  const excerptTypography = normalizeRichTextTypography(details.homeCard.excerptTypography ?? DEFAULT_RICH_TEXT_TYPOGRAPHY);

  return (
    <SectionCard
      compact
      title="Contenido de la tarjeta"
      description="Estos campos controlan únicamente la tarjeta destacada de la portada. No cambian el Hero ni la página detallada."
    >
      <div className="class-edit-home-editor-grid">
        <div className="class-edit-home-editor-grid__media space-y-4">
          <MediaPickerField
            label="Imagen de la tarjeta"
            image={details.homeCard.image}
            alt={details.homeCard.imageAlt || details.homeCard.title || title || "Imagen de la tarjeta"}
            emptyMessage="Sin imagen específica. En Home se usará la imagen de portada actual."
            uploadInputId="home-card-upload"
            isUploading={uploadingTarget === "home"}
            onPickFromLibrary={() => setPickerTarget("home")}
            onUpload={(file) => void uploadImage("home", file)}
            onRemove={() => updateHomeCard({ image: "" })}
          />
          <AdminInput
            label="Texto alternativo de la imagen"
            value={details.homeCard.imageAlt}
            placeholder={details.homeCard.title || title || "Descripción breve de la imagen"}
            help="Si queda vacío, se utilizará el título de la tarjeta."
            onChange={(event) => updateHomeCard({ imageAlt: event.target.value })}
          />
        </div>

        <div className="class-edit-home-editor-grid__copy space-y-4">
          <div className="class-edit-field-grid class-edit-field-grid--meta">
            <AdminInput
              label="Etiqueta superior"
              value={details.homeCard.eyebrow}
              placeholder={details.heroSubtitle || offering.type}
              help="Ejemplo: CLASES · INICIACIÓN."
              onChange={(event) => updateHomeCard({ eyebrow: event.target.value })}
            />
            <AdminInput
              label="Título para Home"
              value={details.homeCard.title}
              placeholder={title || "Título de la tarjeta"}
              help="Puede ser distinto del título del Hero y de la página detallada."
              onChange={(event) => updateHomeCard({ title: event.target.value })}
            />
          </div>

          <AdminRichTextField
            label="Descripción corta para Home"
            labelPlacement="editor"
            value={details.homeCard.excerpt}
            typography={excerptTypography}
            controls={DETAIL_PAGE_RICH_TEXT_CONTROLS}
            layout="compact"
            onChange={(value) => updateHomeCard({ excerpt: value })}
            onTypographyChange={(next) => updateHomeCard({ excerptTypography: next })}
            minHeight="120px"
            placeholder={details.highlightDescription || "Resumen breve para la tarjeta de portada."}
            help="Tipografía global en el panel inferior. Usa negrita, cursiva o subrayado para énfasis parcial."
          />
        </div>
      </div>
    </SectionCard>
  );
}
