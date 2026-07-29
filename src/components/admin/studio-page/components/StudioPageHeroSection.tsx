"use client";

import { memo } from "react";
import SharedHeroEditor from "@/components/admin/SharedHeroEditor";
import { STUDIO_HERO_SUBTITLE_FALLBACK, STUDIO_HERO_TITLE_FALLBACK } from "../constants";
import type { StudioPageEditorState } from "../hooks/useStudioPageEditor";

function StudioPageHeroSectionComponent({
  hero,
  patchHero,
}: Pick<StudioPageEditorState, "hero" | "patchHero">) {
  return (
    <SharedHeroEditor
      details={hero}
      titleFallback={STUDIO_HERO_TITLE_FALLBACK}
      subtitleFallback={STUDIO_HERO_SUBTITLE_FALLBACK}
      onChange={patchHero}
    />
  );
}

export const StudioPageHeroSection = memo(StudioPageHeroSectionComponent);
