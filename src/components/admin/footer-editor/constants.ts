import {
  DEFAULT_FOOTER_CONTACT_TEXT,
  DEFAULT_FOOTER_SOCIAL_LINKS,
  DEFAULT_FOOTER_THEME,
} from "@/lib/cms/footer-defaults";

export { DEFAULT_FOOTER_CONTACT_TEXT, DEFAULT_FOOTER_SOCIAL_LINKS };

export const DEFAULT_FOOTER_CREATE_INPUT = {
  name: "Footer principal",
  status: "published" as const,
  contact_title: "Contacto",
  contact_text: DEFAULT_FOOTER_CONTACT_TEXT,
  form_button_color: DEFAULT_FOOTER_THEME.formButtonColor,
  form_button_text_color: DEFAULT_FOOTER_THEME.formButtonTextColor,
  social_button_color: DEFAULT_FOOTER_THEME.socialButtonColor,
  social_icon_color: DEFAULT_FOOTER_THEME.socialIconColor,
  social_links: DEFAULT_FOOTER_SOCIAL_LINKS,
};
