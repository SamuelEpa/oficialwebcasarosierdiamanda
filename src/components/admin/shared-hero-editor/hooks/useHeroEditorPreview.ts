"use client";

import { useMemo } from "react";
import type { SharedHeroEditorProps } from "../types";
import { buildHeroPreviewHero, heroPreviewContentRevision } from "../utils";

/** Derived hero for preview/public components — no parent state updates. */
export function useHeroEditorPreview({
  details,
  titleFallback,
  subtitleFallback,
}: Pick<SharedHeroEditorProps, "details" | "titleFallback" | "subtitleFallback">) {
  const revision = heroPreviewContentRevision(details, titleFallback, subtitleFallback);

  return useMemo(
    () => buildHeroPreviewHero(details, titleFallback, subtitleFallback),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- revision captures preview-relevant fields
    [revision],
  );
}
