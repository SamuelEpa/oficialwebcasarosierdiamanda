import { HeaderInterno } from "@/components/layout/HeaderInterno";
import type { CmsHeroSettings } from "@/lib/cms/types";
import { mapShopHeroHeaderProps } from "../utils/mapShopHeroHeaderProps";

export async function ShopIndexHeader({ hero }: { hero: CmsHeroSettings }) {
  return <HeaderInterno {...mapShopHeroHeaderProps(hero)} />;
}
