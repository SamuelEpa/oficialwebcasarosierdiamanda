import { getIdeaPromptContent, type IdeaPromptContext } from "@/features/shared/contextual-sections/ideaPromptContent";
import type { SocialGallery as CmsSocialGallery } from "@/lib/cms/types";

export function buildSocialGalleryProps(gallery: CmsSocialGallery | null, context: IdeaPromptContext) {
  const fallback = getIdeaPromptContent(context);
  const posts = gallery?.items
    .filter((item) => item.is_visible !== false && item.image_url)
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((item) => ({
      image: item.image_url,
      title: item.title,
      body: item.description,
      instagramUrl: item.instagram_url,
    }));

  return {
    id: fallback.id,
    title: gallery?.title || fallback.title,
    subtitle: gallery?.description || fallback.subtitle,
    posts: posts?.length ? posts : fallback.posts,
    ariaLabel: fallback.ariaLabel,
    sourceHref: gallery?.cta_url || fallback.sourceHref,
  };
}
