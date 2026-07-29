import type { BlogPost } from "@/data/types";
import { assetPath } from "@/lib/assets";

export function BlogPostCover({ post }: { post: BlogPost }) {
  return (
    <figure className="blog-article__cover">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={assetPath(post.coverImage)}
        alt={post.title}
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
    </figure>
  );
}
