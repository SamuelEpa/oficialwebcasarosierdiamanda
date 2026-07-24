import Link from "next/link";
import type { ShopItem } from "@/data/types";
import { assetPath } from "@/lib/assets";

export function ShopProductCard({ item }: { item: ShopItem }) {
  return (
    <article className="content-card classes-card shop-card">
      <Link
        className="content-card__media shop-card__media"
        href={`/shop/${item.slug}`}
        aria-label={`Ver pieza ${item.name}`}
      >
        <img src={assetPath(item.image)} alt={item.name} />
      </Link>
      <div className="content-card__body shop-card__body">
        <p className="content-card__meta shop-card__meta">{item.categoryLabel}</p>
        <h3 className="content-card__title card__title">{item.name}</h3>
        <div className="shop-card__facts">
          <p className="shop-card__price">{item.price}</p>
          <p className="shop-card__availability">{item.availability}</p>
        </div>
        <Link className="content-card__cta shop-card__cta" href={`/shop/${item.slug}`}>
          Ver pieza
        </Link>
      </div>
    </article>
  );
}
