import { IdeaPromptSection } from "@/features/shared/contextual-sections/IdeaPromptSection";
import PublicFaqSection from "@/features/shared/contextual-sections/PublicFaqSection";
import { SitePage } from "@/features/shared/layout/SitePage";
import { BlogIndexHeader } from "./components/BlogIndexHeader";
import { BlogIndexSection } from "./components/index/BlogIndexSection";
import { loadBlogIndexPage } from "./loadBlogIndexPage";

export async function BlogIndexPage() {
  const { intro, featured, published, selectedFaqBlock, showIdeaPrompt } =
    await loadBlogIndexPage();

  return (
    <SitePage bodyClass="blog-page" header={<BlogIndexHeader />}>
      <BlogIndexSection
        intro={intro}
        featured={featured}
        published={published}
      />
      {selectedFaqBlock ? (
        <PublicFaqSection block={selectedFaqBlock} eyebrow="" />
      ) : null}
      {showIdeaPrompt ? <IdeaPromptSection context="home" /> : null}
    </SitePage>
  );
}
