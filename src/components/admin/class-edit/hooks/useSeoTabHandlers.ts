"use client";

import { useCallback, useMemo } from "react";
import { SEO_MAX_DESCRIPTION_LENGTH, SEO_MAX_TITLE_LENGTH } from "../constants";
import { buildClassEditSerpPreview } from "../utils";
import type { ClassEditFormState } from "./useClassEditForm";

export function useSeoTabHandlers(form: ClassEditFormState) {
  const {
    title,
    slug,
    description,
    seoTitle,
    seoDescription,
    details,
    setSeoTitle,
    setSeoDescription,
    markDirty,
    setPickerTarget,
  } = form;

  const handleSeoTitleChange = useCallback(
    (value: string) => {
      setSeoTitle(value.slice(0, SEO_MAX_TITLE_LENGTH));
      markDirty();
    },
    [markDirty, setSeoTitle],
  );

  const handleSeoDescriptionChange = useCallback(
    (value: string) => {
      setSeoDescription(value.slice(0, SEO_MAX_DESCRIPTION_LENGTH));
      markDirty();
    },
    [markDirty, setSeoDescription],
  );

  const openSeoImagePicker = useCallback(() => setPickerTarget("seo"), [setPickerTarget]);

  const serpPreview = useMemo(
    () => buildClassEditSerpPreview({ seoTitle, seoDescription, title, slug, description }),
    [description, seoDescription, seoTitle, slug, title],
  );

  const seoTitleHelp = `Caracteres: ${seoTitle.length}/${SEO_MAX_TITLE_LENGTH}`;
  const seoDescriptionHelp = `Caracteres: ${seoDescription.length}/${SEO_MAX_DESCRIPTION_LENGTH}`;

  return useMemo(
    () => ({
      seoTitle,
      seoDescription,
      seoImage: details.seoImage,
      seoTitleHelp,
      seoDescriptionHelp,
      handleSeoTitleChange,
      handleSeoDescriptionChange,
      openSeoImagePicker,
      serpPreview,
    }),
    [
      details.seoImage,
      handleSeoDescriptionChange,
      handleSeoTitleChange,
      openSeoImagePicker,
      seoDescription,
      seoDescriptionHelp,
      seoTitle,
      seoTitleHelp,
      serpPreview,
    ],
  );
}
