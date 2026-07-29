import type { ShopProductBadge } from "@/data/types";
import type { Product } from "./types";

const NEW_PRODUCT_DAYS = 45;
const POPULAR_STOCK_THRESHOLD = 3;

export function formatShopPrice(value: number | null): string {
  if (value === null) return "Consultar";
  return `${Math.round(value)} €`;
}

export function deriveShopProductBadge(
  product: Product,
  options?: { markPopular?: boolean },
): ShopProductBadge | null {
  if (product.stock !== null && product.stock <= 0) return "sold";
  if (
    product.compare_at_price !== null &&
    product.price !== null &&
    product.compare_at_price > product.price
  ) {
    return "sale";
  }
  const createdAt = Date.parse(product.created_at);
  if (Number.isFinite(createdAt)) {
    const ageMs = Date.now() - createdAt;
    if (ageMs >= 0 && ageMs <= NEW_PRODUCT_DAYS * 24 * 60 * 60 * 1000) return "new";
  }
  if (options?.markPopular) return "popular";
  if (product.stock !== null && product.stock > 0 && product.stock <= POPULAR_STOCK_THRESHOLD) {
    return "popular";
  }
  return null;
}

export const SHOP_BADGE_LABELS: Record<ShopProductBadge, string> = {
  sale: "SALE",
  sold: "SOLD",
  new: "NEW",
  popular: "POPULAR",
};
