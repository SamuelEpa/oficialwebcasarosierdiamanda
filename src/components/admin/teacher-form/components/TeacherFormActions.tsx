"use client";

import { memo } from "react";
import Link from "@/components/admin/AdminLink";
import Button from "@/components/ui/Button";
import type { TeacherStatus } from "../types";

type TeacherFormActionsProps = {
  basePath: string;
  savingStatus: TeacherStatus | null;
  onSaveDraft: () => void;
  onSavePublished: () => void;
};

function TeacherFormActionsComponent({
  basePath,
  savingStatus,
  onSaveDraft,
  onSavePublished,
}: TeacherFormActionsProps) {
  const isSaving = savingStatus !== null;

  return (
    <div className="form-actions flex flex-wrap items-center gap-2">
      <Link className="secondary-btn" href={basePath}>
        Cancelar
      </Link>
      <Button
        type="button"
        variant="ghost"
        className="secondary-btn !h-10"
        disabled={isSaving}
        onClick={onSaveDraft}
      >
        {savingStatus === "draft" ? "Guardando…" : "Borrador"}
      </Button>
      <Button
        type="button"
        variant="solid"
        className="primary-btn !h-10"
        disabled={isSaving}
        onClick={onSavePublished}
      >
        {savingStatus === "published" ? "Publicando…" : "Publicar"}
      </Button>
    </div>
  );
}

export const TeacherFormActions = memo(TeacherFormActionsComponent);
