import type { ShopCategory, ShopItem } from "@/data/types";

export type ShopCategoryNavItem = ShopCategory & { count: number };

export function buildShopCategoryNav(
  shopCategories: ShopCategory[],
  published: ShopItem[],
): ShopCategoryNavItem[] {
  const counts = new Map<string, number>();
  for (const item of published) {
    if (!item.category) continue;
    counts.set(item.category, (counts.get(item.category) ?? 0) + 1);
  }

  return shopCategories
    .filter((category) => category.key !== "all")
    .map((category) => ({
      ...category,
      count: counts.get(category.key) ?? category.count ?? 0,
    }))
    .filter((category) => category.count > 0);
}
