import type { ExperienceItem } from "@/data/types";
import { OfferingDetailPage } from "@/features/experiences/OfferingDetailPage";
import type { OfferingDetailPromoPage } from "@/features/experiences/OfferingDetailPage";

const PROMO_BY_KIND: Record<ExperienceItem["kind"], OfferingDetailPromoPage> = {
  class: "class",
  workshop: "workshop",
  "private-booking": "experience",
  "gift-card": "gift-card",
};

/**
 * Shared detail shell for mapped ExperienceItems.
 * Prefer dedicated wrappers (ClassDetailPage, WorkshopDetailPage, etc.) on routes.
 */
export function ExperienceDetailPage({ item }: { item: ExperienceItem }) {
  return <OfferingDetailPage item={item} promoPage={PROMO_BY_KIND[item.kind]} />;
}
