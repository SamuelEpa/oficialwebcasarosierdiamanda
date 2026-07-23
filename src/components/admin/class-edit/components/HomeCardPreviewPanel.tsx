"use client";

import { DEFAULT_RICH_TEXT_TYPOGRAPHY, normalizeRichTextTypography } from "@/lib/cms/rich-text-typography";
import type { Offering } from "@/lib/cms/types";
import { DEFAULT_HERO_IMAGE } from "../constants";
import type { ClassEditFormState } from "../hooks/useClassEditForm";
import { HomeCardPreview } from "./HomeCardPreview";
import { SectionCard } from "./SectionCard";

type HomeCardPreviewPanelProps = {
  offering: Offering;
  form: ClassEditFormState;
};

export function HomeCardPreviewPanel({ offering, form }: HomeCardPreviewPanelProps) {
  const { title, details } = form;
  const excerptTypography = normalizeRichTextTypography(details.homeCard.excerptTypography ?? DEFAULT_RICH_TEXT_TYPOGRAPHY);
  const fallbackImage = details.galleryImages.find((item) => item.image)?.image || details.heroImage || DEFAULT_HERO_IMAGE;

  return (
    <SectionCard
      compact
      title="Vista previa"
      description="Misma estructura visual que se mostrará si seleccionas este contenido desde Inicio → destacados."
      className="class-edit-home-preview-card"
    >
      <HomeCardPreview
        image={details.homeCard.image || fallbackImage}
        imageAlt={details.homeCard.imageAlt}
        eyebrow={details.homeCard.eyebrow}
        title={details.homeCard.title}
        excerpt={details.homeCard.excerpt}
        excerptTypography={excerptTypography}
        fallbackEyebrow={details.heroSubtitle || offering.type}
        fallbackTitle={title || "Título de la tarjeta"}
        fallbackExcerpt={details.homeExcerpt || details.highlightDescription || "Descripción breve de la tarjeta."}
      />
    </SectionCard>
  );
}
