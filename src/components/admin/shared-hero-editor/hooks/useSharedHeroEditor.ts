"use client";

import { useCallback, useMemo, useState, useSyncExternalStore, type CSSProperties } from "react";
import type { ClassHeroVariant } from "@/lib/cms/types";
import { HERO_DEVICES } from "../constants";
import { buildHeroVariantPatch } from "../heroEditorModel";
import type { DeviceKey, SharedHeroEditorProps } from "../types";
import {
  buildHeroPreviewCssVariables,
  deviceKeys,
  heroBackgroundImage,
  heroPreviewVideoUrl,
  heroScale,
  heroText,
  heroVideoEmbedUrl,
} from "../utils";
import { useLatest } from "./useLatest";

const subscribeToHydration = () => () => {};

export function useSharedHeroEditor({
  details,
  onChange,
  titleFallback,
  subtitleFallback,
}: SharedHeroEditorProps) {
  const [device, setDevice] = useState<DeviceKey>("desktop");
  const isHydrated = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  const latestDetails = useLatest(details);

  const preset = HERO_DEVICES.find((item) => item.key === device) ?? HERO_DEVICES[2];
  const keys = useMemo(() => deviceKeys(device), [device]);

  const navColor = details.heroMenuColor || (details.heroMenuTone === "light" ? "#ffffff" : "#3f3933");
  const isImageHero = details.heroVariant === "image";
  const isPresentationHero = details.heroVariant === "presentation";
  const isTextHero = details.heroVariant === "text";

  const previewVideoUrl = heroPreviewVideoUrl(details, device);
  const previewVideoEmbedUrl = heroVideoEmbedUrl(previewVideoUrl);
  const backgroundImage = heroBackgroundImage(details, device);

  const previewVideoFrameStyle = useMemo(() => {
    const portraitEmbed = device === "phone" && Boolean(details.heroVideoUrlMobile);
    const width = previewVideoEmbedUrl
      ? Math.max(preset.width, preset.height * (portraitEmbed ? 9 / 16 : 16 / 9))
      : preset.width;
    const height = previewVideoEmbedUrl
      ? Math.max(preset.height, preset.width * (portraitEmbed ? 16 / 9 : 9 / 16))
      : preset.height;

    return {
      left: heroText(details, keys.mediaX) || "50%",
      top: heroText(details, keys.mediaY) || "50%",
      width: `${width}px`,
      height: `${height}px`,
      transform: `translate(-50%, -50%) scale(${heroScale(details, keys.mediaScale)})`,
      transformOrigin: "center center",
    } as CSSProperties;
  }, [details, device, keys.mediaScale, keys.mediaX, keys.mediaY, preset.height, preset.width, previewVideoEmbedUrl]);

  const previewBackgroundStyle = useMemo(() => ({
    background: isPresentationHero
      ? `url("${backgroundImage}") center / cover no-repeat`
      : isImageHero
        ? `linear-gradient(to bottom, rgba(58,48,37,.2), rgba(251,250,246,.94)), url("${backgroundImage}") center / cover no-repeat`
        : "#fbfaf6",
    backgroundPosition: `${heroText(details, keys.mediaX) || "50%"} ${heroText(details, keys.mediaY) || "50%"}`,
    transform: `scale(${heroScale(details, keys.mediaScale)})`,
    transformOrigin: `${heroText(details, keys.mediaX) || "50%"} ${heroText(details, keys.mediaY) || "50%"}`,
  }) as CSSProperties, [backgroundImage, details, isImageHero, isPresentationHero, keys.mediaScale, keys.mediaX, keys.mediaY]);

  const frameStyle = useMemo(() => ({
    width: `${preset.width}px`,
    height: `${preset.height}px`,
    ...buildHeroPreviewCssVariables(details, device),
    background: "#fbfaf6",
  }) as CSSProperties, [details, device, preset.height, preset.width]);

  const menuStyle = useMemo(() => ({
    top: heroText(details, keys.menuY) || "132px",
    color: navColor,
    fontSize: `${12 * (device === "desktop" ? details.heroMenuScale ?? 1 : 1)}px`,
    transform: "translateX(-50%)",
  }) as CSSProperties, [details, device, keys.menuY, navColor]);

  const logoMask = useMemo(() => ({
    backgroundColor: navColor,
    WebkitMaskImage: 'url("/img/logo-header.png")',
    maskImage: 'url("/img/logo-header.png")',
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: device === "desktop" ? "center" : "left center",
    maskPosition: device === "desktop" ? "center" : "left center",
  }) as CSSProperties, [device, navColor]);

  const setVariant = useCallback((heroVariant: ClassHeroVariant) => {
    onChange(
      buildHeroVariantPatch(
        latestDetails.current,
        heroVariant,
        titleFallback,
        subtitleFallback,
      ),
    );
  }, [latestDetails, onChange, subtitleFallback, titleFallback]);

  const updateMenuColor = useCallback((heroMenuColor: string) => {
    onChange({
      heroMenuColor,
      heroMenuTone: heroMenuColor.toLowerCase() === "#ffffff" ? "light" : "dark",
    });
  }, [onChange]);

  return {
    device,
    setDevice,
    isHydrated,
    preset,
    keys,
    navColor,
    isImageHero,
    isPresentationHero,
    isTextHero,
    previewVideoUrl,
    previewVideoEmbedUrl,
    previewVideoFrameStyle,
    previewBackgroundStyle,
    frameStyle,
    menuStyle,
    logoMask,
    setVariant,
    updateMenuColor,
  };
}
