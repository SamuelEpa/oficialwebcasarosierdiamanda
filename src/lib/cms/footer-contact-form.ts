import type { Form } from "./types";
import { createForm, getFormBySlug } from "./forms";
import {
  DEFAULT_FOOTER_CONTACT_FIELDS,
  FOOTER_CONTACT_FORM_SLUG,
} from "./footer-contact-form-defaults";

export { FOOTER_CONTACT_FORM_SLUG, DEFAULT_FOOTER_CONTACT_FIELDS } from "./footer-contact-form-defaults";

export const DEFAULT_FOOTER_CONTACT_FORM_INPUT = {
  name: "Contacto footer",
  slug: FOOTER_CONTACT_FORM_SLUG,
  type: "contact" as const,
  status: "active" as const,
  title: "Contacto",
  description: "Formulario de contacto del footer publico.",
  success_message: "Gracias, recibimos tu mensaje.",
  redirect_url: "",
  email_notification_enabled: true,
  notification_email: "",
  fields: DEFAULT_FOOTER_CONTACT_FIELDS,
};

/** Active footer contact form (slug fijo). */
export async function getFooterContactForm(): Promise<Form | null> {
  return getFormBySlug(FOOTER_CONTACT_FORM_SLUG);
}

export async function getOrCreateFooterContactForm(): Promise<Form> {
  const existing = await getFooterContactForm();
  if (existing) return existing;
  return createForm(DEFAULT_FOOTER_CONTACT_FORM_INPUT);
}
