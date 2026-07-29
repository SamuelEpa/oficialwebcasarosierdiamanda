"use client";

import { memo } from "react";
import { SocialGallery } from "@/components/home/SocialGallery";
import PublicFaqSection from "@/features/shared/contextual-sections/PublicFaqSection";
import type { PageAdditionsSectionProps } from "./PageAdditionsSection";

type Props = Pick<
  PageAdditionsSectionProps,
  "showFaqSection" | "showIdeaPromptSection" | "selectedFaqBlock" | "socialGalleryProps"
>;

function PagePreviewAdditionsComponent({
  showFaqSection,
  showIdeaPromptSection,
  selectedFaqBlock,
  socialGalleryProps,
}: Props) {
  return (
    <>
      {showFaqSection && selectedFaqBlock ? <PublicFaqSection block={selectedFaqBlock} /> : null}
      {showIdeaPromptSection ? <SocialGallery {...socialGalleryProps} /> : null}
    </>
  );
}

export const PagePreviewAdditions = memo(PagePreviewAdditionsComponent);
