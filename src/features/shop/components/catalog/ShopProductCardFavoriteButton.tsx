"use client";

import type { MouseEvent } from "react";
import { ShopIconHeart } from "./ShopProductIcons";

export function ShopProductCardFavoriteButton({
  productName,
  isFavorite,
  onToggleFavorite,
}: {
  productName: string;
  isFavorite: boolean;
  onToggleFavorite: (event?: MouseEvent) => void;
}) {
  return (
    <button
      type="button"
      className={`shop-product-card__favorite${isFavorite ? " is-active" : ""}`}
      aria-label={
        isFavorite ? `Quitar ${productName} de favoritos` : `Guardar ${productName} en favoritos`
      }
      aria-pressed={isFavorite}
      onClick={(event) => onToggleFavorite(event)}
    >
      <ShopIconHeart filled={isFavorite} width={24} height={24} strokeWidth={1.25} />
    </button>
  );
}
