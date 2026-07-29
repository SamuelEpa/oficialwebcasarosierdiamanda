export const SHOP_FAVORITES_STORAGE_KEY = "casarosier_shop_favorites_v1";

export function readShopFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed: unknown = JSON.parse(
      window.localStorage.getItem(SHOP_FAVORITES_STORAGE_KEY) ?? "[]",
    );
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : [];
  } catch {
    return [];
  }
}

export function writeShopFavorites(productIds: string[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SHOP_FAVORITES_STORAGE_KEY, JSON.stringify(productIds));
    window.dispatchEvent(new CustomEvent("casarosier:shop-favorites"));
  } catch {
    // ignore
  }
}

export function toggleShopFavorite(productId: string): boolean {
  const current = new Set(readShopFavorites());
  if (current.has(productId)) {
    current.delete(productId);
    writeShopFavorites([...current]);
    return false;
  }
  current.add(productId);
  writeShopFavorites([...current]);
  return true;
}

export function isShopFavorite(productId: string): boolean {
  return readShopFavorites().includes(productId);
}
