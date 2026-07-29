import { HeaderInterno } from "@/components/layout/HeaderInterno";
import type { ExperienceItem } from "@/data/types";
import { ClassDetailSection } from "@/features/classes/components/class-detail/ClassDetailSection";
import { IdeaPromptSection } from "@/features/shared/contextual-sections/IdeaPromptSection";
import { SitePage } from "@/features/shared/layout/SitePage";
import { buildExperienceDetailHero } from "@/features/experiences/buildExperienceDetailHero";

export type OfferingDetailPromoPage =
  | "class"
  | "workshop"
  | "experience"
  | "gift-card";

export function OfferingDetailPage({
  item,
  promoPage,
}: {
  item: ExperienceItem;
  promoPage: OfferingDetailPromoPage;
}) {
  const hero = buildExperienceDetailHero(item);
  const titleLevel = hero.heroVariant === "text" ? "h2" : "h1";

  return (
    <SitePage
      bodyClass="class-detail-page"
      bodyData={{ promoPage }}
      header={
        <HeaderInterno
          className="experience-detail-hero"
          hero={hero}
          image={hero.heroImage || item.heroImage}
          mobileImage={hero.heroImageMobile || undefined}
        />
      }
    >
      <ClassDetailSection item={item} titleLevel={titleLevel} />
      {item.showIdeaPromptSection ? <IdeaPromptSection context="home" /> : null}
    </SitePage>
  );
}
