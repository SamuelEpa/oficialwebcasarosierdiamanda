import type { ShopItem } from "@/data/types";

export function pickRelatedShopItems(
  published: ShopItem[],
  current: ShopItem,
  limit = 3,
): ShopItem[] {
  const sameCategory = published.filter(
    (item) => item.id !== current.id && item.category === current.category,
  );
  const pool = sameCategory.length ? sameCategory : published.filter((item) => item.id !== current.id);

  return pool.slice(0, limit);
}
