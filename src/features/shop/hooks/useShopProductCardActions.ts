"use client";

import { useCallback, useEffect, useState } from "react";
import type { ShopItem } from "@/data/types";
import { addCartItem } from "@/lib/cart";
import {
  isShopFavorite,
  toggleShopFavorite,
} from "@/lib/shop-favorites";

export function useShopProductCardActions(item: ShopItem) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(isShopFavorite(item.id));
    const sync = () => setIsFavorite(isShopFavorite(item.id));
    window.addEventListener("casarosier:shop-favorites", sync);
    return () => window.removeEventListener("casarosier:shop-favorites", sync);
  }, [item.id]);

  const toggleFavorite = useCallback(
    (event?: { preventDefault: () => void; stopPropagation: () => void }) => {
      event?.preventDefault();
      event?.stopPropagation();
      setIsFavorite(toggleShopFavorite(item.id));
    },
    [item.id],
  );

  const addToCart = useCallback(
    (event?: { preventDefault: () => void; stopPropagation: () => void }) => {
      event?.preventDefault();
      event?.stopPropagation();
      if (item.badge === "sold") return;
      addCartItem({
        cartItemId: `${item.id}-${Date.now()}`,
        productId: item.id,
        slug: item.slug,
        kind: "product",
        title: item.name,
        subtitle: item.categoryLabel,
        price: item.price,
        quantity: 1,
        addedAt: new Date().toISOString(),
      });
    },
    [item],
  );

  return {
    isFavorite,
    toggleFavorite,
    addToCart,
    productHref: `/shop/${item.slug}`,
    isSoldOut: item.badge === "sold",
  };
}
