import type { ExperienceItem } from "@/data/types";
import { OfferingDetailPage } from "@/features/experiences/OfferingDetailPage";

export function WorkshopDetailPage({ item }: { item: ExperienceItem }) {
  return <OfferingDetailPage item={item} promoPage="workshop" />;
}
