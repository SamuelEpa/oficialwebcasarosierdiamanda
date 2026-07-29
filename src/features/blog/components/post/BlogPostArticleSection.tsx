import type { BlogPost } from "@/data/types";
import type { BlogPostAdjacent } from "../../loadBlogPostPage";
import { BlogPostArticleBody } from "./BlogPostArticleBody";
import { BlogPostCover } from "./BlogPostCover";
import { BlogPostCta } from "./BlogPostCta";
import { BlogPostIntro } from "./BlogPostIntro";
import { BlogPostPager } from "./BlogPostPager";
import { BlogPostTitle } from "./BlogPostTitle";

export function BlogPostArticleSection({
  post,
  adjacent,
  position,
  total,
}: {
  post: BlogPost;
  adjacent: BlogPostAdjacent;
  position: number;
  total: number;
}) {
  return (
    <>
      <article className="blog-article section">
        <div className="blog-article__container">
          <header className="blog-article__header">
            <BlogPostTitle title={post.title} />
            <BlogPostIntro post={post} />
          </header>
          <BlogPostCover post={post} />
          <BlogPostArticleBody blocks={post.contentBlocks} />
        </div>
      </article>
      <BlogPostCta />
      <BlogPostPager adjacent={adjacent} position={position} total={total} />
    </>
  );
}
