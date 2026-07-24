"use client";

import { memo, useMemo } from "react";
import { NavbarGlobal } from "@/components/layout/NavbarGlobal";
import { PublicHeroContent, PublicHeroTitle } from "@/components/hero/PublicHeroContent";
import type { NavigationItem } from "@/data/types";
import type { SiteSettings } from "@/lib/cms/settings";
import type { CmsHeroSettings } from "@/lib/cms/types";
import { BLOG_HERO_TITLE_FALLBACK } from "../../constants";
import { blogPreviewHeroClasses, buildBlogPagePreviewHeroStyle } from "../../utils/heroPreviewStyle";

type Props = {
  hero: CmsHeroSettings;
  navigationItems: NavigationItem[];
  menuSettings: SiteSettings["menu"];
};

function BlogPagePreviewHeroComponent({ hero, navigationItems, menuSettings }: Props) {
  const heroStyle = useMemo(() => buildBlogPagePreviewHeroStyle(hero), [hero]);
  const heroClassName = useMemo(() => blogPreviewHeroClasses(hero), [hero]);
  const heroVariant = hero.heroVariant ?? "text";
  const isImageLikeHero = heroVariant === "image" || heroVariant === "presentation";

  return (
    <div style={heroStyle}>
      <header className={heroClassName}>
        <NavbarGlobal
          navigationItems={navigationItems}
          logoUrl={menuSettings.header_logo_url}
          scrollMenuBackgroundColor={menuSettings.scroll_menu_background_color}
          scrollMenuTextColor={menuSettings.scroll_menu_text_color}
          scrollMenuIconColor={menuSettings.scroll_menu_icon_color}
          scrollMenuLogoTintEnabled={menuSettings.scroll_menu_logo_tint_enabled}
          scrollMenuLogoTintColor={menuSettings.scroll_menu_logo_tint_color}
          heroMenuColor={hero.heroMenuColor}
          heroMenuScale={hero.heroMenuScale}
          heroLogoPositionX={hero.heroLogoPositionX}
          heroLogoPositionY={hero.heroLogoPositionY}
          heroLogoWidth={hero.heroLogoWidth}
          heroLogoTabletPositionX={hero.heroLogoTabletPositionX}
          heroLogoTabletPositionY={hero.heroLogoTabletPositionY}
          heroLogoTabletWidth={hero.heroLogoTabletWidth}
          heroLogoMobilePositionX={hero.heroLogoMobilePositionX}
          heroLogoMobilePositionY={hero.heroLogoMobilePositionY}
          heroLogoMobileWidth={hero.heroLogoMobileWidth}
          heroMenuPositionY={hero.heroMenuPositionY}
          heroMenuTabletPositionY={hero.heroMenuTabletPositionY}
          heroMenuMobilePositionY={hero.heroMenuMobilePositionY}
        />
        {isImageLikeHero ? (
          <PublicHeroContent hero={hero} />
        ) : (
          <PublicHeroTitle
            hero={hero}
            title={hero.heroTitle || BLOG_HERO_TITLE_FALLBACK}
            subtitle={hero.heroSubtitle}
          />
        )}
      </header>
    </div>
  );
}

export const BlogPagePreviewHero = memo(BlogPagePreviewHeroComponent);
