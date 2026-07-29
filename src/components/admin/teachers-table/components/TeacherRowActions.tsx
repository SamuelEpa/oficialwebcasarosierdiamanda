"use client";

import Link from "@/components/admin/AdminLink";
import { TEACHER_EDIT_PATH, type TeacherPatchAction } from "@/lib/admin/teacher-actions";
import type { Teacher } from "@/lib/cms/types";

type TeacherRowActionsProps = {
  teacher: Teacher;
  basePath: string;
  rowPending: boolean;
  showDuplicate: boolean;
  showArchive: boolean;
  isPending: (id: string, action?: string) => boolean;
  onEditNotice: () => void;
  onAction: (action: TeacherPatchAction) => void;
  onTrash: () => void;
};

export function TeacherRowActions({
  teacher,
  basePath,
  rowPending,
  showDuplicate,
  showArchive,
  isPending,
  onEditNotice,
  onAction,
  onTrash,
}: TeacherRowActionsProps) {
  return (
    <div className="offerings-category-row-actions">
      <Link
        href={TEACHER_EDIT_PATH(teacher.id, basePath)}
        className="offerings-category-row-actions__btn"
        title="Editar"
        aria-disabled={rowPending}
        onClick={onEditNotice}
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          edit
        </span>
        <span className="offerings-category-row-actions__label">
          {isPending(teacher.id, "edit") ? "…" : "Editar"}
        </span>
      </Link>

      {showDuplicate ? (
        <button
          type="button"
          disabled={rowPending}
          onClick={() => onAction("duplicate")}
          className="offerings-category-row-actions__btn"
          title="Duplicar"
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            content_copy
          </span>
          <span className="offerings-category-row-actions__label">
            {isPending(teacher.id, "duplicate") ? "…" : "Duplicar"}
          </span>
        </button>
      ) : null}

      {showArchive && teacher.status !== "archived" ? (
        <button
          type="button"
          disabled={rowPending}
          onClick={() => onAction("archive")}
          className="offerings-category-row-actions__btn"
          title="Archivar"
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            inventory_2
          </span>
          <span className="offerings-category-row-actions__label">
            {isPending(teacher.id, "archive") ? "…" : "Archivar"}
          </span>
        </button>
      ) : null}

      <button
        type="button"
        disabled={rowPending}
        onClick={onTrash}
        className="offerings-category-row-actions__btn offerings-category-row-actions__btn--danger"
        title="Eliminar"
        aria-haspopup="dialog"
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          delete
        </span>
        <span className="offerings-category-row-actions__label">
          {isPending(teacher.id, "trash") ? "…" : "Eliminar"}
        </span>
      </button>
    </div>
  );
}
