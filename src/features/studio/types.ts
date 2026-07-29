import type { TestimonialSlide } from "@/components/home/testimonial-slider";
import type { RichTextTypography } from "@/lib/cms/rich-text-typography";
import type { PageFaqSection, StudioPageSettings } from "@/lib/cms/types";

export type StudioTeamMemberLayout = "copy-left" | "copy-right";

export type StudioTeamMemberModel = {
  id: string;
  name: string;
  role: string;
  imageSrc: string;
  bio: string;
  bioTypography?: RichTextTypography;
  layout: StudioTeamMemberLayout;
};

export type StudioIntroView = {
  heading: string;
  body: string;
  bodyTypography: RichTextTypography;
};

export type StudioPublicFaqSection = PageFaqSection;

export type StudioPageViewModel = {
  pageSettings: StudioPageSettings;
  intro: StudioIntroView;
  team: StudioTeamMemberModel[];
  faqSection: StudioPublicFaqSection | null;
  testimonials: TestimonialSlide[];
  showIdeaPrompt: boolean;
};
