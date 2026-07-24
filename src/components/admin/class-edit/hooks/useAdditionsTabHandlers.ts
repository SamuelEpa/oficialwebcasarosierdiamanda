"use client";

import { useCallback, useMemo } from "react";
import type { ClassEditFormState } from "./useClassEditForm";

export function useAdditionsTabHandlers(form: ClassEditFormState) {
  const { details, updateDetails } = form;

  const showIdeaPromptSection = details.showIdeaPromptSection;

  const setShowIdeaPromptSection = useCallback(
    (checked: boolean) => updateDetails({ showIdeaPromptSection: checked }),
    [updateDetails],
  );

  return useMemo(
    () => ({
      showIdeaPromptSection,
      setShowIdeaPromptSection,
    }),
    [setShowIdeaPromptSection, showIdeaPromptSection],
  );
}
