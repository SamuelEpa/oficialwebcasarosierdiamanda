import type { CSSProperties } from "react";
import type { CmsHeroSettings } from "@/lib/cms/types";

/** CSS variables for the public blog hero preview (desktop-scale frame). */
export function buildBlogPagePreviewHeroStyle(hero: CmsHeroSettings): CSSProperties {
  return {
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
    "--hero-menu-color": hero.heroMenuColor || (hero.heroMenuTone === "light" ? "#ffffff" : "#3f3933"),
    "--hero-menu-scale": String(hero.heroMenuScale ?? 1),
    "--title-image-scale": String(hero.titleImageScale ?? 1),
    "--title-image-position-x": hero.titleImagePositionX || "50%",
    "--title-image-position-y": hero.titleImagePositionY || "50%",
    "--title-image-secondary-scale": String(hero.titleImageSecondaryScale ?? 1),
    "--title-image-secondary-position-x": hero.titleImageSecondaryPositionX || "50%",
    "--title-image-secondary-position-y": hero.titleImageSecondaryPositionY || "50%",
    "--hero-title-position-y": hero.heroTitlePositionY || "50%",
    "--hero-title-scale": String(hero.heroTitleScale ?? 1),
    "--presentation-text-position-x": hero.presentationTextPositionX || "8%",
    "--presentation-text-position-y": hero.presentationTextPositionY || "50%",
    "--presentation-text-scale": String(hero.presentationTextScale ?? 1),
    "--presentation-image-position-x": hero.presentationImagePositionX || "70%",
    "--presentation-image-position-y": hero.presentationImagePositionY || "50%",
    "--presentation-image-scale": String(hero.presentationImageScale ?? 1),
  } as CSSProperties;
}

export function blogPreviewMenuTone(hero: CmsHeroSettings) {
  const heroVariant = hero.heroVariant ?? "text";
  const isImageLikeHero = heroVariant === "image" || heroVariant === "presentation";
  return hero.heroMenuTone ?? (isImageLikeHero ? "light" : "dark");
}

export function blogPreviewHeroClasses(hero: CmsHeroSettings) {
  const heroVariant = hero.heroVariant ?? "text";
  const isImageLikeHero = heroVariant === "image" || heroVariant === "presentation";
  const menuTone = blogPreviewMenuTone(hero);

  return [
    "header-interno",
    "page-hero",
    "header-interno--ready",
    "header-interno--center",
    "header-interno--overlay-warm",
    isImageLikeHero ? "header-interno--image-hero" : "header-interno--text-hero",
    heroVariant === "presentation" ? "header-interno--presentation-hero" : "",
    `header-interno--menu-${menuTone}`,
    "header-interno--large",
    "blog-hero",
  ]
    .filter(Boolean)
    .join(" ");
}
