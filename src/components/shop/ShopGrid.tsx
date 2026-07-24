"use client";

import type { ShopCategory, ShopItem } from "@/data/types";
import { ShopCategoryFilters } from "./components/ShopCategoryFilters";
import { ShopPagination } from "./components/ShopPagination";
import { ShopProductCard } from "./components/ShopProductCard";
import { useShopGrid } from "./hooks/useShopGrid";

export function ShopGrid({
  published,
  shopCategories = [],
}: {
  published: ShopItem[];
  shopCategories?: ShopCategory[];
}) {
  const grid = useShopGrid(published, shopCategories);

  return (
    <section className="shop-listing section">
      <div className="container shop-listing__container">
        <ShopCategoryFilters
          filters={grid.filters}
          activeCategory={grid.activeCategory}
          onChange={grid.setCategory}
        />

        {grid.items.length ? (
          <div className="cards-grid shop-grid">
            {grid.items.map((item) => (
              <ShopProductCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <p className="shop-empty">
            {published.length
              ? "No hay piezas en esta categoría por ahora."
              : "Todavía no hay piezas publicadas."}
          </p>
        )}

        {grid.showPagination ? (
          <ShopPagination
            page={grid.page}
            totalPages={grid.totalPages}
            pages={grid.pages}
            onPageChange={grid.setPage}
          />
        ) : null}
      </div>
    </section>
  );
}
