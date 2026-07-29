import { getPublicShopData } from "@/lib/cms/shop-public";
import { pickRelatedShopItems } from "./lib/pickRelatedShopItems";

export async function loadShopItemPage(slug: string) {
  const { published } = await getPublicShopData();
  const item = published.find((entry) => entry.slug === slug) ?? null;
  if (!item) return null;

  return {
    item,
    related: pickRelatedShopItems(published, item, 3),
  };
}
