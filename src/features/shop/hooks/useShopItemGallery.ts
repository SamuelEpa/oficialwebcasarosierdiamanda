"use client";

import { useCallback, useMemo, useState } from "react";
import type { ShopItem } from "@/data/types";
import { shopItemGalleryImages } from "../lib/shopItemGalleryImages";

export function useShopItemGallery(item: ShopItem) {
  const images = useMemo(() => shopItemGalleryImages(item), [item]);
  const [activeIndex, setActiveIndex] = useState(0);
  const safeIndex = Math.min(activeIndex, Math.max(images.length - 1, 0));
  const activeImage = images[safeIndex] ?? item.image;

  const selectImage = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return {
    images,
    activeIndex: safeIndex,
    activeImage,
    selectImage,
  };
}
