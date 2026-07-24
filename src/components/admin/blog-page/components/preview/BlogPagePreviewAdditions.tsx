"use client";

import { memo } from "react";
import { SocialGallery } from "@/components/home/SocialGallery";
import PublicFaqSection from "@/features/shared/contextual-sections/PublicFaqSection";
import type { BlogPageEditorState } from "../../hooks/useBlogPageEditor";

type Props = {
  showFaqSection: boolean;
  showIdeaPromptSection: boolean;
  selectedFaqBlock: BlogPageEditorState["selectedFaqBlock"];
  socialGalleryProps: BlogPageEditorState["socialGalleryProps"];
};

function BlogPagePreviewAdditionsComponent({
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

export const BlogPagePreviewAdditions = memo(BlogPagePreviewAdditionsComponent);
