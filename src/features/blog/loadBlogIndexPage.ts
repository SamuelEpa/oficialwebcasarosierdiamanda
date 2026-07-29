import { getBlogPageSettings } from "@/lib/cms/blog-page";
import { getPublicBlogData } from "@/lib/cms/blog-public";
import { getSelectedFaqBlock } from "@/lib/cms/faq-selection";
import { getFaqGroups, getFaqs } from "@/lib/cms/faqs";
import { buildBlogIndexIntroView } from "./lib/buildBlogIndexIntroView";

export async function loadBlogIndexPage() {
  const [page, blogData, faqs, faqGroups] = await Promise.all([
    getBlogPageSettings(),
    getPublicBlogData(),
    getFaqs(),
    getFaqGroups(),
  ]);

  const selectedFaqBlock = page.showFaqSection
    ? getSelectedFaqBlock(faqs, faqGroups, page.faqGroupId)
    : null;

  return {
    page,
    hero: page.hero,
    intro: buildBlogIndexIntroView(page),
    featured: blogData.featured,
    published: blogData.published,
    categories: blogData.categories,
    selectedFaqBlock,
    showIdeaPrompt: page.showIdeaPromptSection,
  };
}
