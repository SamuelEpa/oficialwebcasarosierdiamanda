import type { TeacherSavePayload } from "@/lib/admin/teacher-actions";
import {
  DEFAULT_DESCRIPTION_TYPOGRAPHY,
  normalizeRichTextTypography,
} from "@/lib/cms/rich-text-typography";
import type { Teacher, TeacherFormErrors, TeacherFormFields } from "./types";

export function fieldsFromTeacher(item?: Teacher): TeacherFormFields {
  return {
    name: item?.name ?? "",
    specialty: item?.specialty ?? "",
    instagram: item?.instagram ?? "",
    image_id: item?.image_id ?? "",
    bio: item?.bio ?? "",
    bio_typography: normalizeRichTextTypography(
      item?.bio_typography ?? DEFAULT_DESCRIPTION_TYPOGRAPHY,
    ),
    status: item?.status === "archived" || item?.status === "published" || item?.status === "draft"
      ? item.status
      : "draft",
    sort_order: item?.sort_order ?? 0,
  };
}

export function buildTeacherPayload(
  fields: TeacherFormFields,
  nextStatus: TeacherFormFields["status"] = fields.status,
): TeacherSavePayload {
  return {
    name: fields.name.trim(),
    specialty: fields.specialty.trim(),
    instagram: fields.instagram.trim(),
    image_id: fields.image_id.trim(),
    bio: fields.bio,
    bio_typography: normalizeRichTextTypography(fields.bio_typography),
    status: nextStatus === "deleted" ? "draft" : nextStatus,
    sort_order: Number.isFinite(fields.sort_order) ? fields.sort_order : 0,
  };
}

export function validateTeacherForm(fields: TeacherFormFields): {
  errors: TeacherFormErrors;
  message: string | null;
} {
  const errors: TeacherFormErrors = {};
  if (!fields.name.trim()) {
    errors.name = "El nombre es obligatorio.";
  }

  return {
    errors,
    message: errors.name ?? null,
  };
}
