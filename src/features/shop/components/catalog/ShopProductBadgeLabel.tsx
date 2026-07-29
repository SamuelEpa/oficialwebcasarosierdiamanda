import { SHOP_BADGE_LABELS } from "@/lib/cms/shop-product-presentation";
import type { ShopProductBadge } from "@/data/types";

export function ShopProductBadgeLabel({ badge }: { badge: ShopProductBadge }) {
  return (
    <span className={`shop-product-card__badge shop-product-card__badge--${badge}`}>
      {SHOP_BADGE_LABELS[badge]}
    </span>
  );
}
