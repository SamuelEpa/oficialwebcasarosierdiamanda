import Link from "next/link";
import type { ExperienceItem } from "@/data/types";
import { assetPath } from "@/lib/assets";
import {
  DEFAULT_RICH_TEXT_TYPOGRAPHY,
  normalizeRichTextTypography,
  richTextTypographyStyle,
} from "@/lib/cms/rich-text-typography";
import { experienceHref } from "@/lib/routes";
import { truncateHomeFlipExcerpt } from "@/lib/text/plain-text";

function homeCardExcerpt(item: ExperienceItem) {
  const raw = item.homeExcerpt || item.excerpt;
  return raw.trim() || "Descubre esta experiencia en Casa Rosier.";
}

export function FeaturedExperienceCards({ items }: { items: readonly ExperienceItem[] }) {
  return (
    <>
      {items.map((item) => {
        const href = experienceHref(item.kind, item.slug);
        const image = item.homeImage || item.coverImage;
        const resolvedImage = assetPath(image);
        const label = item.homeTitle || item.title;
        const excerptTypography = normalizeRichTextTypography(
          item.homeExcerptTypography ?? DEFAULT_RICH_TEXT_TYPOGRAPHY,
        );
        const excerptStyle = richTextTypographyStyle(excerptTypography);
        const flipExcerpt = truncateHomeFlipExcerpt(homeCardExcerpt(item));

        return (
          <article className="content-card content-card--home-flip" key={item.id}>
            <Link
              className="content-card__link content-card__link--home-flip"
              href={href}
              aria-label={`Ver ${label}`}
            >
              <div className="content-card__flip-scene">
                <div className="content-card__flip-panel">
                  <div className="content-card__flip-face content-card__flip-face--front">
                    <img
                      src={resolvedImage}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className={resolvedImage !== `/${image}` ? "asset-fallback" : undefined}
                    />
                  </div>
                  <div className="content-card__flip-face content-card__flip-face--back">
                    <p
                      className="content-card__flip-copy content-card__excerpt--styled"
                      style={excerptStyle}
                    >
                      {flipExcerpt}
                    </p>
                  </div>
                </div>
              </div>
              <p className="content-card__caption">{label}</p>
            </Link>
          </article>
        );
      })}
    </>
  );
}
