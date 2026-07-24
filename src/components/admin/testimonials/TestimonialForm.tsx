"use client";

import AdminActionModal from "@/components/admin/AdminActionModal";
import { TestimonialFormActions } from "./components/TestimonialFormActions";
import { TestimonialFormFields } from "./components/TestimonialFormFields";
import { TestimonialFormPreview } from "./components/TestimonialFormPreview";
import { useTestimonialForm } from "./hooks/useTestimonialForm";
import type { Testimonial, TestimonialFormMode } from "./types";

export default function TestimonialForm({
  mode,
  item,
}: {
  mode: TestimonialFormMode;
  item?: Testimonial;
}) {
  const form = useTestimonialForm(mode, item);

  return (
    <form className="editor-form preview-editor-form testimonials-form" onSubmit={form.handleSubmit}>
      <AdminActionModal
        open={Boolean(form.notice)}
        type={form.notice?.type}
        title={form.notice?.title ?? ""}
        message={form.notice?.message}
        confirmLabel="Entendido"
        onClose={form.closeNotice}
      />

      <TestimonialFormFields
        fields={form.fields}
        errors={form.errors}
        disabled={form.isSaving}
        onFieldChange={form.updateField}
      />

      <TestimonialFormPreview fields={form.fields} />

      <TestimonialFormActions
        savingStatus={form.savingStatus}
        onPublish={() => void form.save("published")}
      />
    </form>
  );
}
