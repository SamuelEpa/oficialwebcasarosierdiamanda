"use client";

import Switch from "@/components/ui/Switch";
import { AdminInput } from "@/components/ui/AdminField";
import { AdminRichTextField } from "@/components/ui/AdminRichTextField";
import type { ClassEditFormState } from "../hooks/useClassEditForm";
import { MediaPickerField } from "./MediaPickerField";
import { SectionCard } from "./SectionCard";

type DetailMediaSectionProps = {
  form: ClassEditFormState;
};

export function DetailMediaSection({ form }: DetailMediaSectionProps) {
  const {
    details,
    uploadingTarget,
    setPickerTarget,
    uploadImage,
    updateDetails,
    updateIncludedItems,
  } = form;

  return (
    <SectionCard compact>
      <div className="class-edit-media-layout">
        <div className="class-edit-media-layout__copy">
          <AdminRichTextField
            label="Qué incluye"
            value={details.includedItems.join("\n")}
            onChange={updateIncludedItems}
            minHeight="140px"
            placeholder="Un elemento por línea. Puedes usar negritas, itálica, listas y enlaces."
          />
          <Switch
            checked={details.showIncludedSection}
            label="Mostrar Qué incluye en la página pública"
            description="Activa o desactiva únicamente esta sección en el frontend público."
            onCheckedChange={(checked) => updateDetails({ showIncludedSection: checked })}
          />
        </div>

        <div className="class-edit-media-layout__video">
          <AdminInput
            label="URL / Fuente del video"
            value={details.videoUrl}
            placeholder="https://..."
            onChange={(event) => updateDetails({ videoUrl: event.target.value })}
          />
          <MediaPickerField
            label="Poster del video"
            image={details.videoPoster}
            alt="Poster de video"
            emptyMessage="Sin poster. Se mostrará el reproductor sin imagen de portada."
            uploadInputId="videoPoster-upload"
            isUploading={uploadingTarget === "videoPoster"}
            uploadLabel={details.videoPoster ? "Sustituir" : "Subir imagen"}
            libraryLabel={details.videoPoster ? "Abrir biblioteca" : "Seleccionar imagen"}
            onPickFromLibrary={() => setPickerTarget("videoPoster")}
            onUpload={(file) => void uploadImage("videoPoster", file)}
            onRemove={() => updateDetails({ videoPoster: "" })}
          />
        </div>
      </div>
    </SectionCard>
  );
}
