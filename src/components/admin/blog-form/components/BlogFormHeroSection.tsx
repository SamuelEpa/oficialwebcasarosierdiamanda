"use client";

import { memo } from "react";
import SharedHeroEditor from "@/components/admin/SharedHeroEditor";
import type { BlogPostFormState } from "../hooks/useBlogPostForm";

function BlogFormHeroSectionComponent({
  hero,
  title,
  categorySubtitle,
  patchHero,
}: Pick<BlogPostFormState, "hero" | "title" | "patchHero"> & { categorySubtitle: string }) {
  return (
    <SharedHeroEditor
      details={hero}
      titleFallback={title || "Título de la bitácora"}
      subtitleFallback={categorySubtitle || "Bitácora"}
      onChange={patchHero}
    />
  );
}

export const BlogFormHeroSection = memo(BlogFormHeroSectionComponent);
