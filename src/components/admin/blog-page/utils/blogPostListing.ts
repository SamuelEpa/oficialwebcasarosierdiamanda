import type { BlogPost } from "@/lib/cms/types";

function cleanListingText(value: string) {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[`*_>#~]/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;|&#34;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
}

export function blogPostListingExcerpt(post: BlogPost) {
  const blockContent = post.blocks
    .filter((block) => block.is_visible)
    .map((block) => [block.title, block.text, block.custom_html].filter(Boolean).join(" "))
    .join(" ");
  const clean = cleanListingText(post.listing_excerpt || blockContent || post.content || post.excerpt);
  const words = clean.split(/\s+/).filter(Boolean);
  return `${words.slice(0, 10).join(" ")}${words.length > 10 ? "..." : ""}`;
}

export function normalizeBlogPostSearch(post: BlogPost) {
  return [post.title, post.category, post.slug, post.excerpt].filter(Boolean).join(" ").toLowerCase();
}
