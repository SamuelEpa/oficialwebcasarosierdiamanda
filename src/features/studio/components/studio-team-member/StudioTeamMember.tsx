import type { StudioTeamMemberModel } from "../../types";
import { StudioTeamMemberView } from "./StudioTeamMemberView";

export function StudioTeamMember({ member }: { member: StudioTeamMemberModel }) {
  return <StudioTeamMemberView member={member} />;
}
