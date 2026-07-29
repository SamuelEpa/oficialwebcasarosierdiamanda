import type { BlogPost } from "@/data/types";

/** Prefer CMS listing excerpt, then featured excerpt, then full excerpt. */
export function resolveBlogCardExcerpt(post: BlogPost) {
  const listing = post.listingExcerpt?.trim();
  if (listing) return listing;
  const featured = post.featuredExcerpt?.trim();
  if (featured) return featured;
  return post.excerpt?.trim() ?? "";
}
