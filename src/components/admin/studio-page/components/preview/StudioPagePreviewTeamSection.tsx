"use client";

import { memo, useMemo } from "react";
import { StudioTeamEditorialSection } from "@/features/studio/components/studio-team-editorial/StudioTeamEditorialSection";
import { buildStudioIntroView } from "@/features/studio/lib/buildStudioIntroView";
import { mapPublishedTeachersToTeam } from "@/features/studio/lib/mapPublishedTeachersToTeam";
import type { RichTextTypography } from "@/lib/cms/rich-text-typography";
import type { Teacher } from "@/lib/cms/types";

function StudioPagePreviewTeamSectionComponent({
  introHeading,
  introContent,
  introContentTypography,
  teachers,
}: {
  introHeading: string;
  introContent: string;
  introContentTypography?: RichTextTypography;
  teachers: Teacher[];
}) {
  const intro = useMemo(
    () =>
      buildStudioIntroView({
        introHeading,
        introContent,
        introContentTypography,
      }),
    [introContent, introContentTypography, introHeading],
  );
  const team = useMemo(() => mapPublishedTeachersToTeam(teachers), [teachers]);

  return <StudioTeamEditorialSection intro={intro} team={team} />;
}

export const StudioPagePreviewTeamSection = memo(StudioPagePreviewTeamSectionComponent);
