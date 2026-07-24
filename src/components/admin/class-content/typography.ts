import {
  DEFAULT_DESCRIPTION_TYPOGRAPHY,
  normalizeRichTextTypography,
  type RichTextTypography,
} from "@/lib/cms/rich-text-typography";

export function resolveContentTypography(value: RichTextTypography | undefined) {
  return normalizeRichTextTypography(value ?? DEFAULT_DESCRIPTION_TYPOGRAPHY);
}
