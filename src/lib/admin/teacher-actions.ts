import type { Teacher } from "@/lib/cms/types";

export const TEACHER_ADMIN_LIST_PATH = "/admin/components/teachers";
export const TEACHER_CREATE_PATH = "/admin/components/teachers/new";
export const TEACHER_EDIT_PATH = (id: string, basePath = TEACHER_ADMIN_LIST_PATH) => `${basePath}/${id}/edit`;
export const TEACHERS_ENDPOINT = "/api/admin/components/teachers";
export const TEACHER_ENDPOINT = (id: string) => `${TEACHERS_ENDPOINT}/${id}`;
export const TEACHER_MEDIA_FOLDER = "estudio" as const;

export type TeacherPatchAction = "duplicate" | "trash" | "publish" | "draft" | "archive";

export type TeacherActionResult =
  | { ok: true; teacher?: Teacher }
  | { ok: false; error: string };

export type TeacherSavePayload = {
  name: string;
  bio: string;
  bio_typography: Teacher["bio_typography"];
  image_id: string;
  instagram: string;
  specialty: string;
  status: Teacher["status"];
  sort_order: number;
};

export function teacherIsEnabled(teacher: Pick<Teacher, "status">) {
  return teacher.status === "published";
}

export function teacherEnableSuccessMessage(enabled: boolean) {
  return enabled
    ? "El especialista está activo y visible en El Estudio."
    : "El especialista quedó inactivo (borrador, fuera del sitio).";
}

export function teacherActionSuccessMessage(action: TeacherPatchAction) {
  if (action === "duplicate") return "Duplicado exitosamente.";
  if (action === "publish") return "Publicado exitosamente.";
  if (action === "draft") return "Borrador guardado correctamente.";
  if (action === "archive") return "Archivado exitosamente.";
  if (action === "trash") return "Movido a papelera exitosamente.";
  return "Acción completada correctamente.";
}

export const TEACHER_STATUS_LABELS: Record<Teacher["status"], string> = {
  draft: "Borrador",
  published: "Publicado",
  archived: "Archivado",
  deleted: "Eliminado",
};

async function parseTeacherResponse(response: Response): Promise<TeacherActionResult> {
  const data = (await response.json().catch(() => ({}))) as {
    teacher?: Teacher;
    error?: string;
  };

  if (!response.ok) {
    return { ok: false, error: data.error || "No se pudo completar la acción." };
  }

  return { ok: true, teacher: data.teacher };
}

export async function saveTeacherAction(
  mode: "create" | "edit",
  teacherId: string | undefined,
  payload: TeacherSavePayload,
): Promise<TeacherActionResult> {
  try {
    const response = await fetch(
      mode === "create" ? TEACHERS_ENDPOINT : TEACHER_ENDPOINT(teacherId!),
      {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify(payload),
      },
    );
    return await parseTeacherResponse(response);
  } catch {
    return { ok: false, error: "Revisa la conexión y vuelve a intentarlo." };
  }
}

export async function patchTeacherAction(
  id: string,
  action: TeacherPatchAction,
): Promise<TeacherActionResult> {
  try {
    const response = await fetch(TEACHER_ENDPOINT(id), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    return await parseTeacherResponse(response);
  } catch {
    return { ok: false, error: "Revisa la conexión y vuelve a intentarlo." };
  }
}

export async function setTeacherEnabledAction(
  id: string,
  enabled: boolean,
): Promise<TeacherActionResult> {
  try {
    const response = await fetch(TEACHER_ENDPOINT(id), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "set_enabled", enabled }),
    });
    return await parseTeacherResponse(response);
  } catch {
    return { ok: false, error: "Revisa la conexión y vuelve a intentarlo." };
  }
}

export function isTeacher(value: unknown): value is Teacher {
  return Boolean(value && typeof value === "object" && "id" in value && "status" in value && "name" in value);
}
