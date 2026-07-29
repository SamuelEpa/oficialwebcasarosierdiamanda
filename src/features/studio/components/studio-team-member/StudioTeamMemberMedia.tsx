import Image from "next/image";
import type { StudioTeamMemberModel } from "../../types";

export function StudioTeamMemberMedia({
  name,
  imageSrc,
}: Pick<StudioTeamMemberModel, "name" | "imageSrc">) {
  return (
    <figure className="studio-team-member__media">
      <Image
        src={imageSrc}
        alt={`${name} en el estudio de ceramica`}
        width={345}
        height={431}
        sizes="(max-width: 760px) calc(100vw - 32px), calc((min(100vw - 40px, 690px) - 28px) / 2)"
        className="studio-team-member__image"
      />
    </figure>
  );
}
