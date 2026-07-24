"use client";

import { memo } from "react";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { FeaturedCarousel } from "@/components/blog/FeaturedCarousel";
import type { BlogPost as PublicBlogPost } from "@/data/types";

type Props = {
  listing: PublicBlogPost[];
  featured: PublicBlogPost[];
  categories: string[];
};

function BlogPagePreviewListingComponent({ listing, featured, categories }: Props) {
  return (
    <>
      <section className="blog-intro section">
        <div className="container blog-intro__container">
          <p>
            Un espacio para compartir procesos, tecnicas, reflexiones y pequenas historias alrededor de la ceramica
            contemporanea, el taller y la creacion con las manos.
          </p>
        </div>
      </section>
      <section className="blog-featured section">
        <div className="container blog-featured__container">
          <h2 className="blog-featured__title">Destacados</h2>
          <FeaturedCarousel posts={featured} />
        </div>
      </section>
      <section className="blog-listing section">
        <div className="container blog-listing__container">
          <BlogGrid posts={listing} categories={categories} />
        </div>
      </section>
    </>
  );
}

export const BlogPagePreviewListing = memo(BlogPagePreviewListingComponent);
