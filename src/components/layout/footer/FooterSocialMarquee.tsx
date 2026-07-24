"use client";

import { Carousel } from "@/components/ui/Carousel";

const MARQUEE_ITEMS = Array.from({ length: 12 }, (_, index) => (index % 4) + 1);

export function FooterSocialMarquee({ href }: { href: string | null }) {
  if (!href) return null;

  return (
    <Carousel
      items={MARQUEE_ITEMS}
      ariaLabel="Galeria social continua"
      className="footer-social"
      viewportClassName="footer-social__viewport"
      trackClassName="footer-social__track is-animated"
      slideClassName="footer-social__slide"
      marquee
      renderItem={(index, { realIndex, isDuplicate }) => (
        <a
          className="footer-social__item"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={isDuplicate || realIndex > 3 ? -1 : undefined}
        >
          <img
            src={index === 4 ? "/img/social-4.jpeg" : `/img/social-${index}.jpg`}
            alt={isDuplicate || realIndex > 3 ? "" : `Red social ${index}`}
            loading="lazy"
            decoding="async"
          />
        </a>
      )}
    />
  );
}
