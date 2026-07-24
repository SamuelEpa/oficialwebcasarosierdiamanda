import type { ClassHeroVariant, CmsHeroSettings } from "@/lib/cms/types";
import { resolvePresentationHeroContent } from "./utils";

export function heroMenuDefaultsForVariant(heroVariant: ClassHeroVariant): Pick<CmsHeroSettings, "heroMenuTone" | "heroMenuColor"> {
  if (heroVariant === "text") {
    return { heroMenuTone: "dark", heroMenuColor: "#3f3933" };
  }
  return { heroMenuTone: "light", heroMenuColor: "#ffffff" };
}

export function normalizePresentationHeroForPersist(
  details: CmsHeroSettings,
  titleFallback: string,
  subtitleFallback?: string,
): Pick<CmsHeroSettings, "heroPresentationText" | "heroPresentationSubtitle" | "heroPresentationImage"> {
  if (details.heroVariant !== "presentation") {
    return {
      heroPresentationText: details.heroPresentationText?.trim() ?? "",
      heroPresentationSubtitle: details.heroPresentationSubtitle?.trim() ?? "",
      heroPresentationImage: details.heroPresentationImage?.trim() ?? "",
    };
  }

  const heroTitle = details.heroTitle?.trim() || titleFallback;
  const heroSubtitle = details.heroSubtitle?.trim() || subtitleFallback || "";
  const normalized = resolvePresentationHeroContent({
    ...details,
    heroVariant: "presentation",
    heroTitle,
    heroSubtitle,
  });

  return {
    heroPresentationText: normalized.heroPresentationText.trim(),
    heroPresentationSubtitle: normalized.heroPresentationSubtitle.trim(),
    heroPresentationImage: details.heroPresentationImage?.trim() || details.titleImage?.trim() || "",
  };
}

/** Values shown in presentation fields without writing derived copy into parent state. */
export function presentationHeroDisplayValues(
  details: CmsHeroSettings,
  titleFallback: string,
  subtitleFallback?: string,
): Pick<CmsHeroSettings, "heroPresentationText" | "heroPresentationSubtitle" | "heroPresentationImage"> {
  const persisted = normalizePresentationHeroForPersist(details, titleFallback, subtitleFallback);

  return {
    heroPresentationText: details.heroPresentationText.trim() || persisted.heroPresentationText,
    heroPresentationSubtitle: details.heroPresentationSubtitle.trim() || persisted.heroPresentationSubtitle,
    heroPresentationImage: details.heroPresentationImage.trim() || persisted.heroPresentationImage,
  };
}

/** One-shot patch when switching to presentation variant (replaces runtime sync effect). */
export function buildPresentationHeroSyncPatch(
  details: CmsHeroSettings,
  titleFallback: string,
  subtitleFallback?: string,
): Partial<CmsHeroSettings> {
  if (details.heroVariant !== "presentation") return {};

  const persisted = normalizePresentationHeroForPersist(
    { ...details, heroVariant: "presentation" },
    titleFallback,
    subtitleFallback,
  );

  const patch: Partial<CmsHeroSettings> = {};
  if (persisted.heroPresentationText !== details.heroPresentationText) {
    patch.heroPresentationText = persisted.heroPresentationText;
  }
  if (persisted.heroPresentationSubtitle !== details.heroPresentationSubtitle) {
    patch.heroPresentationSubtitle = persisted.heroPresentationSubtitle;
  }
  if (persisted.heroPresentationImage !== details.heroPresentationImage) {
    patch.heroPresentationImage = persisted.heroPresentationImage;
  }
  return patch;
}

export function buildHeroVariantPatch(
  details: CmsHeroSettings,
  heroVariant: ClassHeroVariant,
  titleFallback: string,
  subtitleFallback?: string,
): Partial<CmsHeroSettings> {
  const patch: Partial<CmsHeroSettings> = {
    heroVariant,
    ...heroMenuDefaultsForVariant(heroVariant),
  };

  if (heroVariant === "presentation") {
    Object.assign(
      patch,
      buildPresentationHeroSyncPatch(
        { ...details, heroVariant: "presentation" },
        titleFallback,
        subtitleFallback,
      ),
    );
  }

  return patch;
}
