"use client";

import { memo } from "react";
import SharedHeroEditor from "@/components/admin/SharedHeroEditor";
import { BLOG_HERO_SUBTITLE_FALLBACK, BLOG_HERO_TITLE_FALLBACK } from "../constants";
import type { BlogPageEditorState } from "../hooks/useBlogPageEditor";

function BlogPageHeroSectionComponent({
  hero,
  patchHero,
}: Pick<BlogPageEditorState, "hero" | "patchHero">) {
  return (
    <SharedHeroEditor
      details={hero}
      titleFallback={BLOG_HERO_TITLE_FALLBACK}
      subtitleFallback={BLOG_HERO_SUBTITLE_FALLBACK}
      onChange={patchHero}
    />
  );
}

export const BlogPageHeroSection = memo(BlogPageHeroSectionComponent);
