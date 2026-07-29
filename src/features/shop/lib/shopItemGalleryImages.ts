import type { ShopItem } from "@/data/types";

export function shopItemGalleryImages(item: ShopItem): string[] {
  const candidates = item.gallery.length ? item.gallery : [item.image];
  const seen = new Set<string>();
  return candidates.filter((src) => {
    const key = src.trim();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
