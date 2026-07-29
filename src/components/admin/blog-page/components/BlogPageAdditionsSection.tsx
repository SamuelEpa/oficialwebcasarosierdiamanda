"use client";

import { memo } from "react";
import {
  PageAdditionsSection,
  type PageAdditionsSectionProps,
} from "@/components/admin/page-editor/components/PageAdditionsSection";

function BlogPageAdditionsSectionComponent(props: PageAdditionsSectionProps) {
  return <PageAdditionsSection {...props} />;
}

export const BlogPageAdditionsSection = memo(BlogPageAdditionsSectionComponent);
