import type {
  Testimonial,
  TestimonialsStats,
  TestimonialFormErrors,
  TestimonialFormFields,
} from "./types";
import { TESTIMONIAL_TEXT_MAX } from "./constants";
import { TESTIMONIAL_FIELD_DEFS } from "./formFields";

export function sortTestimonials(items: Testimonial[]) {
  return [...items].sort(
    (a, b) => a.sort_order - b.sort_order || +new Date(b.updated_at) - +new Date(a.updated_at),
  );
}

export function testimonialsSyncKey(items: Testimonial[]) {
  return items.map((item) => `${item.id}:${item.sort_order}:${item.status}:${item.updated_at}`).join("|");
}

export function orderedIdsKey(items: Testimonial[]) {
  return items.map((item) => item.id).join("|");
}

export function actionSuccessMessage(action: string) {
  if (action === "publish") return "Publicado exitosamente.";
  if (action === "draft") return "Borrador guardado correctamente.";
  if (action === "trash") return "Movido a papelera exitosamente.";
  if (action === "reorder") return "Orden guardado correctamente.";
  return "Cambio aplicado correctamente.";
}

export function computeTestimonialsStats(items: Testimonial[]): TestimonialsStats {
  let published = 0;
  let draft = 0;
  for (const item of items) {
    if (item.status === "published") published += 1;
    else if (item.status === "draft") draft += 1;
  }
  return { total: items.length, published, draft };
}

export function truncateTestimonialText(text: string, max = 160) {
  const value = text.trim();
  if (!value) return "Este testimonio aún no tiene texto.";
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1).trimEnd()}…`;
}

export function initialsFromName(name: string) {
  const trimmed = name.trim();
  if (!trimmed) return "T";
  return trimmed.slice(0, 1).toUpperCase();
}

export function fieldsFromTestimonial(item?: Testimonial): TestimonialFormFields {
  return {
    name: item?.name ?? "",
    role: item?.role ?? "",
    text: item?.text ?? "",
    avatarId: item?.avatar_id ?? "",
    sortOrder: item?.sort_order ?? 0,
    isFeatured: Boolean(item?.is_featured),
  };
}

export function validateTestimonialForm(fields: TestimonialFormFields): {
  message: string | null;
  errors: TestimonialFormErrors;
} {
  const errors: TestimonialFormErrors = {};

  for (const def of TESTIMONIAL_FIELD_DEFS) {
    if (def.required && def.type === "text") {
      const value = String(fields[def.key] ?? "").trim();
      if (!value) errors[def.key] = `${def.label} es obligatorio.`;
    }
    if (def.type === "textarea" && def.maxLength) {
      const value = String(fields[def.key] ?? "");
      if (value.length > def.maxLength) {
        errors[def.key] = `No puede superar ${def.maxLength} caracteres.`;
      }
    }
  }

  if (fields.text.length > TESTIMONIAL_TEXT_MAX) {
    errors.text = `El texto no puede superar ${TESTIMONIAL_TEXT_MAX} caracteres.`;
  }

  const firstError = Object.values(errors)[0] ?? null;
  return { message: firstError, errors };
}

export function buildTestimonialPayload(
  fields: TestimonialFormFields,
  status: "draft" | "published",
) {
  return {
    name: fields.name.trim(),
    role: fields.role.trim(),
    text: fields.text.trim(),
    avatar_id: fields.avatarId.trim(),
    status,
    sort_order: Number.isFinite(fields.sortOrder) ? fields.sortOrder : 0,
    is_featured: Boolean(fields.isFeatured),
  };
}

export function applySavedTestimonial(saved: Testimonial): TestimonialFormFields {
  return fieldsFromTestimonial(saved);
}

export function isTestimonial(value: unknown): value is Testimonial {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<Testimonial>;
  return typeof item.id === "string" && typeof item.name === "string";
}
