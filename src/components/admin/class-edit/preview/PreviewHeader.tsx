"use client";

import type { CSSProperties } from "react";
import { PublicHeroContent } from "@/components/hero/PublicHeroContent";
import { NavbarGlobal } from "@/components/layout/NavbarGlobal";
import { assetPath } from "@/lib/assets";
import type { ClassEditorPreviewChrome } from "@/lib/cms/class-editor-preview";
import type { ClassOfferingDetails } from "@/lib/cms/types";
import type { ExperienceItem } from "@/data/types";
import type { PreviewDevice } from "../types";

export function PreviewHeader({
  item,
  details,
  previewChrome,
  previewDevice,
}: {
  item: ExperienceItem;
  details: ClassOfferingDetails;
  previewChrome: ClassEditorPreviewChrome;
  previewDevice: PreviewDevice;
}) {
  const variant = item.heroVariant ?? "text";
  const isPhonePreview = previewDevice === "phone";
  const isTabletPreview = previewDevice === "tablet";
  const responsiveValue = <T,>(desktop: T, tablet: T, phone: T) => isPhonePreview ? phone : isTabletPreview ? tablet : desktop;
  const isImageLike = variant === "image" || variant === "presentation";
  const style = {
    "--page-hero-image": `url("${assetPath(isPhonePreview && item.heroImageMobile ? item.heroImageMobile : item.heroImage)}")`,
    "--page-hero-image-mobile": `url("${assetPath(item.heroImageMobile || item.heroImage)}")`,
    "--hero-logo-position-x": responsiveValue(item.heroLogoPositionX ?? "50%", item.heroLogoTabletPositionX ?? item.heroLogoPositionX ?? "50%", item.heroLogoMobilePositionX ?? item.heroLogoPositionX ?? "50%"),
    "--hero-logo-position-y": responsiveValue(item.heroLogoPositionY ?? "46px", item.heroLogoTabletPositionY ?? item.heroLogoPositionY ?? "42px", item.heroLogoMobilePositionY ?? "34px"),
    "--hero-logo-width": responsiveValue(item.heroLogoWidth ?? "118px", item.heroLogoTabletWidth ?? item.heroLogoWidth ?? "106px", item.heroLogoMobileWidth ?? "92px"),
    "--hero-logo-tablet-position-x": item.heroLogoTabletPositionX ?? item.heroLogoPositionX ?? "50%",
    "--hero-logo-tablet-position-y": item.heroLogoTabletPositionY ?? item.heroLogoPositionY ?? "42px",
    "--hero-logo-tablet-width": item.heroLogoTabletWidth ?? item.heroLogoWidth ?? "106px",
    "--hero-logo-mobile-position-x": item.heroLogoMobilePositionX ?? item.heroLogoPositionX ?? "50%",
    "--hero-logo-mobile-position-y": item.heroLogoMobilePositionY ?? "34px",
    "--hero-logo-mobile-width": item.heroLogoMobileWidth ?? "92px",
    "--hero-menu-position-y": item.heroMenuPositionY ?? "132px",
    "--hero-menu-tablet-position-y": item.heroMenuTabletPositionY ?? item.heroMenuPositionY ?? "118px",
    "--hero-menu-mobile-position-y": item.heroMenuMobilePositionY ?? "96px",
    "--hero-menu-color": item.heroMenuColor ?? (item.heroMenuTone === "light" ? "#ffffff" : "#3f3933"),
    "--hero-menu-scale": item.heroMenuScale ?? 1,
    "--title-image-scale": details.titleImageScale ?? 1,
    "--title-image-scale-tablet": details.titleImageScaleTablet ?? details.titleImageScale ?? 1,
    "--title-image-scale-mobile": details.titleImageScaleMobile ?? details.titleImageScale ?? 1,
    "--title-image-position-x": details.titleImagePositionX ?? "50%",
    "--title-image-position-y": details.titleImagePositionY ?? "50%",
    "--title-image-position-x-tablet": details.titleImagePositionXTablet ?? details.titleImagePositionX ?? "50%",
    "--title-image-position-y-tablet": details.titleImagePositionYTablet ?? details.titleImagePositionY ?? "50%",
    "--title-image-position-x-mobile": details.titleImagePositionXMobile ?? details.titleImagePositionX ?? "50%",
    "--title-image-position-y-mobile": details.titleImagePositionYMobile ?? "50%",
    "--title-image-secondary-scale": details.titleImageSecondaryScale ?? 1,
    "--title-image-secondary-scale-tablet": details.titleImageSecondaryScaleTablet ?? details.titleImageSecondaryScale ?? 1,
    "--title-image-secondary-scale-mobile": details.titleImageSecondaryScaleMobile ?? details.titleImageSecondaryScale ?? 1,
    "--title-image-secondary-position-x": details.titleImageSecondaryPositionX ?? "50%",
    "--title-image-secondary-position-y": details.titleImageSecondaryPositionY ?? "50%",
    "--title-image-secondary-position-x-tablet": details.titleImageSecondaryPositionXTablet ?? details.titleImageSecondaryPositionX ?? "50%",
    "--title-image-secondary-position-y-tablet": details.titleImageSecondaryPositionYTablet ?? details.titleImageSecondaryPositionY ?? "50%",
    "--title-image-secondary-position-x-mobile": details.titleImageSecondaryPositionXMobile ?? details.titleImageSecondaryPositionX ?? "50%",
    "--title-image-secondary-position-y-mobile": details.titleImageSecondaryPositionYMobile ?? "50%",
    "--hero-title-position-x": responsiveValue(details.heroTitlePositionX ?? "50%", details.heroTitlePositionXTablet ?? details.heroTitlePositionX ?? "50%", details.heroTitlePositionXMobile ?? "50%"),
    "--hero-title-position-y": responsiveValue(details.heroTitlePositionY ?? "50%", details.heroTitlePositionYTablet ?? details.heroTitlePositionY ?? "50%", details.heroTitlePositionYMobile ?? "50%"),
    "--hero-title-scale": responsiveValue(details.heroTitleScale ?? 1, details.heroTitleScaleTablet ?? details.heroTitleScale ?? 1, details.heroTitleScaleMobile ?? 1),
    "--presentation-text-position-x": details.presentationTextPositionX ?? "8%",
    "--presentation-text-position-y": details.presentationTextPositionY ?? "50%",
    "--presentation-text-position-x-tablet": details.presentationTextPositionXTablet ?? details.presentationTextPositionX ?? "8%",
    "--presentation-text-position-y-tablet": details.presentationTextPositionYTablet ?? details.presentationTextPositionY ?? "50%",
    "--presentation-text-position-x-mobile": details.presentationTextPositionXMobile ?? details.presentationTextPositionX ?? "8%",
    "--presentation-text-position-y-mobile": details.presentationTextPositionYMobile ?? "50%",
    "--presentation-text-scale": details.presentationTextScale ?? 1,
    "--presentation-text-scale-tablet": details.presentationTextScaleTablet ?? details.presentationTextScale ?? 1,
    "--presentation-text-scale-mobile": details.presentationTextScaleMobile ?? 1,
    "--presentation-image-position-x": details.presentationImagePositionX ?? "70%",
    "--presentation-image-position-y": details.presentationImagePositionY ?? "50%",
    "--presentation-image-position-x-tablet": details.presentationImagePositionXTablet ?? details.presentationImagePositionX ?? "70%",
    "--presentation-image-position-y-tablet": details.presentationImagePositionYTablet ?? details.presentationImagePositionY ?? "50%",
    "--presentation-image-position-x-mobile": details.presentationImagePositionXMobile ?? details.presentationImagePositionX ?? "70%",
    "--presentation-image-position-y-mobile": details.presentationImagePositionYMobile ?? "50%",
    "--presentation-image-scale": details.presentationImageScale ?? 1,
    "--presentation-image-scale-tablet": details.presentationImageScaleTablet ?? details.presentationImageScale ?? 1,
    "--presentation-image-scale-mobile": details.presentationImageScaleMobile ?? 1,
  } as CSSProperties;
  const scrollThreshold = Number.parseInt(item.heroMenuPositionY ?? "", 10) || 132;
  const titleContent = (
    <div>
      {item.category ? <p className="page-hero__eyebrow">{item.category}</p> : null}
      <h1 className="page-hero__title">{item.heroTitle || item.title}</h1>
    </div>
  );

  return (
    <>
      <header
        className={`header-interno page-hero header-interno--ready header-interno--center header-interno--overlay-warm ${
          isImageLike ? "header-interno--image-hero" : "header-interno--text-hero page-hero--nav-only"
        } ${variant === "presentation" ? "header-interno--presentation-hero" : ""} header-interno--menu-${item.heroMenuTone ?? (isImageLike ? "light" : "dark")} header-interno--medium`}
        style={style}
        data-header-height="medium"
        data-header-alignment="center"
        data-header-overlay="warm"
      >
        <NavbarGlobal
          navigationItems={previewChrome.navigationItems}
          logoUrl={previewChrome.menuSettings.header_logo_url}
          scrollMenuBackgroundColor={previewChrome.menuSettings.scroll_menu_background_color}
          scrollMenuTextColor={previewChrome.menuSettings.scroll_menu_text_color}
          scrollMenuIconColor={previewChrome.menuSettings.scroll_menu_icon_color}
          scrollMenuLogoTintEnabled={previewChrome.menuSettings.scroll_menu_logo_tint_enabled}
          scrollMenuLogoTintColor={previewChrome.menuSettings.scroll_menu_logo_tint_color}
          scrollThreshold={scrollThreshold}
          tabletScrollThreshold={Number.parseInt(item.heroMenuTabletPositionY ?? "", 10) || scrollThreshold}
          mobileScrollThreshold={Number.parseInt(item.heroMenuMobilePositionY ?? "", 10) || 96}
          heroMenuColor={item.heroMenuColor}
          heroMenuScale={item.heroMenuScale}
        />
        {isImageLike ? (
          <PublicHeroContent
            hero={{
              ...details,
              heroPresentationText: details.heroPresentationText || "# Chagall, Master Drawings\n\nFebruary 27-May 28, 2018",
            }}
          />
        ) : (
          <div className="header-interno__inner page-hero__inner container" aria-hidden="true" />
        )}
      </header>
      {!isImageLike ? (
        <section className="page-title-block page-title-block--center page-title-block--medium">
          <div className="page-title-block__inner container">{titleContent}</div>
        </section>
      ) : null}
    </>
  );
}
