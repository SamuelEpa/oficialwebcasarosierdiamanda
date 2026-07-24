import { FOOTER_CONTACT_FORM_SLUG } from "./footer-contact-form-defaults";

export const FOOTER_CONTACT_FORM_ADMIN_PATH = "/admin/components/footers#formulario-contacto";

export function footerContactFormSubmitAdminPath(formId: string): string {
  return `/admin/formularios/${formId}/edit`;
}

export function normalizeFormSlug(slug: string): string {
  return slug.trim().toLowerCase();
}

export function isFooterContactFormSlug(slug: string): boolean {
  return normalizeFormSlug(slug) === FOOTER_CONTACT_FORM_SLUG;
}

/** Mensaje cuando se intenta crear o robar el slug reservado del footer. */
export const FOOTER_CONTACT_SLUG_RESERVED_MESSAGE =
  `El slug "${FOOTER_CONTACT_FORM_SLUG}" está reservado al formulario del footer. Campos: Componentes → Footer. Envío: Formularios.`;

export function validateFormSlugForCreate(slug: string): string | null {
  if (isFooterContactFormSlug(slug)) return FOOTER_CONTACT_SLUG_RESERVED_MESSAGE;
  return null;
}

export function validateFormSlugForUpdate(
  slug: string,
  formId: string,
  footerContactFormId: string | null | undefined,
): string | null {
  if (!isFooterContactFormSlug(slug)) return null;
  if (footerContactFormId && formId === footerContactFormId) return null;
  return FOOTER_CONTACT_SLUG_RESERVED_MESSAGE;
}

export function isProtectedFooterContactForm(
  formId: string,
  footerContactFormId: string | null | undefined,
): boolean {
  return Boolean(footerContactFormId && formId === footerContactFormId);
}

export const FOOTER_CONTACT_FORM_PROTECTED_MESSAGE =
  "Este formulario está ligado al footer global y no se puede eliminar ni duplicar desde Formularios.";
