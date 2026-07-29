import { MarkdownContent } from "@/components/ui/MarkdownContent";
import type { CSSProperties } from "react";
import type { StudioTeamMemberModel } from "../../types";

type StudioTeamMemberCopyProps = Pick<
  StudioTeamMemberModel,
  "name" | "role" | "bio"
> & {
  bioStyle: CSSProperties;
};

export function StudioTeamMemberCopy({
  name,
  role,
  bio,
  bioStyle,
}: StudioTeamMemberCopyProps) {
  return (
    <div className="studio-team-member__copy">
      <h2 className="studio-team-member__name">{name}</h2>
      {role.trim() ? <p className="studio-team-member__role">{role}</p> : null}
      {bio.trim() ? (
        <MarkdownContent
          source={bio}
          className="studio-team-member__bio"
          style={bioStyle}
        />
      ) : null}
    </div>
  );
}
