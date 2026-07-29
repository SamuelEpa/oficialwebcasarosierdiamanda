"use client";

import { useMemo } from "react";
import type { ShopCategory, ShopItem } from "@/data/types";
import { useShopGrid } from "@/components/shop/hooks/useShopGrid";
import { buildShopCategoryNav } from "../lib/buildShopCategoryNav";

export function useShopCatalog(published: ShopItem[], shopCategories: ShopCategory[]) {
  const grid = useShopGrid(published, shopCategories);
  const categories = useMemo(
    () => buildShopCategoryNav(grid.filters, published),
    [grid.filters, published],
  );

  return {
    ...grid,
    categories,
  };
}
