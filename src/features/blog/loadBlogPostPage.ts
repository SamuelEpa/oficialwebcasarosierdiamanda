import {
  getBlogNeighbors,
  getPublicBlogData,
} from "@/lib/cms/blog-public";

export async function loadBlogPostPage(slug: string) {
  const { published } = await getPublicBlogData();
  const post = published.find((entry) => entry.slug === slug) ?? null;
  if (!post) return null;

  return {
    post,
    adjacent: getBlogNeighbors(published, post),
    position: published.findIndex((entry) => entry.slug === slug) + 1,
    total: published.length,
  };
}

export type BlogPostAdjacent = ReturnType<typeof getBlogNeighbors>;
