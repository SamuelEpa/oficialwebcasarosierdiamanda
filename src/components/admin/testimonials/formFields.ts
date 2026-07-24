import { TESTIMONIAL_TEXT_MAX } from "./constants";
import type { TestimonialFormFields } from "./types";

export type TestimonialFieldKey = keyof TestimonialFormFields;

export type TestimonialFieldDef =
  | {
      key: TestimonialFieldKey;
      dbKey: "name" | "role" | "text" | "avatar_id" | "sort_order" | "is_featured";
      type: "text" | "textarea" | "number" | "media" | "switch";
      label: string;
      placeholder?: string;
      help?: string;
      required?: boolean;
      maxLength?: number;
      min?: number;
      step?: number;
      span?: 1 | 2;
      autoComplete?: string;
      preview?: boolean;
      description?: string;
    };

/** Single source of truth: UI fields ↔ Supabase `testimonials` columns. */
export const TESTIMONIAL_FIELD_DEFS: readonly TestimonialFieldDef[] = [
  {
    key: "name",
    dbKey: "name",
    type: "text",
    label: "Nombre",
    placeholder: "Nombre de la persona",
    required: true,
    span: 2,
    autoComplete: "name",
    preview: true,
  },
  {
    key: "role",
    dbKey: "role",
    type: "text",
    label: "Rol o contexto",
    placeholder: "Alumna de cerámica",
    help: "Se muestra debajo del nombre en la home.",
    span: 2,
    preview: true,
  },
  {
    key: "text",
    dbKey: "text",
    type: "textarea",
    label: "Texto",
    placeholder: "El testimonio aparecerá aquí…",
    maxLength: TESTIMONIAL_TEXT_MAX,
    help: `Máximo ${TESTIMONIAL_TEXT_MAX} caracteres.`,
    span: 2,
    preview: true,
  },
  {
    key: "avatarId",
    dbKey: "avatar_id",
    type: "media",
    label: "Avatar",
    help: "Imagen circular en la tarjeta pública.",
    span: 2,
    preview: true,
  },
  {
    key: "sortOrder",
    dbKey: "sort_order",
    type: "number",
    label: "Orden",
    help: "Posición en el listado (0 = primero).",
    min: 0,
    step: 1,
    span: 1,
  },
  {
    key: "isFeatured",
    dbKey: "is_featured",
    type: "switch",
    label: "Destacar testimonio",
    description: "Marca este testimonio como destacado en la base de datos.",
    span: 2,
    preview: true,
  },
] as const;

export function getPreviewFieldKeys() {
  return TESTIMONIAL_FIELD_DEFS.filter((field) => field.preview).map((field) => field.key);
}
