import type { CSSProperties } from "react";
import { assetPath } from "@/lib/assets";
import type { HeaderInternoProps } from "./headerInternoTypes";

export function buildHeaderInternoStyle(props: HeaderInternoProps): CSSProperties {
  const {
    image = "img/hero-bg.jpg",
    mobileImage,
    hero,
    heroMenuTone,
    heroMenuColor = hero?.heroMenuColor,
    heroMenuScale = hero?.heroMenuScale,
    heroLogoPositionX = hero?.heroLogoPositionX,
    heroLogoPositionY = hero?.heroLogoPositionY,
    heroLogoWidth = hero?.heroLogoWidth,
    heroLogoTabletPositionX = hero?.heroLogoTabletPositionX,
    heroLogoTabletPositionY = hero?.heroLogoTabletPositionY,
    heroLogoTabletWidth = hero?.heroLogoTabletWidth,
    heroLogoMobilePositionX = hero?.heroLogoMobilePositionX,
    heroLogoMobilePositionY = hero?.heroLogoMobilePositionY,
    heroLogoMobileWidth = hero?.heroLogoMobileWidth,
    heroMenuPositionY = hero?.heroMenuPositionY,
    heroMenuTabletPositionY = hero?.heroMenuTabletPositionY,
    heroMenuMobilePositionY = hero?.heroMenuMobilePositionY,
    heroTitleImageScale = hero?.titleImageScale,
    heroTitleImageScaleTablet = hero?.titleImageScaleTablet,
    heroTitleImageScaleMobile = hero?.titleImageScaleMobile,
    heroTitleImagePositionX = hero?.titleImagePositionX,
    heroTitleImagePositionY = hero?.titleImagePositionY,
    heroTitleImagePositionXTablet = hero?.titleImagePositionXTablet,
    heroTitleImagePositionYTablet = hero?.titleImagePositionYTablet,
    heroTitleImagePositionXMobile = hero?.titleImagePositionXMobile,
    heroTitleImagePositionYMobile = hero?.titleImagePositionYMobile,
    heroTitleImageSecondaryScale = hero?.titleImageSecondaryScale,
    heroTitleImageSecondaryScaleTablet = hero?.titleImageSecondaryScaleTablet,
    heroTitleImageSecondaryScaleMobile = hero?.titleImageSecondaryScaleMobile,
    heroTitleImageSecondaryPositionX = hero?.titleImageSecondaryPositionX,
    heroTitleImageSecondaryPositionY = hero?.titleImageSecondaryPositionY,
    heroTitleImageSecondaryPositionXTablet = hero?.titleImageSecondaryPositionXTablet,
    heroTitleImageSecondaryPositionYTablet = hero?.titleImageSecondaryPositionYTablet,
    heroTitleImageSecondaryPositionXMobile = hero?.titleImageSecondaryPositionXMobile,
    heroTitleImageSecondaryPositionYMobile = hero?.titleImageSecondaryPositionYMobile,
    heroTitlePositionX = hero?.heroTitlePositionX,
    heroTitlePositionXTablet = hero?.heroTitlePositionXTablet,
    heroTitlePositionXMobile = hero?.heroTitlePositionXMobile,
    heroTitlePositionY = hero?.heroTitlePositionY,
    heroTitlePositionYTablet = hero?.heroTitlePositionYTablet,
    heroTitlePositionYMobile = hero?.heroTitlePositionYMobile,
    heroTitleScale = hero?.heroTitleScale,
    heroTitleScaleTablet = hero?.heroTitleScaleTablet,
    heroTitleScaleMobile = hero?.heroTitleScaleMobile,
    presentationTextPositionX = hero?.presentationTextPositionX,
    presentationTextPositionY = hero?.presentationTextPositionY,
    presentationTextPositionXTablet = hero?.presentationTextPositionXTablet,
    presentationTextPositionYTablet = hero?.presentationTextPositionYTablet,
    presentationTextPositionXMobile = hero?.presentationTextPositionXMobile,
    presentationTextPositionYMobile = hero?.presentationTextPositionYMobile,
    presentationTextScale = hero?.presentationTextScale,
    presentationTextScaleTablet = hero?.presentationTextScaleTablet,
    presentationTextScaleMobile = hero?.presentationTextScaleMobile,
    presentationImagePositionX = hero?.presentationImagePositionX,
    presentationImagePositionY = hero?.presentationImagePositionY,
    presentationImagePositionXTablet = hero?.presentationImagePositionXTablet,
    presentationImagePositionYTablet = hero?.presentationImagePositionYTablet,
    presentationImagePositionXMobile = hero?.presentationImagePositionXMobile,
    presentationImagePositionYMobile = hero?.presentationImagePositionYMobile,
    presentationImageScale = hero?.presentationImageScale,
    presentationImageScaleTablet = hero?.presentationImageScaleTablet,
    presentationImageScaleMobile = hero?.presentationImageScaleMobile,
  } = props;
  return {
    "--page-hero-image": `url("${assetPath(image)}")`,
    "--page-hero-image-mobile": `url("${assetPath(mobileImage || image)}")`,
    "--hero-logo-position-x": heroLogoPositionX ?? "50%",
    "--hero-logo-position-y": heroLogoPositionY ?? "46px",
    "--hero-logo-width": heroLogoWidth ?? "118px",
    "--hero-logo-tablet-position-x": heroLogoTabletPositionX ?? heroLogoPositionX ?? "50%",
    "--hero-logo-tablet-position-y": heroLogoTabletPositionY ?? heroLogoPositionY ?? "42px",
    "--hero-logo-tablet-width": heroLogoTabletWidth ?? heroLogoWidth ?? "106px",
    "--hero-logo-mobile-position-x":
      heroLogoMobilePositionX ?? heroLogoTabletPositionX ?? heroLogoPositionX ?? "50%",
    "--hero-logo-mobile-position-y":
      heroLogoMobilePositionY ?? heroLogoTabletPositionY ?? heroLogoPositionY ?? "34px",
    "--hero-logo-mobile-width":
      heroLogoMobileWidth ?? heroLogoTabletWidth ?? heroLogoWidth ?? "92px",
    "--hero-menu-position-y": heroMenuPositionY ?? "132px",
    "--hero-menu-tablet-position-y": heroMenuTabletPositionY ?? heroMenuPositionY ?? "118px",
    "--hero-menu-mobile-position-y":
      heroMenuMobilePositionY ?? heroMenuTabletPositionY ?? heroMenuPositionY ?? "96px",
    "--hero-menu-color": heroMenuColor ?? (heroMenuTone === "light" ? "#ffffff" : "#3f3933"),
    "--hero-menu-scale": heroMenuScale ?? 1,
    "--title-image-scale": heroTitleImageScale ?? 1,
    "--title-image-scale-tablet": heroTitleImageScaleTablet ?? heroTitleImageScale ?? 1,
    "--title-image-scale-mobile":
      heroTitleImageScaleMobile ?? heroTitleImageScaleTablet ?? heroTitleImageScale ?? 1,
    "--title-image-position-x": heroTitleImagePositionX ?? "50%",
    "--title-image-position-y": heroTitleImagePositionY ?? "50%",
    "--title-image-position-x-tablet": heroTitleImagePositionXTablet ?? heroTitleImagePositionX ?? "50%",
    "--title-image-position-y-tablet": heroTitleImagePositionYTablet ?? heroTitleImagePositionY ?? "50%",
    "--title-image-position-x-mobile":
      heroTitleImagePositionXMobile ?? heroTitleImagePositionXTablet ?? heroTitleImagePositionX ?? "50%",
    "--title-image-position-y-mobile":
      heroTitleImagePositionYMobile ?? heroTitleImagePositionYTablet ?? heroTitleImagePositionY ?? "50%",
    "--title-image-secondary-scale": heroTitleImageSecondaryScale ?? 1,
    "--title-image-secondary-scale-tablet": heroTitleImageSecondaryScaleTablet ?? heroTitleImageSecondaryScale ?? 1,
    "--title-image-secondary-scale-mobile":
      heroTitleImageSecondaryScaleMobile ??
      heroTitleImageSecondaryScaleTablet ??
      heroTitleImageSecondaryScale ??
      1,
    "--title-image-secondary-position-x": heroTitleImageSecondaryPositionX ?? "50%",
    "--title-image-secondary-position-y": heroTitleImageSecondaryPositionY ?? "50%",
    "--title-image-secondary-position-x-tablet":
      heroTitleImageSecondaryPositionXTablet ?? heroTitleImageSecondaryPositionX ?? "50%",
    "--title-image-secondary-position-y-tablet":
      heroTitleImageSecondaryPositionYTablet ?? heroTitleImageSecondaryPositionY ?? "50%",
    "--title-image-secondary-position-x-mobile":
      heroTitleImageSecondaryPositionXMobile ??
      heroTitleImageSecondaryPositionXTablet ??
      heroTitleImageSecondaryPositionX ??
      "50%",
    "--title-image-secondary-position-y-mobile":
      heroTitleImageSecondaryPositionYMobile ??
      heroTitleImageSecondaryPositionYTablet ??
      heroTitleImageSecondaryPositionY ??
      "50%",
    "--hero-title-position-x": heroTitlePositionX ?? "50%",
    "--hero-title-position-x-tablet": heroTitlePositionXTablet ?? heroTitlePositionX ?? "50%",
    "--hero-title-position-x-mobile":
      heroTitlePositionXMobile ?? heroTitlePositionXTablet ?? heroTitlePositionX ?? "50%",
    "--hero-title-position-y": heroTitlePositionY ?? "50%",
    "--hero-title-position-y-tablet": heroTitlePositionYTablet ?? heroTitlePositionY ?? "50%",
    "--hero-title-position-y-mobile":
      heroTitlePositionYMobile ?? heroTitlePositionYTablet ?? heroTitlePositionY ?? "50%",
    "--hero-title-scale": heroTitleScale ?? 1,
    "--hero-title-scale-tablet": heroTitleScaleTablet ?? heroTitleScale ?? 1,
    "--hero-title-scale-mobile": heroTitleScaleMobile ?? heroTitleScaleTablet ?? heroTitleScale ?? 1,
    "--presentation-text-position-x": presentationTextPositionX ?? "8%",
    "--presentation-text-position-y": presentationTextPositionY ?? "50%",
    "--presentation-text-position-x-tablet":
      presentationTextPositionXTablet ?? presentationTextPositionX ?? "8%",
    "--presentation-text-position-y-tablet":
      presentationTextPositionYTablet ?? presentationTextPositionY ?? "50%",
    "--presentation-text-position-x-mobile":
      presentationTextPositionXMobile ?? presentationTextPositionXTablet ?? presentationTextPositionX ?? "8%",
    "--presentation-text-position-y-mobile":
      presentationTextPositionYMobile ?? presentationTextPositionYTablet ?? presentationTextPositionY ?? "50%",
    "--presentation-text-scale": presentationTextScale ?? 1,
    "--presentation-text-scale-tablet": presentationTextScaleTablet ?? presentationTextScale ?? 1,
    "--presentation-text-scale-mobile":
      presentationTextScaleMobile ?? presentationTextScaleTablet ?? presentationTextScale ?? 1,
    "--presentation-image-position-x": presentationImagePositionX ?? "70%",
    "--presentation-image-position-y": presentationImagePositionY ?? "50%",
    "--presentation-image-position-x-tablet":
      presentationImagePositionXTablet ?? presentationImagePositionX ?? "70%",
    "--presentation-image-position-y-tablet":
      presentationImagePositionYTablet ?? presentationImagePositionY ?? "50%",
    "--presentation-image-position-x-mobile":
      presentationImagePositionXMobile ?? presentationImagePositionXTablet ?? presentationImagePositionX ?? "70%",
    "--presentation-image-position-y-mobile":
      presentationImagePositionYMobile ?? presentationImagePositionYTablet ?? presentationImagePositionY ?? "50%",
    "--presentation-image-scale": presentationImageScale ?? 1,
    "--presentation-image-scale-tablet": presentationImageScaleTablet ?? presentationImageScale ?? 1,
    "--presentation-image-scale-mobile":
      presentationImageScaleMobile ?? presentationImageScaleTablet ?? presentationImageScale ?? 1,
  } as CSSProperties;
}

export function headerInternoScrollThresholds(props: HeaderInternoProps) {
  const fromHero = props.hero;
  const menuY = props.heroMenuPositionY ?? fromHero?.heroMenuPositionY;
  const menuYTablet = props.heroMenuTabletPositionY ?? fromHero?.heroMenuTabletPositionY;
  const menuYMobile = props.heroMenuMobilePositionY ?? fromHero?.heroMenuMobilePositionY;
  const scrollThreshold = Number.parseInt(menuY ?? "", 10) || 132;
  const tabletScrollThreshold = Number.parseInt(menuYTablet ?? "", 10) || scrollThreshold;
  const mobileScrollThreshold = Number.parseInt(menuYMobile ?? "", 10) || 96;
  return { scrollThreshold, tabletScrollThreshold, mobileScrollThreshold };
}
