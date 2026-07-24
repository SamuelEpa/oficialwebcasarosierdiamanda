import { ShopGrid } from "@/components/shop/ShopGrid";
import { SitePage } from "@/features/shared/layout/SitePage";
import PublicFaqSection from "@/features/shared/contextual-sections/PublicFaqSection";
import { ShopIndexHeader } from "./components/ShopIndexHeader";
import { loadShopIndexPage } from "./loadShopIndexPage";

export async function ShopIndexPage() {
  const { published, shopCategories, hero, faqSection } = await loadShopIndexPage();

  return (
    <SitePage bodyClass="shop-page" header={<ShopIndexHeader hero={hero} />}>
      <ShopGrid published={published} shopCategories={shopCategories} />
      <PublicFaqSection pageSection={faqSection} eyebrow="" />
    </SitePage>
  );
}
