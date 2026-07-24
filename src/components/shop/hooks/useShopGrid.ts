"use client";

import { useMemo, useState } from "react";
import type { ShopCategory, ShopItem } from "@/data/types";
import { buildPages } from "../utils/pagination";

const PAGE_SIZE = 9;
export const ALL_CATEGORIES_KEY = "all";

export function useShopGrid(published: ShopItem[], shopCategories: ShopCategory[]) {
  const [category, setCategoryState] = useState(ALL_CATEGORIES_KEY);
  const [page, setPage] = useState(1);

  const filters = useMemo(() => {
    if (shopCategories.length) return shopCategories;
    return [{ key: ALL_CATEGORIES_KEY, label: "Todas" }];
  }, [shopCategories]);

  const activeCategory = filters.some((item) => item.key === category)
    ? category
    : ALL_CATEGORIES_KEY;

  const filtered = useMemo(() => {
    if (activeCategory === ALL_CATEGORIES_KEY) return published;
    return published.filter((item) => item.category === activeCategory);
  }, [activeCategory, published]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const startIndex = (safePage - 1) * PAGE_SIZE;
  const items = filtered.slice(startIndex, startIndex + PAGE_SIZE);
  const showPagination = filtered.length > PAGE_SIZE;
  const pages = buildPages(safePage, totalPages);

  function setCategory(nextCategory: string) {
    setCategoryState(nextCategory);
    setPage(1);
  }

  return {
    filters,
    activeCategory,
    setCategory,
    filteredCount: filtered.length,
    items,
    page: safePage,
    setPage,
    totalPages,
    pages,
    showPagination,
  };
}
