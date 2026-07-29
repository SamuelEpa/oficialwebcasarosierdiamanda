"use client";

import { useMemo } from "react";
import type { RichTextTypography } from "@/lib/cms/rich-text-typography";
import { buildStudioTeamMemberBioStyle } from "../lib/buildStudioTeamMemberBioStyle";

export function useStudioTeamMemberBioStyle(bioTypography?: RichTextTypography) {
  return useMemo(
    () => buildStudioTeamMemberBioStyle(bioTypography),
    [bioTypography],
  );
}
