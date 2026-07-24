export const BLOG_POST_CATEGORY_OPTIONS = ["Procesos", "Esmaltes", "Taller"] as const;

export type BlogFormTabKey = "hero" | "structure" | "preview";

export const BLOG_FORM_TABS: Array<{ key: BlogFormTabKey; label: string }> = [
  { key: "hero", label: "Hero" },
  { key: "structure", label: "Estructura" },
  { key: "preview", label: "Vista previa" },
];

export const BLOG_POST_MEDIA_FOLDER = "bitacora";

export const BLOG_HERO_FALLBACK_IMAGE = "/img/hero-bg.jpg";
