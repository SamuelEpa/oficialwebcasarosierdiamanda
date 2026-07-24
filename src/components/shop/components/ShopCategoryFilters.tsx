"use client";

import type { ShopCategory } from "@/data/types";
import { classNames } from "@/lib/utils";

type Props = {
  filters: ShopCategory[];
  activeCategory: string;
  onChange: (categoryKey: string) => void;
};

export function ShopCategoryFilters({ filters, activeCategory, onChange }: Props) {
  if (filters.length <= 1) return null;

  return (
    <div className="shop-filters" role="toolbar" aria-label="Filtrar por categoría">
      {filters.map((filter) => {
        const isActive = filter.key === activeCategory;
        return (
          <button
            key={filter.key}
            type="button"
            className={classNames("shop-filter", isActive && "is-active")}
            aria-pressed={isActive}
            onClick={() => onChange(filter.key)}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
