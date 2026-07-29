import type { ShopItem } from "@/data/types";
import { ShopItemGallery } from "./ShopItemGallery";
import { ShopItemPurchasePanel } from "./ShopItemPurchasePanel";
import { ShopItemRelatedSection } from "./ShopItemRelatedSection";

export function ShopItemDetailSection({
  item,
  related,
}: {
  item: ShopItem;
  related: ShopItem[];
}) {
  return (
    <>
      <section className="shop-item-detail section">
        <div className="shop-item-detail__container">
          <div className="shop-item-detail__layout">
            <ShopItemGallery item={item} />
            <ShopItemPurchasePanel item={item} />
          </div>
        </div>
      </section>
      <ShopItemRelatedSection items={related} categoryLabel={item.categoryLabel} />
    </>
  );
}
