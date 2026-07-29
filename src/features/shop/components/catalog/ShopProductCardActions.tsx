"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { ShopIconBag, ShopIconEye, ShopIconHeart } from "./ShopProductIcons";

type Props = {
  productHref: string;
  productName: string;
  isFavorite: boolean;
  isSoldOut: boolean;
  onToggleFavorite: (event?: MouseEvent) => void;
  onAddToCart: (event?: MouseEvent) => void;
};

function stop(event: MouseEvent) {
  event.stopPropagation();
}

export function ShopProductCardActions({
  productHref,
  productName,
  isFavorite,
  isSoldOut,
  onToggleFavorite,
  onAddToCart,
}: Props) {
  return (
    <div className="shop-product-card__actions" role="group" aria-label={`Acciones para ${productName}`}>
      <Link
        href={productHref}
        className="shop-product-card__action"
        aria-label={`Ver ${productName}`}
        onClick={stop}
      >
        <ShopIconEye />
      </Link>
      <button
        type="button"
        className="shop-product-card__action"
        aria-label={`Añadir ${productName} al carrito`}
        disabled={isSoldOut}
        onClick={(event) => {
          stop(event);
          onAddToCart(event);
        }}
      >
        <ShopIconBag />
      </button>
      <button
        type="button"
        className={`shop-product-card__action${isFavorite ? " is-active" : ""}`}
        aria-label={
          isFavorite ? `Quitar ${productName} de favoritos` : `Guardar ${productName} en favoritos`
        }
        aria-pressed={isFavorite}
        onClick={(event) => {
          stop(event);
          onToggleFavorite(event);
        }}
      >
        <ShopIconHeart filled={isFavorite} />
      </button>
    </div>
  );
}
