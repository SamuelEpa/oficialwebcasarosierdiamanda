import type { ExperienceItem } from "@/data/types";
import { OfferingDetailPage } from "@/features/experiences/OfferingDetailPage";

export function ClassDetailPage({ item }: { item: ExperienceItem }) {
  return <OfferingDetailPage item={item} promoPage="class" />;
}
