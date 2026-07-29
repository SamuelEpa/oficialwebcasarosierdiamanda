import { HeaderInterno } from "@/components/layout/HeaderInterno";

/** PDP: navigation band only (no hero title). Must keep page-hero--nav-only so absolute nav has height. */
export async function ShopItemPageHeader() {
  return (
    <HeaderInterno
      height="small"
      className="shop-item-page-header page-hero--nav-only"
      heroMenuTone="dark"
    />
  );
}
