import type { BlogPost } from "@/data/types";
import type { BlogIndexIntroView } from "../../lib/buildBlogIndexIntroView";
import { BlogIndexMasthead } from "./BlogIndexMasthead";
import { BlogFeaturedSection } from "./BlogFeaturedSection";
import { BlogFeedSection } from "./BlogFeedSection";

export function BlogIndexSection({
  intro,
  featured,
  published,
}: {
  intro: BlogIndexIntroView;
  featured: BlogPost[];
  published: BlogPost[];
}) {
  return (
    <>
      <BlogIndexMasthead intro={intro} />
      <BlogFeaturedSection posts={featured} />
      <BlogFeedSection posts={published} />
    </>
  );
}
