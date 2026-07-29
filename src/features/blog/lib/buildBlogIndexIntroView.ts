import type { BlogPageSettings } from "@/lib/cms/types";

export type BlogIndexIntroView = {
  heading: string;
  kicker: string;
  text: string;
};

export const DEFAULT_BLOG_INDEX_INTRO: BlogIndexIntroView = {
  heading: "Bitácora cerámica",
  kicker: "Casa Rosier",
  text: "Un espacio para compartir procesos, técnicas, reflexiones y pequeñas historias alrededor de la cerámica contemporánea, el taller y la creación con las manos.",
};

export function buildBlogIndexIntroView(
  page: Pick<BlogPageSettings, "introHeading" | "introKicker" | "introText">
): BlogIndexIntroView {
  return {
    heading: page.introHeading?.trim() || DEFAULT_BLOG_INDEX_INTRO.heading,
    kicker: page.introKicker?.trim() || DEFAULT_BLOG_INDEX_INTRO.kicker,
    text: page.introText?.trim() || DEFAULT_BLOG_INDEX_INTRO.text,
  };
}
