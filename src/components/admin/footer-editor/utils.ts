import type { FooterComponent, SocialLink } from "@/lib/cms/types";

export function footerIconCssUrl(value: string) {
  return value ? `url("${value.replace(/"/g, "%22")}")` : "none";
}

export type FooterEditorFields = {
  name: string;
  logoId: string;
  address: string;
  mapUrl: string;
  legalText: string;
  contactTitle: string;
  contactText: string;
  buttonBackgroundColor: string;
  buttonContentColor: string;
  socialLinks: SocialLink[];
  menuId: string;
  newsletterEnabled: boolean;
};

export function normalizeFooterSocialLinks(
  socialLinks: SocialLink[],
  buttonBackgroundColor: string,
  buttonContentColor: string,
): SocialLink[] {
  return socialLinks
    .filter((social) => social.url.trim() && (social.icon_url ?? "").trim())
    .map((social) => ({
      ...social,
      platform: social.platform.trim() || social.label.trim() || "red-social",
      label: social.label.trim() || social.platform.trim() || "Red social",
      url: social.url.trim(),
      icon_url: (social.icon_url ?? "").trim(),
      icon_color: buttonContentColor,
      button_color: buttonBackgroundColor,
    }));
}

export function validateFooterForm(fields: FooterEditorFields): string | null {
  if (!fields.name.trim()) return "El nombre es obligatorio.";

  const incompleteSocial = fields.socialLinks.find((social) => {
    const hasAnyValue = Boolean(
      social.platform.trim() ||
        social.label.trim() ||
        social.url.trim() ||
        (social.icon_url ?? "").trim(),
    );
    if (!hasAnyValue) return false;
    return !social.url.trim() || !(social.icon_url ?? "").trim();
  });

  if (incompleteSocial) {
    return "Cada red social debe tener link e icono antes de publicar.";
  }

  if (fields.mapUrl.trim() && !/^https?:\/\//i.test(fields.mapUrl.trim())) {
    return "El enlace de Google Maps debe comenzar con http:// o https://.";
  }

  return null;
}

export function buildFooterSavePayload(fields: FooterEditorFields, base?: FooterComponent) {
  const social_links = normalizeFooterSocialLinks(
    fields.socialLinks,
    fields.buttonBackgroundColor,
    fields.buttonContentColor,
  );

  return {
    name: fields.name.trim(),
    status: "published" as const,
    logo_id: fields.logoId,
    contact_email: (base?.contact_email ?? "").trim(),
    whatsapp: (base?.whatsapp ?? "").trim(),
    address: fields.address.trim(),
    map_url: fields.mapUrl.trim(),
    legal_text: fields.legalText.trim(),
    contact_title: fields.contactTitle.trim(),
    contact_text: fields.contactText,
    form_button_color: fields.buttonBackgroundColor,
    form_button_text_color: fields.buttonContentColor,
    social_button_color: fields.buttonBackgroundColor,
    social_icon_color: fields.buttonContentColor,
    social_links,
    menu_id: fields.menuId || null,
    newsletter_enabled: fields.newsletterEnabled,
  };
}

export function footerPreviewFromFields(
  fields: FooterEditorFields,
  base?: FooterComponent,
): FooterComponent {
  const social_links = normalizeFooterSocialLinks(
    fields.socialLinks,
    fields.buttonBackgroundColor,
    fields.buttonContentColor,
  );

  return {
    id: base?.id ?? "footer-preview",
    name: fields.name.trim() || "Footer principal",
    status: "published",
    logo_id: fields.logoId,
    contact_email: base?.contact_email ?? "",
    whatsapp: base?.whatsapp ?? "",
    address: fields.address,
    map_url: fields.mapUrl,
    legal_text: fields.legalText,
    contact_title: fields.contactTitle.trim() || "Contacto",
    contact_text: fields.contactText,
    form_button_color: fields.buttonBackgroundColor,
    form_button_text_color: fields.buttonContentColor,
    social_button_color: fields.buttonBackgroundColor,
    social_icon_color: fields.buttonContentColor,
    social_links,
    menu_id: fields.menuId || null,
    newsletter_enabled: fields.newsletterEnabled,
    created_at: base?.created_at ?? new Date().toISOString(),
    updated_at: base?.updated_at ?? new Date().toISOString(),
    deleted_at: null,
  };
}
