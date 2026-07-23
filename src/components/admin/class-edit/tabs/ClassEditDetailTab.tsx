"use client";

import ClassContentTab from "@/components/admin/ClassContentTab";
import { CalendarLabelsSection } from "../components/CalendarLabelsSection";
import { DetailMediaSection } from "../components/DetailMediaSection";
import { GalleryImagesSection } from "../components/GalleryImagesSection";
import type { ClassEditFormState } from "../hooks/useClassEditForm";

export function ClassEditDetailTab({ form }: { form: ClassEditFormState }) {
  const { details, updateDetails, markDirty } = form;

  return (
    <>
      <CalendarLabelsSection form={form} />
      <DetailMediaSection form={form} />
      <GalleryImagesSection form={form} />
      <ClassContentTab
        content={details.content}
        onChange={(content) => updateDetails({ content })}
        onDirty={markDirty}
      />
    </>
  );
}
