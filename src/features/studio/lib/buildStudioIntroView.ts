import {
  DEFAULT_DESCRIPTION_TYPOGRAPHY,
  normalizeRichTextTypography,
  type RichTextTypography,
} from "@/lib/cms/rich-text-typography";
import type { StudioPageSettings } from "@/lib/cms/types";
import type { StudioIntroView } from "../types";
import { splitStudioIntroContent } from "./splitStudioIntroContent";

export function buildStudioIntroView(
  pageSettings: Pick<
    StudioPageSettings,
    "introHeading" | "introContent" | "introContentTypography"
  >,
): StudioIntroView {
  const headingFromCms = pageSettings.introHeading?.trim() ?? "";
  const split = splitStudioIntroContent(pageSettings.introContent);
  const bodyTypography = normalizeRichTextTypography(
    pageSettings.introContentTypography ?? DEFAULT_DESCRIPTION_TYPOGRAPHY,
  );

  if (headingFromCms) {
    return {
      heading: headingFromCms,
      body: pageSettings.introContent.trim(),
      bodyTypography,
    };
  }

  return {
    heading: split.heading ?? "",
    body: split.body || pageSettings.introContent.trim(),
    bodyTypography,
  };
}

export type { RichTextTypography };
