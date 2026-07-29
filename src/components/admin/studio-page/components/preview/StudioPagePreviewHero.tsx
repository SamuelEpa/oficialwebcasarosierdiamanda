"use client";

import { memo } from "react";
import CmsPublicHeroPreview from "@/components/admin/CmsPublicHeroPreview";
import type { NavigationItem } from "@/data/types";
import type { SiteSettings } from "@/lib/cms/settings";
import type { CmsHeroSettings } from "@/lib/cms/types";
import { STUDIO_HERO_SUBTITLE_FALLBACK, STUDIO_HERO_TITLE_FALLBACK } from "../../constants";

type Props = {
  hero: CmsHeroSettings;
  navigationItems: NavigationItem[];
  menuSettings: SiteSettings["menu"];
};

function StudioPagePreviewHeroComponent({ hero, navigationItems, menuSettings }: Props) {
  return (
    <CmsPublicHeroPreview
      hero={hero}
      navigationItems={navigationItems}
      menuSettings={menuSettings}
      height="large"
      titleFallback={STUDIO_HERO_TITLE_FALLBACK}
      subtitleFallback={STUDIO_HERO_SUBTITLE_FALLBACK}
    />
  );
}

export const StudioPagePreviewHero = memo(StudioPagePreviewHeroComponent);
