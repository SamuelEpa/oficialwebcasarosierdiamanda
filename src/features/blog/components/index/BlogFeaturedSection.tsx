import type { BlogPost } from "@/data/types";
import { BlogFeaturedCarousel } from "./BlogFeaturedCarousel";

export function BlogFeaturedSection({ posts }: { posts: BlogPost[] }) {
  if (!posts.length) return null;

  return (
    <section className="blog-index-featured section" aria-label="Artículos destacados">
      <div className="blog-index-featured__container">
        <BlogFeaturedCarousel posts={posts} />
      </div>
    </section>
  );
}
