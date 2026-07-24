import type { TestimonialFilter, TestimonialStatus } from "./types";

export const TESTIMONIAL_TEXT_MAX = 260;

export const TESTIMONIAL_STATUS_LABELS: Record<TestimonialStatus, string> = {
  draft: "Borrador",
  published: "Publicado",
  archived: "Archivado",
  deleted: "Eliminado",
};

export const TESTIMONIAL_ADMIN_FILTERS: readonly TestimonialFilter[] = [
  { value: "all", label: "Todos", href: "/admin/components/testimonials" },
  { value: "draft", label: "Borrador", href: "/admin/components/testimonials?status=draft" },
  { value: "published", label: "Publicado", href: "/admin/components/testimonials?status=published" },
] as const;

export const TESTIMONIALS_LIST_PATH = "/admin/components/testimonials";
export const TESTIMONIALS_NEW_PATH = "/admin/components/testimonials/new";
