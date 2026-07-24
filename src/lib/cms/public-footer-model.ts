import type { CSSProperties } from "react";
import { resolvePublicFooterContact, type SiteContactSlice } from "./footer-contact-sync";
import {
  DEFAULT_FOOTER_CONTACT_TEXT,
  DEFAULT_FOOTER_CONTACT_TITLE,
  DEFAULT_FOOTER_SOCIAL_TITLE,
  DEFAULT_FOOTER_THEME,
} from "./footer-defaults";
import type { FooterComponent, Form, SocialLink } from "./types";

export type PublicFooterContactFormProps = {
  form: Form | null;
  slug: string;
  submitSubject: string;
  defaultSuccessMessage: string;
};

export type PublicFooterViewModel = {
  themeStyle: CSSProperties;
  theme: {
    socialButtonColor: string;
    socialIconColor: string;
  };
  contactTitle: string;
  contactLines: string[];
  socialTitle: string;
  extraAddress: string | null;
  mapUrl: string | null;
  socialLinks: SocialLink[];
  legalCopy: string;
  contactForm: PublicFooterContactFormProps;
};

function parseContactBlock(contactText: string) {
  const lines = contactText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const socialTitle = lines.length ? lines.pop()! : DEFAULT_FOOTER_SOCIAL_TITLE;
  return { contactLines: lines, socialTitle };
}

export function normalizePublicSocialLinks(links: SocialLink[] | undefined | null): SocialLink[] {
  if (!links?.length) return [];
  return links.filter((link) => link.url.trim() && (link.icon_url ?? "").trim());
}

export function socialIconFallback(platform: string): string {
  const key = platform.toLowerCase();
  if (key.includes("facebook")) return "/img/icon-facebook.svg";
  if (key.includes("whatsapp")) return "/img/icon-whatsapp.svg";
  return "/img/icon-instagram.svg";
}

export function buildPublicFooterViewModel(input: {
  footer: FooterComponent | null | undefined;
  contactForm: Form | null | undefined;
  siteContact: SiteContactSlice;
  siteName: string;
  footerLegalText?: string;
}): PublicFooterViewModel {
  const footer = input.footer;
  const resolved = resolvePublicFooterContact(footer, input.siteContact);
  const contactText = footer?.contact_text?.trim() || DEFAULT_FOOTER_CONTACT_TEXT;
  const { contactLines, socialTitle } = parseContactBlock(contactText);

  const theme = {
    formButton: footer?.form_button_color || DEFAULT_FOOTER_THEME.formButtonColor,
    formButtonText: footer?.form_button_text_color || DEFAULT_FOOTER_THEME.formButtonTextColor,
    socialButton: footer?.social_button_color || DEFAULT_FOOTER_THEME.socialButtonColor,
    socialIcon: footer?.social_icon_color || DEFAULT_FOOTER_THEME.socialIconColor,
  };

  const extraAddress =
    footer?.address?.trim() ||
    (resolved.address && !contactLines.includes(resolved.address) ? resolved.address : "") ||
    null;

  const form = input.contactForm ?? null;
  const legalFromFooter = footer?.legal_text?.trim();
  const legalFromSettings = input.footerLegalText?.trim();
  const legalCopy =
    legalFromFooter ||
    legalFromSettings ||
    `© ${input.siteName.trim() || "Casa Rosier"}`;

  return {
    themeStyle: {
      "--contact-submit-bg": theme.formButton,
      "--contact-submit-color": theme.formButtonText,
      "--contact-social-bg": theme.socialButton,
      "--contact-social-icon": theme.socialIcon,
    } as CSSProperties,
    theme: {
      socialButtonColor: theme.socialButton,
      socialIconColor: theme.socialIcon,
    },
    contactTitle: footer?.contact_title?.trim() || DEFAULT_FOOTER_CONTACT_TITLE,
    contactLines,
    socialTitle,
    extraAddress: extraAddress || null,
    mapUrl: resolved.mapUrl || null,
    socialLinks: normalizePublicSocialLinks(footer?.social_links),
    legalCopy,
    contactForm: {
      form,
      slug: form?.slug ?? "footer-contact",
      submitSubject: form?.title?.trim() || "Mensaje desde footer",
      defaultSuccessMessage: form?.success_message?.trim() || "Gracias, recibimos tu mensaje.",
    },
  };
}
