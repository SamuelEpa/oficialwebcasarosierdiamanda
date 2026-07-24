import type { FooterComponent, SocialLink } from "@/lib/cms/types";
import type { SiteSettings } from "@/lib/cms/settings";
import { mergeFooterContactForEditor } from "@/lib/cms/footer-contact-sync";
import { DEFAULT_FOOTER_CONTACT_TEXT } from "./constants";
import type { FooterEditorFields } from "./utils";

export function footerEditorFieldsFromItem(
  item?: FooterComponent | null,
  siteContact?: SiteSettings["contact"],
): FooterEditorFields {
  const merged = siteContact ? mergeFooterContactForEditor(item, siteContact) : null;

  return {
    name: item?.name ?? "Footer principal",
    logoId: item?.logo_id ?? "",
    address: merged?.address ?? item?.address ?? "",
    mapUrl: merged?.mapUrl ?? item?.map_url ?? "",
    legalText: item?.legal_text ?? "",
    contactTitle: item?.contact_title ?? "Contacto",
    contactText: item?.contact_text ?? DEFAULT_FOOTER_CONTACT_TEXT,
    buttonBackgroundColor: item?.form_button_color ?? item?.social_button_color ?? "#111111",
    buttonContentColor: item?.form_button_text_color ?? item?.social_icon_color ?? "#ffffff",
    socialLinks: item?.social_links?.length ? [...item.social_links] : [],
    menuId: item?.menu_id ?? "",
    newsletterEnabled: item?.newsletter_enabled ?? false,
  };
}

export function footerEditorSyncKey(
  item?: FooterComponent | null,
  contactFormUpdatedAt?: string,
  siteSettingsUpdatedAt?: string,
) {
  return `${item?.id ?? "new"}:${item?.updated_at ?? ""}:${contactFormUpdatedAt ?? ""}:${siteSettingsUpdatedAt ?? ""}`;
}

export function cloneSocialLinks(links: SocialLink[]): SocialLink[] {
  return links.map((link) => ({ ...link }));
}
