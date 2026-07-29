"use client";

import { memo } from "react";
import AdminActionModal from "@/components/admin/AdminActionModal";
import { TEACHER_ADMIN_LIST_PATH } from "@/lib/admin/teacher-actions";
import type { Teacher, TeacherFormMode } from "./types";
import { TeacherFormActions } from "./components/TeacherFormActions";
import { TeacherFormFields } from "./components/TeacherFormFields";
import { TeacherFormPreview } from "./components/TeacherFormPreview";
import { useTeacherForm } from "./hooks/useTeacherForm";

export type TeacherFormViewProps = {
  mode: TeacherFormMode;
  item?: Teacher;
  basePath?: string;
};

function TeacherFormViewComponent({
  mode,
  item,
  basePath = TEACHER_ADMIN_LIST_PATH,
}: TeacherFormViewProps) {
  const form = useTeacherForm(mode, item, basePath);

  return (
    <form className="editor-form teacher-form space-y-6" onSubmit={form.handleSubmit}>
      <AdminActionModal
        open={Boolean(form.notice)}
        type={form.notice?.type}
        title={form.notice?.title ?? ""}
        message={form.notice?.message}
        confirmLabel="Entendido"
        onClose={form.closeNotice}
      />

      <div className="teacher-form__layout grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(460px,1.15fr)]">
        <TeacherFormFields
          fields={form.fields}
          errors={form.errors}
          disabled={form.isSaving}
          onFieldChange={form.updateField}
        />
        <TeacherFormPreview
          name={form.fields.name}
          specialty={form.fields.specialty}
          image_id={form.fields.image_id}
          bio={form.fields.bio}
          bio_typography={form.fields.bio_typography}
        />
      </div>

      <TeacherFormActions
        basePath={basePath}
        savingStatus={form.savingStatus}
        onSaveDraft={form.saveDraft}
        onSavePublished={form.savePublished}
      />
    </form>
  );
}

export const TeacherFormView = memo(TeacherFormViewComponent);
