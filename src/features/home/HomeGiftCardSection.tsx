import { GiftCarousel } from "@/components/home/GiftCarousel";
import { HomeSection } from "@/components/home/HomeSection";
import type { GiftCardItem } from "@/data/types";

export function HomeGiftCardSection({
  items,
  title = "Experiencia en Ceramica",
  subtitle = "Regala una Gift Card",
}: {
  items: readonly GiftCardItem[];
  title?: string;
  subtitle?: string;
}) {
  return (
    <HomeSection
      id="gift-card"
      block="gift"
      title={title}
      subtitle={subtitle}
      withGrid={false}
      editorialSpacing
    >
      <GiftCarousel items={items} />
    </HomeSection>
  );
}
