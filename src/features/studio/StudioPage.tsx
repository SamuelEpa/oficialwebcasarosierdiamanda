import { TestimonialSlider } from "@/components/home/testimonial-slider";
import { HeaderInterno } from "@/components/layout/HeaderInterno";
import { IdeaPromptSection } from "@/features/shared/contextual-sections/IdeaPromptSection";
import PublicFaqSection from "@/features/shared/contextual-sections/PublicFaqSection";
import { SitePage } from "@/features/shared/layout/SitePage";
import { StudioTeamEditorialSection } from "@/features/studio/components/studio-team-editorial/StudioTeamEditorialSection";
import { loadStudioPage } from "@/features/studio/loadStudioPage";

export async function StudioPage() {
  const { pageSettings, intro, team, faqSection, testimonials, showIdeaPrompt } =
    await loadStudioPage();
  const hero = pageSettings.hero;

  return (
    <SitePage
      bodyClass="studio-page"
      header={
        <HeaderInterno
          hero={hero}
          image={hero.heroImage}
          height="large"
          overlayTitle
        />
      }
    >
      <StudioTeamEditorialSection intro={intro} team={team} />
      <PublicFaqSection pageSection={faqSection} eyebrow="" />
      {showIdeaPrompt ? <IdeaPromptSection context="studio" /> : null}
      <TestimonialSlider testimonials={testimonials} />
    </SitePage>
  );
}
