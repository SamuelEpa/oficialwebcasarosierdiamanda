import type { BlogPost } from "@/data/types";
import { resolveBlogCardExcerpt } from "./resolveBlogCardExcerpt";

function stripHtml(value: string) {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Short intro under the title (plain text, no full HTML body). */
export function resolveBlogPostIntro(post: BlogPost) {
  const preferred = resolveBlogCardExcerpt(post);
  if (preferred) return stripHtml(preferred);
  return stripHtml(post.excerpt).slice(0, 420);
}
