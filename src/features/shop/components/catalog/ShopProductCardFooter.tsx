import Link from "next/link";
import type { ShopItem } from "@/data/types";

export function ShopProductCardFooter({ item }: { item: ShopItem }) {
  return (
    <div className="shop-product-card__footer">
      <Link href={`/shop/${item.slug}`} className="shop-product-card__title">
        {item.name}
      </Link>
      <p className="shop-product-card__price">
        {item.compareAtPrice ? (
          <>
            <span className="shop-product-card__price-compare">{item.compareAtPrice}</span>
            <span>{item.price}</span>
          </>
        ) : (
          item.price
        )}
      </p>
    </div>
  );
}
