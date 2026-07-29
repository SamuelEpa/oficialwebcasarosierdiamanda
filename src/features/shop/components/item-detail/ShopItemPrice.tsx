import type { ShopItem } from "@/data/types";

export function ShopItemPrice({ item }: { item: ShopItem }) {
  return (
    <p className="shop-item-purchase__price">
      {item.compareAtPrice ? (
        <>
          <span className="shop-item-purchase__price-compare">{item.compareAtPrice}</span>
          <span className="shop-item-purchase__price-current">{item.price}</span>
        </>
      ) : (
        <span className="shop-item-purchase__price-current">{item.price}</span>
      )}
    </p>
  );
}
