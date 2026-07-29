import type { BlogPost } from "@/data/types";
import { BlogFeedList } from "./BlogFeedList";

export function BlogFeedSection({ posts }: { posts: BlogPost[] }) {
  return (
    <section className="blog-index-feed section" aria-label="Artículos del blog">
      <div className="blog-index-feed__container">
        <BlogFeedList posts={posts} />
      </div>
    </section>
  );
}
