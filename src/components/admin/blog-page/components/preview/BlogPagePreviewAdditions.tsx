"use client";

import { memo } from "react";
import { PagePreviewAdditions } from "@/components/admin/page-editor/components/PagePreviewAdditions";
import type { PageAdditionsSectionProps } from "@/components/admin/page-editor/components/PageAdditionsSection";

type Props = Pick<
  PageAdditionsSectionProps,
  "showFaqSection" | "showIdeaPromptSection" | "selectedFaqBlock" | "socialGalleryProps"
>;

function BlogPagePreviewAdditionsComponent(props: Props) {
  return <PagePreviewAdditions {...props} />;
}

export const BlogPagePreviewAdditions = memo(BlogPagePreviewAdditionsComponent);
