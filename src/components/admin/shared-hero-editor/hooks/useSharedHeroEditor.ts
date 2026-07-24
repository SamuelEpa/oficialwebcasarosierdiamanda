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
  heroPreviewLayoutRevision,
  heroPreviewVideoUrl,
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
  const layoutRevision = heroPreviewLayoutRevision(details, device);

  const frameStyle = useMemo(() => ({
    width: `${preset.width}px`,
    height: `${preset.height}px`,
    ...buildHeroPreviewCssVariables(details, device),
    background: isPresentationHero
      ? `url("${backgroundImage}") center / cover no-repeat`
      : isImageHero
        ? `linear-gradient(to bottom, rgba(58,48,37,.2), rgba(251,250,246,.94)), url("${backgroundImage}") center / cover no-repeat`
        : "#fbfaf6",
  }) as CSSProperties, [backgroundImage, device, isImageHero, isPresentationHero, layoutRevision, preset.height, preset.width]);

  const menuStyle = useMemo(() => ({
    top: heroText(details, keys.menuY) || "132px",
    color: navColor,
    transform: `translateX(-50%) scale(${device === "desktop" ? details.heroMenuScale ?? 1 : 1})`,
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
  }, [onChange, subtitleFallback, titleFallback]);

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
    frameStyle,
    menuStyle,
    logoMask,
    setVariant,
    updateMenuColor,
  };
}
