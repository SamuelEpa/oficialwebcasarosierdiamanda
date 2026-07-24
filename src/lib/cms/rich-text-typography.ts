import type { CSSProperties } from "react";

export interface RichTextTypography {
  italic: boolean;
  weight: number;
  width: number;
  fontSize: number;
}

export const DEFAULT_RICH_TEXT_TYPOGRAPHY: RichTextTypography = {
  italic: false,
  weight: 400,
  width: 100,
  fontSize: 28,
};

export function normalizeRichTextTypography(value: unknown): RichTextTypography {
  const source = value && typeof value === "object" && !Array.isArray(value)
    ? value as Partial<RichTextTypography>
    : {};

  const fontSize = Number(source.fontSize);
  const weight = Number(source.weight);
  const width = Number(source.width);

  return {
    italic: Boolean(source.italic),
    weight: Number.isFinite(weight) ? Math.min(900, Math.max(100, weight)) : DEFAULT_RICH_TEXT_TYPOGRAPHY.weight,
    width: Number.isFinite(width) ? Math.min(125, Math.max(75, width)) : DEFAULT_RICH_TEXT_TYPOGRAPHY.width,
    fontSize: Number.isFinite(fontSize) ? Math.min(72, Math.max(12, fontSize)) : DEFAULT_RICH_TEXT_TYPOGRAPHY.fontSize,
  };
}

export function richTextTypographyStyle(typography: RichTextTypography): CSSProperties {
  return {
    "--tiptap-preview-font-size": `${typography.fontSize}px`,
    "--tiptap-preview-font-weight": typography.weight,
    "--tiptap-preview-font-stretch": `${typography.width}%`,
    "--tiptap-preview-font-width": typography.width,
    "--tiptap-preview-font-style": typography.italic ? "italic" : "normal",
    "--content-card-excerpt-font-size": `${typography.fontSize}px`,
    "--content-card-excerpt-font-weight": typography.weight,
    "--content-card-excerpt-font-stretch": `${typography.width}%`,
    "--content-card-excerpt-font-width": typography.width,
    "--content-card-excerpt-font-style": typography.italic ? "italic" : "normal",
    fontSize: `${typography.fontSize}px`,
    fontWeight: typography.weight,
    fontStretch: `${typography.width}%`,
    fontStyle: typography.italic ? "italic" : "normal",
    fontVariationSettings: `"wdth" ${typography.width}, "wght" ${typography.weight}`,
  } as CSSProperties;
}

export type DetailTextTypographyScope =
  | "subtitle"
  | "detailQuestion"
  | "highlight"
  | "description";

const DETAIL_TEXT_CSS_PREFIX: Record<DetailTextTypographyScope, string> = {
  subtitle: "class-detail-subtitle",
  detailQuestion: "class-detail-question",
  highlight: "class-detail-highlight",
  description: "class-detail-copy",
};

export function detailTextTypographyStyle(
  typography: RichTextTypography,
  scope: DetailTextTypographyScope,
): CSSProperties {
  const prefix = DETAIL_TEXT_CSS_PREFIX[scope];
  return {
    [`--${prefix}-font-size`]: `${typography.fontSize}px`,
    [`--${prefix}-font-weight`]: typography.weight,
    [`--${prefix}-font-stretch`]: `${typography.width}%`,
    [`--${prefix}-font-width`]: typography.width,
    [`--${prefix}-font-style`]: typography.italic ? "italic" : "normal",
    ...richTextTypographyStyle(typography),
  } as CSSProperties;
}

export const DEFAULT_DESCRIPTION_TYPOGRAPHY: RichTextTypography = {
  ...DEFAULT_RICH_TEXT_TYPOGRAPHY,
  fontSize: 18,
};
