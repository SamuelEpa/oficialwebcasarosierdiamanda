"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { DETAIL_PAGE_SECTIONS } from "../constants";
import type { DetailPageSectionKey } from "../types";
import { detailSectionForError } from "../utils";
import type { ClassEditFormState } from "./useClassEditForm";

export function useDetailPageSections(form: Pick<ClassEditFormState, "errors">) {
  const [activeSection, setActiveSection] = useState<DetailPageSectionKey>("basic-info");

  const sectionIndex = useMemo(
    () => DETAIL_PAGE_SECTIONS.findIndex((section) => section.key === activeSection),
    [activeSection],
  );

  const sectionsWithErrors = useMemo(() => {
    const keys = new Set<DetailPageSectionKey>();
    for (const errorKey of Object.keys(form.errors)) {
      keys.add(detailSectionForError(errorKey));
    }
    return keys;
  }, [form.errors]);

  useEffect(() => {
    function handleFocusSection(event: Event) {
      const errorKey = (event as CustomEvent<{ errorKey: string }>).detail?.errorKey;
      if (!errorKey) return;
      setActiveSection(detailSectionForError(errorKey));
    }

    window.addEventListener("class-edit:focus-section", handleFocusSection);
    return () => window.removeEventListener("class-edit:focus-section", handleFocusSection);
  }, []);

  const goToPrevious = useCallback(() => {
    const previous = DETAIL_PAGE_SECTIONS[sectionIndex - 1];
    if (previous) setActiveSection(previous.key);
  }, [sectionIndex]);

  const goToNext = useCallback(() => {
    const next = DETAIL_PAGE_SECTIONS[sectionIndex + 1];
    if (next) setActiveSection(next.key);
  }, [sectionIndex]);

  return {
    activeSection,
    setActiveSection,
    sectionIndex,
    sectionsWithErrors,
    hasPrevious: sectionIndex > 0,
    hasNext: sectionIndex < DETAIL_PAGE_SECTIONS.length - 1,
    goToPrevious,
    goToNext,
  };
}
