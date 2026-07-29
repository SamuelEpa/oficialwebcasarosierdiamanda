import { mapCmsTestimonialsToSlides } from "@/components/home/testimonial-slider";
import { getPublicTestimonials } from "@/lib/cms/public-content";
import { getPublicPageFaqSectionBySlug } from "@/lib/cms/page-faqs";
import { getStudioPageSettings } from "@/lib/cms/studio-page";
import { getPublishedTeachers } from "@/lib/cms/teachers";
import { buildStudioIntroView } from "./lib/buildStudioIntroView";
import { mapPublishedTeachersToTeam } from "./lib/mapPublishedTeachersToTeam";
import type { StudioPageViewModel } from "./types";

export async function loadStudioPage(): Promise<StudioPageViewModel> {
  const [cmsTestimonials, teachers, pageSettings, faqSection] = await Promise.all([
    getPublicTestimonials(),
    getPublishedTeachers(),
    getStudioPageSettings(),
    getPublicPageFaqSectionBySlug("el-estudio"),
  ]);

  return {
    pageSettings,
    intro: buildStudioIntroView(pageSettings),
    team: mapPublishedTeachersToTeam(teachers),
    faqSection,
    testimonials: mapCmsTestimonialsToSlides(cmsTestimonials),
    showIdeaPrompt: pageSettings.showIdeaPromptSection,
  };
}
