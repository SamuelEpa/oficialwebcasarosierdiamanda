export type StudioPageEditorTabKey = "hero" | "specialists" | "content" | "additions" | "preview";

export const STUDIO_PAGE_EDITOR_TABS: Array<{ key: StudioPageEditorTabKey; label: string }> = [
  { key: "hero", label: "Hero" },
  { key: "specialists", label: "Especialistas" },
  { key: "content", label: "Texto libre" },
  { key: "additions", label: "Adiciones" },
  { key: "preview", label: "Vista previa" },
];

export { STUDIO_PAGE_SAVE_ENDPOINT } from "@/lib/admin/studio-page-actions";

export const STUDIO_HERO_TITLE_FALLBACK = "El Estudio";
export const STUDIO_HERO_SUBTITLE_FALLBACK = "Casa Rosier";
export const STUDIO_SPECIALISTS_BASE_PATH = "/admin/estudio";
export const STUDIO_SPECIALISTS_PAGE_SIZE = 5;
