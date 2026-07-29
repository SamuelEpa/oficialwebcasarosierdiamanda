"use client";

import { useCallback, useMemo, useState } from "react";
import type { ExperienceItem } from "@/data/types";
import { addCartItem } from "@/lib/cart";

export function useClassDetailEnroll(item: ExperienceItem) {
  const [added, setAdded] = useState(false);
  const isGiftCard = item.kind === "gift-card";

  const defaultPrice = useMemo(
    () =>
      item.priceOptions.length <= 1
        ? item.priceOptions[0]?.price ?? ""
        : item.priceOptions
            .map((option) => `${option.label}: ${option.price}`)
            .join(" / "),
    [item.priceOptions],
  );

  const addGiftCard = useCallback(() => {
    addCartItem({
      cartItemId: `${item.id}-${Date.now()}`,
      productId: item.id,
      slug: item.slug,
      kind: item.kind,
      title: item.title,
      subtitle: item.subtitle,
      price: defaultPrice,
      quantity: 1,
      addedAt: new Date().toISOString(),
    });
    setAdded(true);
  }, [defaultPrice, item]);

  return { isGiftCard, defaultPrice, added, addGiftCard };
}
