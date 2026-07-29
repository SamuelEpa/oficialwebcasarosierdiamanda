import type { CSSProperties } from "react";
import {
  DEFAULT_DESCRIPTION_TYPOGRAPHY,
  normalizeRichTextTypography,
  richTextTypographyStyle,
  type RichTextTypography,
} from "@/lib/cms/rich-text-typography";
import { STUDIO_TEAM_BIO_FONT_SIZE_PX } from "../constants";

/** Maps CMS bio typography to the smaller public editorial size. */
export function buildStudioTeamMemberBioStyle(
  bioTypography?: RichTextTypography,
): CSSProperties {
  const base = normalizeRichTextTypography(
    bioTypography ?? DEFAULT_DESCRIPTION_TYPOGRAPHY,
  );

  return richTextTypographyStyle({
    ...base,
    fontSize: STUDIO_TEAM_BIO_FONT_SIZE_PX,
  });
}
