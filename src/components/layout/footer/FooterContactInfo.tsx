"use client";

import type { CSSProperties } from "react";
import { socialIconFallback } from "@/lib/cms/public-footer-model";
import type { PublicFooterViewModel } from "@/lib/cms/public-footer-model";

export function FooterContactInfo({ model }: { model: PublicFooterViewModel }) {
  const { socialButtonColor, socialIconColor } = model.theme;

  return (
    <div className="contact-info">
      <h2 className="contact-info__title">{model.contactTitle}</h2>
      {model.contactLines.map((line, index) => (
        <p className={index === 0 ? "contact-info__text" : "contact-info__line"} key={`${line}-${index}`}>
          {line}
        </p>
      ))}
      {model.extraAddress ? <p className="contact-info__line">{model.extraAddress}</p> : null}
      {model.mapUrl ? (
        <p className="contact-info__line">
          <a className="contact-info__map-link" href={model.mapUrl} target="_blank" rel="noopener noreferrer">
            Ver en Google Maps
          </a>
        </p>
      ) : null}
      {model.socialLinks.length > 0 ? (
        <>
          <p className="contact-info__social-title">{model.socialTitle}</p>
          <div className="contact-info__social">
            {model.socialLinks.map((link, index) => (
              <a
                className="contact-info__social-link"
                href={link.url}
                aria-label={link.label || link.platform || `Red social ${index + 1}`}
                target="_blank"
                rel="noopener noreferrer"
                style={
                  {
                    "--contact-social-bg": socialButtonColor,
                    "--contact-social-icon": socialIconColor,
                  } as CSSProperties
                }
                key={`${link.platform}-${index}`}
              >
                <span
                  className="contact-info__social-icon"
                  aria-hidden="true"
                  style={
                    {
                      "--contact-social-icon-url": `url("${link.icon_url || socialIconFallback(link.platform)}")`,
                      "--contact-social-icon": socialIconColor,
                    } as CSSProperties
                  }
                />
              </a>
            ))}
          </div>
        </>
      ) : null}
      <div className="contact-info__legal-links" aria-label="Enlaces legales">
        <a className="contact-info__legal-link" href="/politica-privacidad">
          Política y privacidad
        </a>
        <a className="contact-info__legal-link" href="/auth">
          Administración
        </a>
      </div>
    </div>
  );
}
