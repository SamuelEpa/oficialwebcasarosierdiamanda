import type { ClassHeroVariant } from "@/lib/cms/types";
import type { DeviceConfig, HeroEditorSectionKey } from "./types";

export const HERO_DEVICES: DeviceConfig[] = [
  { key: "phone", label: "Teléfono", width: 390, height: 520 },
  { key: "tablet", label: "Tablet", width: 760, height: 540 },
  { key: "desktop", label: "Desktop", width: 1180, height: 620 },
];

export const HERO_VARIANT_OPTIONS: Array<{
  value: ClassHeroVariant;
  label: string;
  description: string;
  icon: string;
}> = [
  { value: "image", label: "Hero con imagen", description: "Fondo con imagen y arte/título superpuesto.", icon: "image" },
  { value: "presentation", label: "Hero con presentación", description: "Fondo, texto enriquecido a la izquierda e imagen a la derecha.", icon: "view_day" },
  { value: "text", label: "Hero tipográfico", description: "Hero sobrio con título y subtítulo editables.", icon: "title" },
];

export const HERO_EDITOR_SECTIONS = [
  {
    key: "variant",
    label: "Tipo de hero",
    description: "Imagen, presentación o tipográfico",
    icon: "dashboard",
  },
  {
    key: "content",
    label: "Contenido",
    description: "Textos, medios y CTA del hero",
    icon: "edit_note",
  },
  {
    key: "position",
    label: "Posición",
    description: "Logo, menú y elementos responsive",
    icon: "tune",
  },
] as const satisfies ReadonlyArray<{
  key: HeroEditorSectionKey;
  label: string;
  description: string;
  icon: string;
}>;

export const PREVIEW_MENU_ITEMS = ["Inicio", "Clases", "Workshops", "Experiencias", "Gift Cards", "El Estudio", "Shop"];
