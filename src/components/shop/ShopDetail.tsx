import type { ShopItem } from "@/data/types";
import { ShopItemDetailSection } from "@/features/shop/components/item-detail/ShopItemDetailSection";

/** @deprecated Prefer ShopItemDetailSection from features/shop */
export function ShopDetail({
  item,
  related = [],
}: {
  item: ShopItem;
  related?: ShopItem[];
}) {
  return <ShopItemDetailSection item={item} related={related} />;
}
