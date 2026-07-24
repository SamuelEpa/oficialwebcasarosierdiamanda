"use client";

import type { CSSProperties, ReactNode } from "react";
import { NavbarGlobal } from "@/components/layout/NavbarGlobal";
import { PublicHeroContent, PublicHeroTitle } from "@/components/hero/PublicHeroContent";
import type { NavigationItem } from "@/data/types";
import { assetPath } from "@/lib/assets";
import type { SiteSettings } from "@/lib/cms/settings";
import type { CmsHeroSettings } from "@/lib/cms/types";

function buildPublicHeroPreviewStyle(hero: CmsHeroSettings): CSSProperties {
  const variant = hero.heroVariant ?? "text";
  const isImageLike = variant === "image" || variant === "presentation";
  const heroMenuTone = hero.heroMenuTone ?? (isImageLike ? "light" : "dark");
  const heroMenuColor = hero.heroMenuColor || (heroMenuTone === "light" ? "#ffffff" : "#3f3933");

  return {
    "--page-hero-image": `url("${assetPath(hero.heroImage || "/img/hero-bg.jpg")}")`,
    "--page-hero-image-mobile": `url("${assetPath(hero.heroImageMobile || hero.heroImage || "/img/hero-bg.jpg")}")`,
    "--hero-logo-position-x": hero.heroLogoPositionX || "50%",
    "--hero-logo-position-y": hero.heroLogoPositionY || "46px",
    "--hero-logo-width": hero.heroLogoWidth || "118px",
    "--hero-logo-tablet-position-x": hero.heroLogoTabletPositionX || hero.heroLogoPositionX || "50%",
    "--hero-logo-tablet-position-y": hero.heroLogoTabletPositionY || hero.heroLogoPositionY || "42px",
    "--hero-logo-tablet-width": hero.heroLogoTabletWidth || hero.heroLogoWidth || "106px",
    "--hero-logo-mobile-position-x": hero.heroLogoMobilePositionX || hero.heroLogoPositionX || "50%",
    "--hero-logo-mobile-position-y": hero.heroLogoMobilePositionY || "34px",
    "--hero-logo-mobile-width": hero.heroLogoMobileWidth || "92px",
    "--hero-menu-position-y": hero.heroMenuPositionY || "132px",
    "--hero-menu-tablet-position-y": hero.heroMenuTabletPositionY || hero.heroMenuPositionY || "118px",
    "--hero-menu-mobile-position-y": hero.heroMenuMobilePositionY || "96px",
    "--hero-menu-color": heroMenuColor,
    "--hero-menu-scale": hero.heroMenuScale ?? 1,
    "--title-image-scale": hero.titleImageScale ?? 1,
    "--title-image-scale-tablet": hero.titleImageScaleTablet ?? hero.titleImageScale ?? 1,
    "--title-image-scale-mobile": hero.titleImageScaleMobile ?? hero.titleImageScale ?? 1,
    "--title-image-position-x": hero.titleImagePositionX || "50%",
    "--title-image-position-y": hero.titleImagePositionY || "50%",
    "--title-image-position-x-tablet": hero.titleImagePositionXTablet || hero.titleImagePositionX || "50%",
    "--title-image-position-y-tablet": hero.titleImagePositionYTablet || hero.titleImagePositionY || "50%",
    "--title-image-position-x-mobile": hero.titleImagePositionXMobile || hero.titleImagePositionX || "50%",
    "--title-image-position-y-mobile": hero.titleImagePositionYMobile || "50%",
    "--title-image-secondary-scale": hero.titleImageSecondaryScale ?? 1,
    "--title-image-secondary-scale-tablet": hero.titleImageSecondaryScaleTablet ?? hero.titleImageSecondaryScale ?? 1,
    "--title-image-secondary-scale-mobile": hero.titleImageSecondaryScaleMobile ?? hero.titleImageSecondaryScale ?? 1,
    "--title-image-secondary-position-x": hero.titleImageSecondaryPositionX || "50%",
    "--title-image-secondary-position-y": hero.titleImageSecondaryPositionY || "50%",
    "--title-image-secondary-position-x-tablet":
      hero.titleImageSecondaryPositionXTablet || hero.titleImageSecondaryPositionX || "50%",
    "--title-image-secondary-position-y-tablet":
      hero.titleImageSecondaryPositionYTablet || hero.titleImageSecondaryPositionY || "50%",
    "--title-image-secondary-position-x-mobile":
      hero.titleImageSecondaryPositionXMobile || hero.titleImageSecondaryPositionX || "50%",
    "--title-image-secondary-position-y-mobile": hero.titleImageSecondaryPositionYMobile || "50%",
    "--hero-title-position-x": hero.heroTitlePositionX || "50%",
    "--hero-title-position-x-tablet": hero.heroTitlePositionXTablet || hero.heroTitlePositionX || "50%",
    "--hero-title-position-x-mobile": hero.heroTitlePositionXMobile || "50%",
    "--hero-title-position-y": hero.heroTitlePositionY || "50%",
    "--hero-title-position-y-tablet": hero.heroTitlePositionYTablet || hero.heroTitlePositionY || "50%",
    "--hero-title-position-y-mobile": hero.heroTitlePositionYMobile || "50%",
    "--hero-title-scale": hero.heroTitleScale ?? 1,
    "--hero-title-scale-tablet": hero.heroTitleScaleTablet ?? hero.heroTitleScale ?? 1,
    "--hero-title-scale-mobile": hero.heroTitleScaleMobile ?? 1,
    "--presentation-text-position-x": hero.presentationTextPositionX || "8%",
    "--presentation-text-position-y": hero.presentationTextPositionY || "50%",
    "--presentation-text-position-x-tablet":
      hero.presentationTextPositionXTablet || hero.presentationTextPositionX || "8%",
    "--presentation-text-position-y-tablet":
      hero.presentationTextPositionYTablet || hero.presentationTextPositionY || "50%",
    "--presentation-text-position-x-mobile":
      hero.presentationTextPositionXMobile || hero.presentationTextPositionX || "8%",
    "--presentation-text-position-y-mobile": hero.presentationTextPositionYMobile || "50%",
    "--presentation-text-scale": hero.presentationTextScale ?? 1,
    "--presentation-text-scale-tablet": hero.presentationTextScaleTablet ?? hero.presentationTextScale ?? 1,
    "--presentation-text-scale-mobile": hero.presentationTextScaleMobile ?? 1,
    "--presentation-image-position-x": hero.presentationImagePositionX || "70%",
    "--presentation-image-position-y": hero.presentationImagePositionY || "50%",
    "--presentation-image-position-x-tablet":
      hero.presentationImagePositionXTablet || hero.presentationImagePositionX || "70%",
    "--presentation-image-position-y-tablet":
      hero.presentationImagePositionYTablet || hero.presentationImagePositionY || "50%",
    "--presentation-image-position-x-mobile":
      hero.presentationImagePositionXMobile || hero.presentationImagePositionX || "70%",
    "--presentation-image-position-y-mobile": hero.presentationImagePositionYMobile || "50%",
    "--presentation-image-scale": hero.presentationImageScale ?? 1,
    "--presentation-image-scale-tablet": hero.presentationImageScaleTablet ?? hero.presentationImageScale ?? 1,
    "--presentation-image-scale-mobile": hero.presentationImageScaleMobile ?? 1,
  } as CSSProperties;
}

export default function CmsPublicHeroPreview({
  hero,
  navigationItems,
  menuSettings,
  height = "medium",
  className = "",
  titleFallback = "",
  subtitleFallback,
  children,
}: {
  hero: CmsHeroSettings;
  navigationItems: NavigationItem[];
  menuSettings: SiteSettings["menu"];
  height?: "small" | "medium" | "large";
  className?: string;
  /** Used when heroVariant is text and heroTitle is empty. */
  titleFallback?: string;
  subtitleFallback?: string;
  /** Legacy override. Prefer omitting children so PublicHeroContent/Title render like HeaderInterno. */
  children?: ReactNode;
}) {
  const variant = hero.heroVariant ?? "text";
  const isImageLike = variant === "image" || variant === "presentation";
  const heroMenuTone = hero.heroMenuTone ?? (isImageLike ? "light" : "dark");
  const heroMenuColor = hero.heroMenuColor || (heroMenuTone === "light" ? "#ffffff" : "#3f3933");
  const scrollThreshold = Number.parseInt(hero.heroMenuPositionY ?? "", 10) || 132;
  const tabletScrollThreshold = Number.parseInt(hero.heroMenuTabletPositionY ?? "", 10) || scrollThreshold;
  const mobileScrollThreshold = Number.parseInt(hero.heroMenuMobilePositionY ?? "", 10) || 96;
  const style = buildPublicHeroPreviewStyle(hero);
  const usePublicContent = children === undefined;

  return (
    <div style={style}>
      <header
        className={[
          "header-interno page-hero header-interno--ready header-interno--center header-interno--overlay-warm",
          isImageLike ? "header-interno--image-hero" : "header-interno--text-hero",
          variant === "presentation" ? "header-interno--presentation-hero" : "",
          `header-interno--menu-${heroMenuTone}`,
          `header-interno--${height}`,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        data-header-height={height}
        data-header-alignment="center"
        data-header-overlay="warm"
      >
        <NavbarGlobal
          navigationItems={navigationItems}
          logoUrl={menuSettings.header_logo_url}
          scrollMenuBackgroundColor={menuSettings.scroll_menu_background_color}
          scrollMenuTextColor={menuSettings.scroll_menu_text_color}
          scrollMenuIconColor={menuSettings.scroll_menu_icon_color}
          scrollMenuLogoTintEnabled={menuSettings.scroll_menu_logo_tint_enabled}
          scrollMenuLogoTintColor={menuSettings.scroll_menu_logo_tint_color}
          scrollThreshold={scrollThreshold}
          tabletScrollThreshold={tabletScrollThreshold}
          mobileScrollThreshold={mobileScrollThreshold}
          heroMenuColor={heroMenuColor}
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
        {usePublicContent ? (
          <>
            {isImageLike ? <PublicHeroContent hero={hero} /> : null}
            {variant === "text" ? (
              <PublicHeroTitle
                hero={hero}
                title={hero.heroTitle || titleFallback}
                subtitle={hero.heroSubtitle || subtitleFallback}
              />
            ) : null}
          </>
        ) : (
          <div className="header-interno__inner page-hero__inner container" aria-hidden="true">
            {children}
          </div>
        )}
      </header>
    </div>
  );
}
