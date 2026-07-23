import Image from "next/image";
import { MarkdownContent } from "@/components/ui/MarkdownContent";
import { assetPath } from "@/lib/assets";
import { richTextTypographyStyle, type RichTextTypography } from "@/lib/cms/rich-text-typography";
import { DEFAULT_HERO_IMAGE } from "../constants";

type HomeCardPreviewProps = {
  image: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  excerpt: string;
  excerptTypography: RichTextTypography;
  fallbackEyebrow: string;
  fallbackTitle: string;
  fallbackExcerpt: string;
};

export function HomeCardPreview({
  image,
  imageAlt,
  eyebrow,
  title,
  excerpt,
  excerptTypography,
  fallbackEyebrow,
  fallbackTitle,
  fallbackExcerpt,
}: HomeCardPreviewProps) {
  const resolvedImage = image || DEFAULT_HERO_IMAGE;
  const resolvedAlt = imageAlt || title || fallbackTitle || "Vista previa de la tarjeta";

  return (
    <div className="mx-auto w-full max-w-[420px]">
      <article className="content-card">
        <div className="content-card__media relative">
          <Image
            src={assetPath(resolvedImage)}
            alt={resolvedAlt}
            fill
            sizes="420px"
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="content-card__body">
          <p className="content-card__meta">{eyebrow || fallbackEyebrow}</p>
          <h3 className="content-card__title card__title">{title || fallbackTitle}</h3>
          <MarkdownContent
            className="content-card__excerpt body-text content-card__excerpt--styled"
            style={richTextTypographyStyle(excerptTypography)}
            source={excerpt || fallbackExcerpt}
          />
          <span className="content-card__cta">leer mas</span>
        </div>
      </article>
    </div>
  );
}
