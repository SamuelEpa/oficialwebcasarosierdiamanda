import type { ShopItem } from "@/data/types";
import { ShopCatalogGrid } from "../catalog/ShopCatalogGrid";

export function ShopItemRelatedSection({
  items,
  categoryLabel,
}: {
  items: ShopItem[];
  categoryLabel: string;
}) {
  if (!items.length) return null;

  return (
    <section className="shop-item-related section" aria-labelledby="shop-item-related-title">
      <div className="shop-item-related__container">
        <h2 id="shop-item-related-title" className="shop-item-related__title">
          {categoryLabel.trim()
            ? `Piezas relacionadas · ${categoryLabel}`
            : "Piezas relacionadas"}
        </h2>
        <ShopCatalogGrid items={items} />
      </div>
    </section>
  );
}
