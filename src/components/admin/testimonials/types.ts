import type { Testimonial, TestimonialStatus } from "@/lib/cms/types";

export type TestimonialFilterValue = "all" | "draft" | "published";

export type TestimonialFilter = {
  value: TestimonialFilterValue;
  label: string;
  href: string;
};

export type TestimonialsNotice = {
  type: "success" | "error";
  title: string;
  message: string;
};

export type TestimonialsConfirmAction = {
  id: string;
  action: "trash";
  title: string;
  message: string;
  confirmLabel: string;
};

export type TestimonialsStats = {
  total: number;
  published: number;
  draft: number;
};

export type TestimonialListItem = Testimonial;

export type TestimonialFormMode = "create" | "edit";

export type TestimonialFormFields = {
  name: string;
  role: string;
  text: string;
  avatarId: string;
  sortOrder: number;
  isFeatured: boolean;
};

export type TestimonialFormErrors = Partial<Record<keyof TestimonialFormFields, string>>;

export type { Testimonial, TestimonialStatus };
