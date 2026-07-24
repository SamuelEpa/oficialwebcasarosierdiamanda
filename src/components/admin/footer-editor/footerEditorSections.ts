export type FooterEditorSectionKey = "general" | "form" | "contact" | "appearance" | "social";

export type FooterEditorSectionTab = {
  key: FooterEditorSectionKey;
  label: string;
  description: string;
};

export const FOOTER_EDITOR_SECTION_HASH: Partial<Record<FooterEditorSectionKey, string>> = {
  form: "formulario-contacto",
};

export function footerEditorTabs(options: {
  singleton: boolean;
  hasContactForm: boolean;
}): FooterEditorSectionTab[] {
  const tabs: FooterEditorSectionTab[] = [];

  if (!options.singleton) {
    tabs.push({
      key: "general",
      label: "General",
      description: "Nombre y metadatos del componente footer.",
    });
  }

  if (options.hasContactForm) {
    tabs.push({
      key: "form",
      label: "Formulario",
      description: "Campos visibles del formulario en la columna izquierda del footer.",
    });
  }

  tabs.push(
    {
      key: "contact",
      label: "Información",
      description: "Título, textos y mapa del bloque derecho del footer (vista previa).",
    },
    {
      key: "appearance",
      label: "Colores",
      description: "Botones del formulario y redes sociales.",
    },
    {
      key: "social",
      label: "Redes",
      description: "Enlaces e iconos de redes sociales.",
    },
  );

  return tabs;
}

export function defaultFooterEditorSection(options: {
  singleton: boolean;
  hasContactForm: boolean;
}): FooterEditorSectionKey {
  if (!options.singleton) return "general";
  return options.hasContactForm ? "form" : "contact";
}

export function footerEditorSectionFromHash(
  hash: string,
  options: { hasContactForm: boolean },
): FooterEditorSectionKey | null {
  const normalized = hash.replace(/^#/, "").trim();
  if (!normalized) return null;
  if (normalized === FOOTER_EDITOR_SECTION_HASH.form && options.hasContactForm) return "form";
  return null;
}
