import { getSettings } from "@/lib/cms/settings";

export const DEFAULT_WHATSAPP_NUMBER = "34633788860";

export function normalizeWhatsappNumber(value: string | null | undefined): string {
  if (!value) return "";
  return value.replace(/[^\d]/g, "");
}

export async function getWhatsappNumber(): Promise<string> {
  const settings = await getSettings();
  return normalizeWhatsappNumber(settings.contact.whatsapp) || DEFAULT_WHATSAPP_NUMBER;
}

export async function getWhatsappHref(): Promise<string> {
  return `https://wa.me/${await getWhatsappNumber()}`;
}
