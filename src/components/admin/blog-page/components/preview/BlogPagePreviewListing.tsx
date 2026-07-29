"use client";

import { memo } from "react";
import type { BlogPost as PublicBlogPost } from "@/data/types";
import { BlogIndexSection } from "@/features/blog/components/index/BlogIndexSection";
import { DEFAULT_BLOG_INDEX_INTRO } from "@/features/blog/lib/buildBlogIndexIntroView";

type Props = {
  listing: PublicBlogPost[];
  featured: PublicBlogPost[];
  categories: string[];
};

function BlogPagePreviewListingComponent({ listing, featured }: Props) {
  return (
    <BlogIndexSection
      intro={DEFAULT_BLOG_INDEX_INTRO}
      featured={featured}
      published={listing}
    />
  );
}

export const BlogPagePreviewListing = memo(BlogPagePreviewListingComponent);
