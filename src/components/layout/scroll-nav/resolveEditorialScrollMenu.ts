export const EDITORIAL_SCROLL_MENU_FALLBACK = {
  background: "#f9f8f3",
  text: "#3f3933",
  icon: "#3f3933",
  logoTint: "#3f3933",
} as const;

/** Map legacy sticky colors to the cream editorial sticky bar. */
export function resolveEditorialScrollColor(
  value: string | undefined,
  fallback: string,
) {
  const trimmed = value?.trim() ?? "";
  if (!trimmed) return fallback;
  const normalized = trimmed.toLowerCase();
  if (normalized === "#8c7457" || normalized === "#ffffff" || normalized === "#fff") {
    return fallback;
  }
  return trimmed;
}

export function resolveEditorialScrollMenu(menu: {
  scroll_menu_background_color?: string;
  scroll_menu_text_color?: string;
  scroll_menu_icon_color?: string;
  scroll_menu_logo_tint_enabled?: boolean;
  scroll_menu_logo_tint_color?: string;
  header_logo_url?: string;
}) {
  return {
    headerLogoUrl: menu.header_logo_url || "/img/logo-header.png",
    scrollMenuBackgroundColor: resolveEditorialScrollColor(
      menu.scroll_menu_background_color,
      EDITORIAL_SCROLL_MENU_FALLBACK.background,
    ),
    scrollMenuTextColor: resolveEditorialScrollColor(
      menu.scroll_menu_text_color,
      EDITORIAL_SCROLL_MENU_FALLBACK.text,
    ),
    scrollMenuIconColor: resolveEditorialScrollColor(
      menu.scroll_menu_icon_color,
      EDITORIAL_SCROLL_MENU_FALLBACK.icon,
    ),
    scrollMenuLogoTintEnabled: Boolean(menu.scroll_menu_logo_tint_enabled),
    scrollMenuLogoTintColor: resolveEditorialScrollColor(
      menu.scroll_menu_logo_tint_color,
      EDITORIAL_SCROLL_MENU_FALLBACK.logoTint,
    ),
  };
}
