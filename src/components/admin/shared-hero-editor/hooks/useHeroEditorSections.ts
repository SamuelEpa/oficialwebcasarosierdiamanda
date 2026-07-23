"use client";

import { useCallback, useMemo, useState } from "react";
import { HERO_EDITOR_SECTIONS } from "../constants";
import type { HeroEditorSectionKey } from "../types";

export function useHeroEditorSections() {
  const [activeSection, setActiveSection] = useState<HeroEditorSectionKey>("variant");

  const sectionIndex = useMemo(
    () => HERO_EDITOR_SECTIONS.findIndex((section) => section.key === activeSection),
    [activeSection],
  );

  const goToPrevious = useCallback(() => {
    const previous = HERO_EDITOR_SECTIONS[sectionIndex - 1];
    if (previous) setActiveSection(previous.key);
  }, [sectionIndex]);

  const goToNext = useCallback(() => {
    const next = HERO_EDITOR_SECTIONS[sectionIndex + 1];
    if (next) setActiveSection(next.key);
  }, [sectionIndex]);

  return {
    activeSection,
    setActiveSection,
    sectionIndex,
    hasPrevious: sectionIndex > 0,
    hasNext: sectionIndex < HERO_EDITOR_SECTIONS.length - 1,
    goToPrevious,
    goToNext,
  };
}
