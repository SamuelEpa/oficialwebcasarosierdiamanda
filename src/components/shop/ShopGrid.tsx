"use client";

import { ShopCatalogSection } from "@/features/shop/components/catalog/ShopCatalogSection";
import type { ShopCategory, ShopItem } from "@/data/types";

/** @deprecated Use ShopCatalogSection from features/shop */
export function ShopGrid({
  published,
  shopCategories = [],
}: {
  published: ShopItem[];
  shopCategories?: ShopCategory[];
}) {
  return <ShopCatalogSection published={published} shopCategories={shopCategories} />;
}
