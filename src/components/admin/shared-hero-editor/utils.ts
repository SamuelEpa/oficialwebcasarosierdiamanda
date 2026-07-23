import type { CmsHeroSettings } from "@/lib/cms/types";
import type { DeviceFieldKeys, DeviceKey } from "./types";

export function heroVideoEmbedUrl(rawUrl: string) {
  if (!rawUrl) return "";
  try {
    const url = new URL(rawUrl);
    const host = url.hostname.replace(/^www\./, "");

    if (host === "player.vimeo.com" || host === "vimeo.com") {
      const id = url.pathname.split("/").find((part) => /^\d+$/.test(part));
      return id ? `https://player.vimeo.com/video/${id}?background=1&autoplay=1&muted=1&loop=1&autopause=0&controls=0` : "";
    }

    if (host === "youtu.be" || host === "youtube.com" || host === "m.youtube.com") {
      const id = host === "youtu.be"
        ? url.pathname.split("/").filter(Boolean)[0]
        : url.searchParams.get("v") || url.pathname.split("/").filter(Boolean).pop();
      return id ? `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&playsinline=1&loop=1&playlist=${id}&modestbranding=1&rel=0` : "";
    }
  } catch {
    return "";
  }
  return "";
}

export function deviceKeys(device: DeviceKey): DeviceFieldKeys {
  if (device === "phone") {
    return {
      logoX: "heroLogoMobilePositionX",
      logoY: "heroLogoMobilePositionY",
      logoWidth: "heroLogoMobileWidth",
      menuY: "heroMenuMobilePositionY",
      titleScale: "titleImageScaleMobile",
      titlePosX: "titleImagePositionXMobile",
      titlePosY: "titleImagePositionYMobile",
      titleSecondaryScale: "titleImageSecondaryScaleMobile",
      titleSecondaryPosX: "titleImageSecondaryPositionXMobile",
      titleSecondaryPosY: "titleImageSecondaryPositionYMobile",
      heroTitleX: "heroTitlePositionXMobile",
      heroTitleY: "heroTitlePositionYMobile",
      heroTitleScale: "heroTitleScaleMobile",
      presentationTextX: "presentationTextPositionXMobile",
      presentationTextY: "presentationTextPositionYMobile",
      presentationTextScale: "presentationTextScaleMobile",
      presentationImageX: "presentationImagePositionXMobile",
      presentationImageY: "presentationImagePositionYMobile",
      presentationImageScale: "presentationImageScaleMobile",
    };
  }

  if (device === "tablet") {
    return {
      logoX: "heroLogoTabletPositionX",
      logoY: "heroLogoTabletPositionY",
      logoWidth: "heroLogoTabletWidth",
      menuY: "heroMenuTabletPositionY",
      titleScale: "titleImageScaleTablet",
      titlePosX: "titleImagePositionXTablet",
      titlePosY: "titleImagePositionYTablet",
      titleSecondaryScale: "titleImageSecondaryScaleTablet",
      titleSecondaryPosX: "titleImageSecondaryPositionXTablet",
      titleSecondaryPosY: "titleImageSecondaryPositionYTablet",
      heroTitleX: "heroTitlePositionXTablet",
      heroTitleY: "heroTitlePositionYTablet",
      heroTitleScale: "heroTitleScaleTablet",
      presentationTextX: "presentationTextPositionXTablet",
      presentationTextY: "presentationTextPositionYTablet",
      presentationTextScale: "presentationTextScaleTablet",
      presentationImageX: "presentationImagePositionXTablet",
      presentationImageY: "presentationImagePositionYTablet",
      presentationImageScale: "presentationImageScaleTablet",
    };
  }

  return {
    logoX: "heroLogoPositionX",
    logoY: "heroLogoPositionY",
    logoWidth: "heroLogoWidth",
    menuY: "heroMenuPositionY",
    titleScale: "titleImageScale",
    titlePosX: "titleImagePositionX",
    titlePosY: "titleImagePositionY",
    titleSecondaryScale: "titleImageSecondaryScale",
    titleSecondaryPosX: "titleImageSecondaryPositionX",
    titleSecondaryPosY: "titleImageSecondaryPositionY",
    heroTitleX: "heroTitlePositionX",
    heroTitleY: "heroTitlePositionY",
    heroTitleScale: "heroTitleScale",
    presentationTextX: "presentationTextPositionX",
    presentationTextY: "presentationTextPositionY",
    presentationTextScale: "presentationTextScale",
    presentationImageX: "presentationImagePositionX",
    presentationImageY: "presentationImagePositionY",
    presentationImageScale: "presentationImageScale",
  };
}

export function heroText(details: CmsHeroSettings, key: keyof CmsHeroSettings) {
  const value = details[key];
  return typeof value === "string" ? value : "";
}

export function heroScale(details: CmsHeroSettings, key: keyof CmsHeroSettings) {
  const value = details[key];
  return typeof value === "number" && Number.isFinite(value) ? value : 1;
}

export function heroBackgroundImage(details: CmsHeroSettings, device: DeviceKey) {
  return device === "phone" && details.heroImageMobile ? details.heroImageMobile : details.heroImage;
}

export function heroPreviewVideoUrl(details: CmsHeroSettings, device: DeviceKey) {
  if (details.heroVariant !== "image") return "";
  return device === "phone" && details.heroVideoUrlMobile ? details.heroVideoUrlMobile : details.heroVideoUrl;
}

export function patchDeviceField(
  key: keyof CmsHeroSettings,
  value: string | number,
): Partial<CmsHeroSettings> {
  return { [key]: value } as Partial<CmsHeroSettings>;
}
