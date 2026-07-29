import type { Teacher } from "@/lib/cms/types";
import { isTeacher } from "@/lib/admin/teacher-actions";

export function listVisibleTeachers(teachers: Teacher[]) {
  return teachers
    .filter((teacher) => teacher.status !== "deleted" && !teacher.deleted_at)
    .sort((a, b) => a.sort_order - b.sort_order || a.name.localeCompare(b.name));
}

export function listPublishedTeachers(teachers: Teacher[]) {
  return teachers.filter((teacher) => teacher.status === "published");
}

export function sortAdminVisibleTeachers(teachers: Teacher[]) {
  return listVisibleTeachers(teachers);
}

export function upsertLocalTeacher(teachers: Teacher[], teacher: Teacher) {
  const without = teachers.filter((item) => item.id !== teacher.id);
  if (teacher.status === "deleted" || teacher.deleted_at) {
    return sortAdminVisibleTeachers(without);
  }
  return sortAdminVisibleTeachers([teacher, ...without]);
}

export function applyTeacherActionResult(
  teachers: Teacher[],
  id: string,
  resultTeacher: unknown,
  fallbackPatch?: Partial<Teacher>,
) {
  if (isTeacher(resultTeacher)) {
    return upsertLocalTeacher(teachers, resultTeacher);
  }
  if (!fallbackPatch) return teachers;
  return sortAdminVisibleTeachers(
    teachers.map((item) =>
      item.id === id ? { ...item, ...fallbackPatch, updated_at: new Date().toISOString() } : item,
    ),
  );
}

export function paginateTeachers(teachers: Teacher[], page: number, pageSize: number) {
  const total = teachers.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize) || 1);
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * pageSize;
  return {
    page: safePage,
    totalPages,
    total,
    items: teachers.slice(start, start + pageSize),
  };
}
