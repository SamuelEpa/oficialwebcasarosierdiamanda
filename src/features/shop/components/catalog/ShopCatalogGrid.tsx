"use client";

import type { ShopItem } from "@/data/types";
import { ShopProductCard } from "./ShopProductCard";

export function ShopCatalogGrid({ items }: { items: ShopItem[] }) {
  return (
    <div className="shop-catalog__grid">
      {items.map((item) => (
        <ShopProductCard key={item.id} item={item} />
      ))}
    </div>
  );
}
