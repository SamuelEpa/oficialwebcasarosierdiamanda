"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { MarkdownContent } from "@/components/ui/MarkdownContent";
import type { ExperienceItem } from "@/data/types";
import { assetPath } from "@/lib/assets";
import {
  DEFAULT_DESCRIPTION_TYPOGRAPHY,
  DEFAULT_RICH_TEXT_TYPOGRAPHY,
  normalizeRichTextTypography,
  type RichTextTypography,
} from "@/lib/cms/rich-text-typography";
import { experienceHref } from "@/lib/routes";
import { Carousel } from "@/components/ui/Carousel";

const DEFAULT_GIFT_EYEBROW_TYPOGRAPHY: RichTextTypography = {
  ...DEFAULT_RICH_TEXT_TYPOGRAPHY,
  fontSize: 14,
};

const DEFAULT_GIFT_TITLE_TYPOGRAPHY: RichTextTypography = {
  ...DEFAULT_RICH_TEXT_TYPOGRAPHY,
  fontSize: 26,
};

const DEFAULT_GIFT_TAGLINE_TYPOGRAPHY: RichTextTypography = {
  ...DEFAULT_RICH_TEXT_TYPOGRAPHY,
  fontSize: 21,
};

function typographyVars(prefix: string, value: RichTextTypography | undefined, fallback: RichTextTypography): CSSProperties {
  const typography = normalizeRichTextTypography(value ?? fallback);
  return {
    [`--${prefix}-font-size`]: `${typography.fontSize}px`,
    [`--${prefix}-font-weight`]: String(typography.weight),
    [`--${prefix}-font-stretch`]: `${typography.width}%`,
    [`--${prefix}-font-width`]: String(typography.width),
    [`--${prefix}-font-style`]: typography.italic ? "italic" : "normal",
  } as CSSProperties;
}

function stripMarkdown(value: string) {
  return value
    .replace(/[#*_~`>\[\]()]/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

interface GiftCarouselProps {
  items: readonly ExperienceItem[];
}

function giftHomeContent(item: ExperienceItem) {
  const eyebrow = (item.homeEyebrow || item.category || "").trim();
  const tagline = (item.homeTagline || item.subtitle || "").trim();
  return {
    image: item.homeImage || item.coverImage,
    imageAlt: item.homeImageAlt || item.homeTitle || item.title,
    eyebrow,
    title: item.homeTitle || item.title,
    tagline,
    excerpt: item.homeExcerpt || item.excerpt,
  };
}

function GiftCard({ item }: { item: ExperienceItem }) {
  const content = giftHomeContent(item);
  const href = experienceHref(item.kind, item.slug);
  const style = {
    ...typographyVars("gift-eyebrow", item.homeEyebrowTypography, DEFAULT_GIFT_EYEBROW_TYPOGRAPHY),
    ...typographyVars("gift-title", item.homeTitleTypography, DEFAULT_GIFT_TITLE_TYPOGRAPHY),
    ...typographyVars("gift-tagline", item.homeTaglineTypography ?? item.subtitleTypography, DEFAULT_GIFT_TAGLINE_TYPOGRAPHY),
    ...typographyVars("gift-excerpt", item.homeExcerptTypography, DEFAULT_DESCRIPTION_TYPOGRAPHY),
  };

  return (
    <Link className="gift-carousel__card-link" href={href} aria-label={`Ver ${stripMarkdown(content.title) || item.title}`} style={style}>
      <span className="gift-carousel__media">
        <img
          src={assetPath(content.image)}
          alt={content.imageAlt}
          loading="lazy"
          decoding="async"
        />
      </span>
      <div className="gift-carousel__body">
        {content.eyebrow ? <MarkdownContent className="gift-carousel__eyebrow" source={content.eyebrow} /> : null}
        <div className="gift-carousel__headline">
          <MarkdownContent className="gift-carousel__title" source={content.title} />
          {content.tagline ? <MarkdownContent className="gift-carousel__tagline" source={content.tagline} /> : null}
        </div>
        <MarkdownContent
          className="gift-carousel__text"
          source={content.excerpt}
        />
        <span className="gift-carousel__cta" aria-hidden="true">
          ver más
        </span>
      </div>
    </Link>
  );
}

export function GiftCarousel({ items }: GiftCarouselProps) {
  if (items.length === 0) return null;
  const singleItem = items[0];

  if (items.length === 1 && singleItem) {
    return (
      <article className="gift-carousel gift-carousel--single">
        <GiftCard item={singleItem} />
      </article>
    );
  }

  return (
    <Carousel
      items={items}
      ariaLabel="Experiencias en ceramica"
      className="gift-carousel"
      viewportClassName="gift-carousel__viewport"
      trackClassName="gift-carousel__track"
      slideClassName="gift-carousel__slide"
      arrowClassName="gift-carousel__arrow"
      previousArrowClassName="gift-carousel__arrow--prev"
      nextArrowClassName="gift-carousel__arrow--next"
      previousLabel="Experiencia anterior"
      nextLabel="Experiencia siguiente"
      showArrows
      renderItem={(item) => <GiftCard item={item} />}
    />
  );
}
