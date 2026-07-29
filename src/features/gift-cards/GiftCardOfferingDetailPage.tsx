import type { ExperienceItem } from "@/data/types";
import { OfferingDetailPage } from "@/features/experiences/OfferingDetailPage";

/** Public slug page for /gift-cards/[slug] (offering type: gift_card). */
export function GiftCardOfferingDetailPage({ item }: { item: ExperienceItem }) {
  return <OfferingDetailPage item={item} promoPage="gift-card" />;
}
