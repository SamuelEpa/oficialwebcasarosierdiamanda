import type { BlogPost } from "@/data/types";
import type { BlogPostAdjacent } from "@/features/blog/loadBlogPostPage";
import { BlogPostArticleSection } from "@/features/blog/components/post/BlogPostArticleSection";

/** @deprecated Prefer BlogPostArticleSection from features/blog */
export function BlogDetail({
  post,
  adjacent,
  position = 0,
  total = 0,
}: {
  post: BlogPost;
  adjacent: BlogPostAdjacent;
  relatedPosts?: BlogPost[];
  position?: number;
  total?: number;
}) {
  return (
    <BlogPostArticleSection
      post={post}
      adjacent={adjacent}
      position={position}
      total={total}
    />
  );
}
