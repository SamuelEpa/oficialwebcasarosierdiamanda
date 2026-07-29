import type { BlogPost } from "@/data/types";
import { resolveBlogPostIntro } from "../../lib/resolveBlogPostIntro";

export function BlogPostIntro({ post }: { post: BlogPost }) {
  const intro = resolveBlogPostIntro(post);
  if (!intro) return null;

  return <p className="blog-article__intro">{intro}</p>;
}
