import type { Teacher, TeacherStatus } from "@/lib/cms/types";
import type { RichTextTypography } from "@/lib/cms/rich-text-typography";

export type TeacherFormMode = "create" | "edit";

export type TeacherFormFields = {
  name: string;
  specialty: string;
  instagram: string;
  image_id: string;
  bio: string;
  bio_typography: RichTextTypography;
  status: TeacherStatus;
  sort_order: number;
};

export type TeacherFormErrors = Partial<Record<keyof TeacherFormFields, string>>;

export type TeacherFormNotice = {
  type: "success" | "error" | "info";
  title: string;
  message?: string;
} | null;

export type { Teacher, TeacherStatus };
