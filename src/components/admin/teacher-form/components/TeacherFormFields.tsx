"use client";

import { memo } from "react";
import MediaSelectField from "@/components/admin/MediaSelectField";
import { CmsRichTextField } from "@/components/admin/CmsRichTextField";
import { SectionCard } from "@/components/admin/class-edit/components/SectionCard";
import { AdminInput, AdminSelect } from "@/components/ui/AdminField";
import { TEACHER_MEDIA_FOLDER } from "../constants";
import type {
  TeacherFormErrors,
  TeacherFormFields as TeacherFormValues,
} from "../types";

type TeacherFormFieldsProps = {
  fields: TeacherFormValues;
  errors: TeacherFormErrors;
  disabled?: boolean;
  onFieldChange: <K extends keyof TeacherFormValues>(key: K, value: TeacherFormValues[K]) => void;
};

function TeacherFormFieldsComponent({
  fields,
  errors,
  disabled,
  onFieldChange,
}: TeacherFormFieldsProps) {
  return (
    <SectionCard
      title="Perfil del especialista"
      description="La imagen se sube una sola vez a la biblioteca (carpeta estudio). Al guardar solo se envía la URL."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <AdminInput
          label="Nombre"
          required
          value={fields.name}
          disabled={disabled}
          error={errors.name}
          onChange={(event) => onFieldChange("name", event.target.value)}
        />
        <AdminInput
          label="Subtítulo / título profesional"
          value={fields.specialty}
          disabled={disabled}
          placeholder="Ceramista y especialista"
          onChange={(event) => onFieldChange("specialty", event.target.value)}
        />
        <div className="sm:col-span-2">
          <AdminInput
            label="Instagram"
            value={fields.instagram}
            disabled={disabled}
            placeholder="@usuario"
            onChange={(event) => onFieldChange("instagram", event.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <MediaSelectField
            label="Imagen"
            value={fields.image_id}
            folder={TEACHER_MEDIA_FOLDER}
            previewClassName="cms-shared-hero-media-preview"
            onChange={(image_id) => onFieldChange("image_id", image_id)}
          />
        </div>
        <div className="sm:col-span-2">
          <CmsRichTextField
            label="Descripción"
            value={fields.bio}
            typography={fields.bio_typography}
            minHeight="220px"
            onChange={(bio) => onFieldChange("bio", bio)}
            onTypographyChange={(bio_typography) => onFieldChange("bio_typography", bio_typography)}
          />
        </div>
        <AdminSelect
          label="Estado"
          value={fields.status}
          disabled={disabled}
          onChange={(event) =>
            onFieldChange("status", event.target.value as TeacherFormValues["status"])
          }
        >
          <option value="draft">Borrador</option>
          <option value="published">Publicado</option>
          <option value="archived">Archivado</option>
        </AdminSelect>
        <AdminInput
          label="Orden"
          type="number"
          value={fields.sort_order}
          disabled={disabled}
          onChange={(event) => onFieldChange("sort_order", Number(event.target.value))}
        />
      </div>
    </SectionCard>
  );
}

export const TeacherFormFields = memo(TeacherFormFieldsComponent);
