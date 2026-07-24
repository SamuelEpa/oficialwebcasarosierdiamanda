"use client";

import { useMemo } from "react";
import {
  DEFAULT_DESCRIPTION_TYPOGRAPHY,
  DEFAULT_RICH_TEXT_TYPOGRAPHY,
  normalizeRichTextTypography,
  type RichTextTypography,
} from "@/lib/cms/rich-text-typography";
import type { ClassOfferingDetails } from "@/lib/cms/types";

export type BasicInfoTypography = {
  subtitle: RichTextTypography;
  detailQuestion: RichTextTypography;
  highlight: RichTextTypography;
  description: RichTextTypography;
};

export function resolveBasicInfoTypography(details: ClassOfferingDetails): BasicInfoTypography {
  return {
    subtitle: normalizeRichTextTypography(details.subtitleTypography ?? DEFAULT_RICH_TEXT_TYPOGRAPHY),
    detailQuestion: normalizeRichTextTypography(details.detailQuestionTypography ?? DEFAULT_RICH_TEXT_TYPOGRAPHY),
    highlight: normalizeRichTextTypography(details.highlightDescriptionTypography ?? DEFAULT_RICH_TEXT_TYPOGRAPHY),
    description: normalizeRichTextTypography(details.descriptionTypography ?? DEFAULT_DESCRIPTION_TYPOGRAPHY),
  };
}

export function basicInfoTypographyRevision(details: ClassOfferingDetails): string {
  return [
    details.subtitleTypography?.fontSize,
    details.subtitleTypography?.weight,
    details.subtitleTypography?.width,
    details.subtitleTypography?.italic,
    details.detailQuestionTypography?.fontSize,
    details.detailQuestionTypography?.weight,
    details.detailQuestionTypography?.width,
    details.detailQuestionTypography?.italic,
    details.highlightDescriptionTypography?.fontSize,
    details.highlightDescriptionTypography?.weight,
    details.highlightDescriptionTypography?.width,
    details.highlightDescriptionTypography?.italic,
    details.descriptionTypography?.fontSize,
    details.descriptionTypography?.weight,
    details.descriptionTypography?.width,
    details.descriptionTypography?.italic,
  ].join("\u001f");
}

/** Revision key for preview rebuild when any rich-text typography changes (basic, home, hero). */
export function classEditPreviewTypographyRevision(details: ClassOfferingDetails): string {
  const home = details.homeCard?.excerptTypography;
  const heroText = details.heroPresentationTextTypography;
  const heroSubtitle = details.heroPresentationSubtitleTypography;
  return [
    basicInfoTypographyRevision(details),
    home?.fontSize,
    home?.weight,
    home?.width,
    home?.italic,
    heroText?.fontSize,
    heroText?.weight,
    heroText?.width,
    heroText?.italic,
    heroSubtitle?.fontSize,
    heroSubtitle?.weight,
    heroSubtitle?.width,
    heroSubtitle?.italic,
  ].join("\u001f");
}

export function useBasicInfoTypography(details: ClassOfferingDetails): BasicInfoTypography {
  const revision = basicInfoTypographyRevision(details);
  return useMemo(() => resolveBasicInfoTypography(details), [revision]);
}
