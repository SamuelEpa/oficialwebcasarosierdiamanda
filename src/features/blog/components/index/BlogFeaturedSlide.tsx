import Link from "next/link";
import type { BlogPost } from "@/data/types";
import { assetPath } from "@/lib/assets";
import { BlogFeaturedSlideCard } from "./BlogFeaturedSlideCard";

export function BlogFeaturedSlide({ post }: { post: BlogPost }) {
  const image = post.featuredImage ?? post.coverImage;

  return (
    <>
      <div className="blog-featured-slide__peek blog-featured-slide__peek--media" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={assetPath(image)} alt="" />
      </div>
      <Link className="blog-featured-slide__main" href={`/blog/${post.slug}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="blog-featured-slide__main-image"
          src={assetPath(image)}
          alt={post.title}
        />
      </Link>
      <BlogFeaturedSlideCard post={post} />
    </>
  );
}
