import { assetPath } from "@/lib/assets";
import type { Teacher } from "@/lib/cms/types";
import type { StudioTeamMemberLayout, StudioTeamMemberModel } from "../types";

export function teamMemberLayoutForIndex(index: number): StudioTeamMemberLayout {
  return index % 2 === 0 ? "copy-left" : "copy-right";
}

export function mapTeacherToStudioTeamMember(
  teacher: Teacher,
  index: number,
): StudioTeamMemberModel {
  return {
    id: teacher.id,
    name: teacher.name,
    role: teacher.specialty,
    imageSrc: assetPath(teacher.image_id || "/img/social-1.jpg"),
    bio: teacher.bio,
    bioTypography: teacher.bio_typography,
    layout: teamMemberLayoutForIndex(index),
  };
}

export function mapPublishedTeachersToTeam(teachers: Teacher[]): StudioTeamMemberModel[] {
  return teachers.map(mapTeacherToStudioTeamMember);
}
