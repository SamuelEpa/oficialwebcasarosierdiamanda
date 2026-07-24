import { randomUUID } from "crypto";
import type { FormField } from "./types";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function ensureFormFieldUuid(id: string | undefined | null): string {
  const value = (id ?? "").trim();
  if (UUID_RE.test(value)) return value;
  return randomUUID();
}

export function normalizeFormFieldVisibility(value: unknown): boolean {
  if (value === false || value === 0 || value === "false") return false;
  return true;
}

/** Fila lista para insert en public.form_fields (sin columnas extra). */
export function formFieldRowForInsert(formId: string, field: FormField, sortOrder: number) {
  return {
    id: ensureFormFieldUuid(field.id),
    form_id: formId,
    label: field.label.trim(),
    name: field.name.trim(),
    type: field.type,
    placeholder: field.placeholder?.trim() || null,
    required: Boolean(field.required),
    options: field.options ?? [],
    default_value: field.default_value?.trim() || null,
    sort_order: sortOrder,
    is_visible: normalizeFormFieldVisibility(field.is_visible),
  };
}

export function errorMessageFromUnknown(err: unknown, fallback = "Error"): string {
  if (err instanceof Error && err.message.trim()) return err.message.trim();
  if (typeof err === "object" && err !== null && "message" in err) {
    const message = (err as { message: unknown }).message;
    if (typeof message === "string" && message.trim()) return message.trim();
  }
  return fallback;
}
