"use client";

import { useCallback, useMemo } from "react";
import { includedItemsToMarkdown } from "../utils";
import type { ClassEditFormState } from "./useClassEditForm";

export function useDetailMediaHandlers(form: ClassEditFormState) {
  const {
    details,
    uploadingTarget,
    setPickerTarget,
    uploadImage,
    updateDetails,
    updateIncludedItems,
  } = form;

  const includedItemsText = useMemo(
    () => includedItemsToMarkdown(details.includedItems),
    [details.includedItems],
  );

  const setShowIncludedSection = useCallback(
    (showIncludedSection: boolean) => updateDetails({ showIncludedSection }),
    [updateDetails],
  );

  const setVideoUrl = useCallback(
    (videoUrl: string) => updateDetails({ videoUrl }),
    [updateDetails],
  );

  const clearVideoPoster = useCallback(
    () => updateDetails({ videoPoster: "" }),
    [updateDetails],
  );

  const openVideoPosterLibrary = useCallback(
    () => setPickerTarget("videoPoster"),
    [setPickerTarget],
  );

  const uploadVideoPoster = useCallback(
    (file: File) => void uploadImage("videoPoster", file),
    [uploadImage],
  );

  return useMemo(
    () => ({
      showIncludedSection: details.showIncludedSection,
      videoUrl: details.videoUrl,
      videoPoster: details.videoPoster,
      includedItemsText,
      uploadingTarget,
      setShowIncludedSection,
      setVideoUrl,
      updateIncludedItems,
      clearVideoPoster,
      openVideoPosterLibrary,
      uploadVideoPoster,
    }),
    [
      clearVideoPoster,
      details.showIncludedSection,
      details.videoPoster,
      details.videoUrl,
      includedItemsText,
      openVideoPosterLibrary,
      setShowIncludedSection,
      setVideoUrl,
      updateIncludedItems,
      uploadVideoPoster,
      uploadingTarget,
    ],
  );
}
