import type { BlogPost as PublicBlogPost } from "@/data/types";
import type { BlogPost } from "@/lib/cms/types";
import { cmsPostToPublic } from "./cmsPostToPublic";

/** Mirror of public blog listing rules used by getPublicBlogData(). */
export function buildBlogPreviewPostCollections(cmsPosts: BlogPost[]) {
  const published = cmsPosts
    .filter((post) => post.status === "published")
    .map(cmsPostToPublic)
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt) || a.manualOrder - b.manualOrder);

  const listing = published.filter((post) => post.visibleInListing !== false);
  const featured = published
    .filter((post) => post.isFeatured)
    .sort(
      (a, b) =>
        (a.featuredOrder ?? 999) - (b.featuredOrder ?? 999) ||
        +new Date(b.publishedAt) - +new Date(a.publishedAt),
    );
  const categories = Array.from(new Set(listing.map((post) => post.category)));

  return { listing, featured, categories } satisfies {
    listing: PublicBlogPost[];
    featured: PublicBlogPost[];
    categories: string[];
  };
}

export function sortAdminVisiblePosts(posts: BlogPost[]) {
  return posts
    .filter((post) => post.status !== "deleted")
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0) || +new Date(b.updated_at) - +new Date(a.updated_at));
}

export function isBlogPost(value: unknown): value is BlogPost {
  return Boolean(value && typeof value === "object" && "id" in value && "status" in value);
}
