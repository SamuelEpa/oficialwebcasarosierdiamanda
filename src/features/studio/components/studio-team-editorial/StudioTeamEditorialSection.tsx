import type { StudioIntroView, StudioTeamMemberModel } from "../../types";
import { StudioEditorialIntro } from "../studio-editorial-intro/StudioEditorialIntro";
import { StudioTeamMember } from "../studio-team-member/StudioTeamMember";

export function StudioTeamEditorialSection({
  intro,
  team,
}: {
  intro: StudioIntroView;
  team: StudioTeamMemberModel[];
}) {
  if (!intro.heading.trim() && !intro.body.trim() && team.length === 0) {
    return null;
  }

  return (
    <section
      className="studio-editorial-split section is-visible"
      aria-label="Equipo del estudio"
    >
      <div className="studio-editorial-split__inner">
        <div className="studio-editorial-split__rail" aria-hidden="true" />
        <StudioEditorialIntro intro={intro} />
        {team.length > 0 ? (
          <div className="studio-editorial-split__team">
            {team.map((member) => (
              <StudioTeamMember key={member.id} member={member} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
