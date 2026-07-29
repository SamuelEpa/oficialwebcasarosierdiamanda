import type { StudioTeamMemberLayout } from "./types";
import { StudioTeamMemberView } from "./components/studio-team-member/StudioTeamMemberView";
import type { RichTextTypography } from "@/lib/cms/rich-text-typography";

export function StudioProfileBlock({
  name,
  role,
  image,
  intro,
  introTypography,
  layout = "copy-left",
}: {
  name: string;
  role: string;
  image: string;
  intro: string;
  introTypography?: RichTextTypography;
  layout?: StudioTeamMemberLayout;
}) {
  return (
    <StudioTeamMemberView
      member={{
        id: "preview",
        name,
        role,
        imageSrc: image,
        bio: intro,
        bioTypography: introTypography,
        layout,
      }}
    />
  );
}
