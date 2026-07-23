"use client";

import { useCallback } from "react";
import type { Offering } from "@/lib/cms/types";
import { defaultConsultLabel, defaultCtaHref, defaultEnrollLabel } from "../utils";
import type { ClassEditFormState } from "./useClassEditForm";

export function useBasicTabFields(form: ClassEditFormState, offering: Offering) {
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

  return {
    consultLabelPlaceholder: defaultConsultLabel(offering.type),
    enrollLabelPlaceholder: defaultEnrollLabel(offering.type),
    ctaHrefPlaceholder: defaultCtaHref(form.details),
    handleSlugBlur,
    handleTitleChange,
    handleSlugChange,
    handleSubtitleChange,
    handleDescriptionChange,
    updateDetails,
  };
}
