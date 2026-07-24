"use client";

import { useMemo } from "react";
import type { ClassOfferingDetails, Offering } from "@/lib/cms/types";
import { classEditPreviewTypographyRevision } from "./useBasicInfoTypography";
import { buildPreviewItem } from "../utils";

export function useClassEditPreviewItem({
  offeringType,
  title,
  slug,
  subtitle,
  description,
  seoTitle,
  seoDescription,
  details,
}: {
  offeringType: Offering["type"];
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  details: ClassOfferingDetails;
}) {
  const typographyRevision = classEditPreviewTypographyRevision(details);

  return useMemo(
    () =>
      buildPreviewItem({
        offeringType,
        title,
        slug,
        subtitle,
        description,
        seoTitle,
        seoDescription,
        details,
      }),
    [description, details, offeringType, seoDescription, seoTitle, slug, subtitle, title, typographyRevision],
  );
}
