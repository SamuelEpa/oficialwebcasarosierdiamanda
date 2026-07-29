import type { ExperienceItem } from "@/data/types";
import { OfferingDetailPage } from "@/features/experiences/OfferingDetailPage";

/** Public slug page for /experiencias/[slug] (offering type: experience). */
export function ExperienceOfferingDetailPage({ item }: { item: ExperienceItem }) {
  return <OfferingDetailPage item={item} promoPage="experience" />;
}
