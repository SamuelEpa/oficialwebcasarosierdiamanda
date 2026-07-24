"use client";

import { memo } from "react";
import Switch from "@/components/ui/Switch";
import { AdminInput } from "@/components/ui/AdminField";
import { AdminRichTextField } from "@/components/ui/AdminRichTextField";
import type { ClassEditFormState } from "../hooks/useClassEditForm";
import { useDetailMediaHandlers } from "../hooks/useDetailMediaHandlers";
import { MediaPickerField } from "./MediaPickerField";
import { SectionCard } from "./SectionCard";

type DetailMediaSectionProps = {
  form: ClassEditFormState;
};

function DetailMediaSectionComponent({ form }: DetailMediaSectionProps) {
  const media = useDetailMediaHandlers(form);

  return (
    <SectionCard compact>
      <div className="class-edit-media-layout">
        <div className="class-edit-media-layout__copy">
          <AdminRichTextField
            label="Qué incluye"
            value={media.includedItemsText}
            onChange={media.updateIncludedItems}
            minHeight="140px"
            placeholder="Un elemento por línea. Puedes usar negritas, itálica, listas y enlaces."
          />
          <Switch
            checked={media.showIncludedSection}
            label="Mostrar Qué incluye en la página pública"
            description="Activa o desactiva únicamente esta sección en el frontend público."
            onCheckedChange={media.setShowIncludedSection}
          />
        </div>

        <div className="class-edit-media-layout__video">
          <AdminInput
            label="URL / Fuente del video"
            value={media.videoUrl}
            placeholder="https://..."
            onChange={(event) => media.setVideoUrl(event.target.value)}
          />
          <MediaPickerField
            label="Poster del video"
            image={media.videoPoster}
            alt="Poster de video"
            emptyMessage="Sin poster. Se mostrará el reproductor sin imagen de portada."
            uploadInputId="videoPoster-upload"
            isUploading={media.uploadingTarget === "videoPoster"}
            uploadLabel={media.videoPoster ? "Sustituir" : "Subir imagen"}
            libraryLabel={media.videoPoster ? "Abrir biblioteca" : "Seleccionar imagen"}
            onPickFromLibrary={media.openVideoPosterLibrary}
            onUpload={media.uploadVideoPoster}
            onRemove={media.clearVideoPoster}
          />
        </div>
      </div>
    </SectionCard>
  );
}

export const DetailMediaSection = memo(DetailMediaSectionComponent);
