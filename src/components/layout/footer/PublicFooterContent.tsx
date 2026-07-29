"use client";

import { useMemo } from "react";
import type { SiteSettings } from "@/lib/cms/settings";
import {
  buildPublicFooterViewModel,
  type PublicFooterViewModel,
} from "@/lib/cms/public-footer-model";
import type { FooterComponent, Form } from "@/lib/cms/types";
import { FooterContactForm } from "./FooterContactForm";
import { FooterContactInfo } from "./FooterContactInfo";
import { FooterSocialMarquee } from "./FooterSocialMarquee";

export type PublicFooterContentProps = {
  model?: PublicFooterViewModel;
  footer?: FooterComponent | null;
  contactForm?: Form | null;
  siteContact?: SiteSettings["contact"];
  siteName?: string;
  footerLegalText?: string;
  socialTrack?: boolean;
  preview?: boolean;
};

export function PublicFooterContent({
  model: modelProp,
  footer,
  contactForm,
  siteContact,
  siteName = "Casa Rosier",
  footerLegalText,
  socialTrack = false,
  preview = false,
}: PublicFooterContentProps) {
  const model = useMemo(
    () =>
      modelProp ??
      buildPublicFooterViewModel({
        footer,
        contactForm,
        siteContact: siteContact ?? {
          email: "",
          phone: "",
          whatsapp: "",
          address: "",
          city: "",
          country: "",
          map_url: "",
        },
        siteName,
        footerLegalText,
      }),
    [contactForm, footer, footerLegalText, modelProp, siteContact, siteName],
  );

  const marqueeHref = model.socialLinks[0]?.url?.trim() || null;

  return (
    <footer
      id="footer"
      className="site-footer site-footer--editorial"
      style={model.themeStyle}
    >
      {socialTrack ? <FooterSocialMarquee href={marqueeHref} /> : null}
      <section
        id="contacto-footer"
        className="contact-footer contact-footer--editorial"
      >
        <div className="container contact-footer__container contact-footer__container--editorial">
          <FooterContactInfo model={model} variant="editorial" />
          <FooterContactForm config={model.contactForm} preview={preview} />
          <nav
            className="contact-footer__legal-bar"
            aria-label="Enlaces legales del sitio"
          >
            <a
              className="contact-footer__legal-link contact-footer__legal-link--admin"
              href="/auth"
            >
              Administración
            </a>
            <a
              className="contact-footer__legal-link contact-footer__legal-link--privacy"
              href="/politica-privacidad"
            >
              Política y privacidad
            </a>
          </nav>
        </div>
      </section>
      {model.legalCopy ? (
        <div className="site-legal site-legal--editorial">
          <p className="site-legal__copy">{model.legalCopy}</p>
        </div>
      ) : null}
    </footer>
  );
}
