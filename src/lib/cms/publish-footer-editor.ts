import { errorMessageFromUnknown } from "./form-field-persistence";
import { getFooterContactForm } from "./footer-contact-form";
import { syncSiteContactDisplayFromFooterEditor, type FooterSiteContactDisplaySync } from "./footer-contact-sync";
import { updateFooter } from "./footers";
import { updateForm } from "./forms";
import type { FooterComponent, Form } from "./types";

export type PublishFooterEditorInput = {
  footerId: string;
  footerData: Record<string, unknown>;
  syncSiteContact?: boolean;
  contactSync?: FooterSiteContactDisplaySync;
  contactFormPayload?: Record<string, unknown> | null;
  contactFormId?: string | null;
};

export type PublishFooterEditorResult = {
  footer: FooterComponent;
  form: Form | null;
};

/**
 * Publica footer + campos del formulario de contacto en una sola operación de servidor
 * (evita múltiples round-trips y condiciones de carrera en el cliente).
 */
export async function publishFooterEditorBundle(
  input: PublishFooterEditorInput,
): Promise<PublishFooterEditorResult> {
  const footer = await updateFooter(input.footerId, input.footerData);
  if (!footer) {
    throw new Error("No se encontró el footer a publicar.");
  }

  if (input.syncSiteContact && input.contactSync) {
    await syncSiteContactDisplayFromFooterEditor(input.contactSync);
  }

  let form: Form | null = null;
  if (input.contactFormPayload && input.contactFormId) {
    const canonical = await getFooterContactForm();
    if (canonical && canonical.id !== input.contactFormId) {
      throw new Error("El formulario de contacto no coincide con el footer global.");
    }
    const updated = await updateForm(input.contactFormId, input.contactFormPayload);
    if (!updated) {
      throw new Error("No se encontró el formulario de contacto del footer.");
    }
    form = updated;
  }

  return { footer, form };
}

export function publishFooterEditorErrorMessage(err: unknown): string {
  const message = errorMessageFromUnknown(err, "No se pudo publicar el footer.");
  if (message.includes("AbortError") || message.includes("aborted")) {
    return "La publicación se interrumpió (timeout o recarga). Espera un momento e inténtalo de nuevo.";
  }
  return message;
}
