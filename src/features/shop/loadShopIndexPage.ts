import { getShopPageSettings } from "@/lib/cms/shop-page";
import { getPublicPageFaqSectionBySlug } from "@/lib/cms/page-faqs";
import { getPublicShopData } from "@/lib/cms/shop-public";

export async function loadShopIndexPage() {
  const [shopData, page, faqSection] = await Promise.all([
    getPublicShopData(),
    getShopPageSettings(),
    getPublicPageFaqSectionBySlug("shop"),
  ]);

  return {
    published: shopData.published,
    shopCategories: shopData.shopCategories,
    hero: page.hero,
    faqSection,
  };
}
