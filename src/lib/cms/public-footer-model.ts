import type { CSSProperties } from "react";
import { resolvePublicFooterContact, type SiteContactSlice } from "./footer-contact-sync";
import {
  DEFAULT_FOOTER_CONTACT_TEXT,
  DEFAULT_FOOTER_CONTACT_TITLE,
  DEFAULT_FOOTER_SOCIAL_LINKS,
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
  mapLinkLines: readonly [string, string];
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

function pickFirstNonEmpty(...values: Array<string | null | undefined>) {
  for (const value of values) {
    const trimmed = value?.trim();
    if (trimmed) return trimmed;
  }
  return "";
}

function formatCityCountry(city: string | undefined, country: string | undefined) {
  return [city?.trim(), country?.trim()].filter(Boolean).join(", ");
}

/** Combines footer `contact_text` with `site_settings.contact` (Supabase). */
export function mergePublicFooterContactLines(
  parsedLines: string[],
  siteContact: SiteContactSlice,
  resolved: ReturnType<typeof resolvePublicFooterContact>,
): string[] {
  const phone = pickFirstNonEmpty(resolved.phone, siteContact.phone, parsedLines[0]);
  const cityCountry = formatCityCountry(siteContact.city, siteContact.country);
  const addressLine = pickFirstNonEmpty(resolved.address, parsedLines[1]);
  const location = pickFirstNonEmpty(
    addressLine && cityCountry && !addressLine.toLowerCase().includes(cityCountry.toLowerCase())
      ? `${addressLine}, ${cityCountry}`
      : addressLine || cityCountry,
    parsedLines[1],
  );
  const hours = pickFirstNonEmpty(
    parsedLines.find((line) => /lunes|martes|mi[eé]rcoles|jueves|viernes|s[aá]bado|domingo|horario|\d{1,2}:\d{2}/i.test(line)),
    parsedLines[2],
  );

  return [phone, location, hours].filter(Boolean);
}

export const DEFAULT_FOOTER_MAP_LINK_LINES = ["ver ubicación en", "google maps"] as const;

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
  const { contactLines: parsedLines, socialTitle } = parseContactBlock(contactText);
  const contactLines = mergePublicFooterContactLines(parsedLines, input.siteContact, resolved);

  const theme = {
    formButton: footer?.form_button_color || DEFAULT_FOOTER_THEME.formButtonColor,
    formButtonText: footer?.form_button_text_color || DEFAULT_FOOTER_THEME.formButtonTextColor,
    socialButton: footer?.social_button_color || DEFAULT_FOOTER_THEME.socialButtonColor,
    socialIcon: footer?.social_icon_color || DEFAULT_FOOTER_THEME.socialIconColor,
  };

  const extraAddress =
    resolved.address &&
    contactLines.some((line) => line.includes(resolved.address)) === false
      ? resolved.address
      : null;

  const socialFromFooter = normalizePublicSocialLinks(footer?.social_links);
  const socialLinks = socialFromFooter.length ? socialFromFooter : DEFAULT_FOOTER_SOCIAL_LINKS;

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
    mapLinkLines: DEFAULT_FOOTER_MAP_LINK_LINES,
    socialLinks,
    legalCopy,
    contactForm: {
      form,
      slug: form?.slug ?? "footer-contact",
      submitSubject: form?.title?.trim() || "Mensaje desde footer",
      defaultSuccessMessage: form?.success_message?.trim() || "Gracias, recibimos tu mensaje.",
    },
  };
}
