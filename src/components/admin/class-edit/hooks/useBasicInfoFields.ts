"use client";

import { useCallback } from "react";
import type { ClassEditFormState } from "./useClassEditForm";

/** Handlers for offering identity + page copy fields (BasicInfoSection). */
export function useBasicInfoFields(form: ClassEditFormState) {
  const {
    title,
    slug,
    setSlug,
    setTitle,
    setSubtitle,
    setDescription,
    markDirty,
    slugify,
    updateDetails,
  } = form;

  const handleSlugBlur = useCallback(() => {
    if (!slug.trim()) setSlug(slugify(title));
  }, [slug, setSlug, slugify, title]);

  const handleTitleChange = useCallback((value: string) => {
    setTitle(value);
    markDirty();
  }, [markDirty, setTitle]);

  const handleSlugChange = useCallback((value: string) => {
    setSlug(slugify(value));
    markDirty();
  }, [markDirty, setSlug, slugify]);

  const handleSubtitleChange = useCallback((value: string) => {
    setSubtitle(value);
    markDirty();
  }, [markDirty, setSubtitle]);

  const handleDescriptionChange = useCallback((value: string) => {
    setDescription(value);
    markDirty();
  }, [markDirty, setDescription]);

  const updateMenuTitle = useCallback((menuTitle: string) => {
    updateDetails({ menuTitle });
  }, [updateDetails]);

  return {
    handleSlugBlur,
    handleTitleChange,
    handleSlugChange,
    handleSubtitleChange,
    handleDescriptionChange,
    updateMenuTitle,
    updateDetails,
  };
}
