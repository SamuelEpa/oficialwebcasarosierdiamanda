import type { StudioTeamMemberModel } from "../../types";
import { buildStudioTeamMemberBioStyle } from "./lib/buildStudioTeamMemberBioStyle";
import { StudioTeamMemberCopy } from "./StudioTeamMemberCopy";
import { StudioTeamMemberMedia } from "./StudioTeamMemberMedia";

export function StudioTeamMemberView({
  member,
}: {
  member: StudioTeamMemberModel;
}) {
  const bioStyle = buildStudioTeamMemberBioStyle(member.bioTypography);

  return (
    <article
      className={`studio-team-member studio-team-member--${member.layout}`}
    >
      <StudioTeamMemberCopy
        name={member.name}
        role={member.role}
        bio={member.bio}
        bioStyle={bioStyle}
      />
      <StudioTeamMemberMedia name={member.name} imageSrc={member.imageSrc} />
    </article>
  );
}
