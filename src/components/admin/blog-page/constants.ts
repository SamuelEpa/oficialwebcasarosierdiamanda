export type BlogPageEditorTabKey = "hero" | "posts" | "additions" | "preview";

export const BLOG_PAGE_EDITOR_TABS: Array<{ key: BlogPageEditorTabKey; label: string }> = [
  { key: "hero", label: "Hero" },
  { key: "posts", label: "Bitácoras" },
  { key: "additions", label: "Adiciones" },
  { key: "preview", label: "Vista previa" },
];

export { BLOG_PAGE_SAVE_ENDPOINT } from "@/lib/admin/blog-page-actions";

export const BLOG_HERO_TITLE_FALLBACK = "Bitacora ceramica";
export const BLOG_HERO_SUBTITLE_FALLBACK = "Casa Rosier";
