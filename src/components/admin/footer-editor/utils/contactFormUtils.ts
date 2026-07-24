import type { Form, FormField } from "@/lib/cms/types";

export type FooterContactFormFieldsEditorState = {
  fields: FormField[];
};

/** Guarda solo campos; conserva envío y notificaciones del registro en Supabase. */
export function buildContactFormFieldsSavePayload(form: Form, fields: FormField[]) {
  return {
    name: form.name,
    slug: form.slug,
    type: form.type,
    status: form.status ?? "active",
    title: form.title ?? "",
    description: form.description ?? "",
    success_message: form.success_message ?? "Gracias, recibimos tu mensaje.",
    redirect_url: form.redirect_url ?? "",
    email_notification_enabled: form.email_notification_enabled ?? false,
    notification_email: form.notification_email ?? "",
    fields: fields.map((field, index) => ({
      ...field,
      sort_order: index,
      is_visible: field.is_visible !== false,
    })),
  };
}

export type FooterContactFormSubmitEditorState = {
  title: string;
  successMessage: string;
  redirectUrl: string;
  emailNotify: boolean;
  notificationEmail: string;
};

/** Guarda envío y notificaciones; conserva los campos actuales del formulario. */
export function buildContactFormSubmitSavePayload(
  form: Form,
  state: FooterContactFormSubmitEditorState,
) {
  return {
    name: form.name,
    slug: form.slug,
    type: form.type,
    status: form.status ?? "active",
    title: state.title.trim(),
    description: form.description ?? "",
    success_message: state.successMessage.trim() || "Gracias, recibimos tu mensaje.",
    redirect_url: state.redirectUrl.trim(),
    email_notification_enabled: state.emailNotify,
    notification_email: state.notificationEmail.trim(),
    fields: (form.fields ?? []).map((field, index) => ({ ...field, sort_order: index })),
  };
}

export function validateContactFormFieldsEditor(fields: FormField[]): string | null {
  const incomplete = fields.find((field) => {
    const partial = Boolean(field.label.trim() || field.name.trim() || field.placeholder.trim());
    if (!partial) return false;
    return !field.label.trim() || !field.name.trim();
  });

  if (incomplete) return "Cada campo visible debe tener etiqueta y nombre (name).";
  return null;
}

export function validateContactFormSubmitEditor(state: FooterContactFormSubmitEditorState): string | null {
  if (state.emailNotify && !state.notificationEmail.trim()) {
    return "Indica un email de notificación o desactiva las alertas.";
  }
  return null;
}

export function contactFormPreviewFromFields(form: Form, fields: FormField[]): Form {
  return {
    ...form,
    fields: fields.map((field, index) => ({ ...field, sort_order: index })),
  };
}
