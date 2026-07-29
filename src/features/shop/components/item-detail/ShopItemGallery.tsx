"use client";

import type { ShopItem } from "@/data/types";
import { useShopItemGallery } from "../../hooks/useShopItemGallery";
import { ShopItemGalleryView } from "./ShopItemGalleryView";

export function ShopItemGallery({ item }: { item: ShopItem }) {
  const gallery = useShopItemGallery(item);

  return (
    <ShopItemGalleryView
      productName={item.name}
      images={gallery.images}
      activeIndex={gallery.activeIndex}
      activeImage={gallery.activeImage}
      badge={item.badge}
      onSelectImage={gallery.selectImage}
    />
  );
}
