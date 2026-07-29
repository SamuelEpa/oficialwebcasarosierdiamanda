import type { BlogContentBlock } from "@/data/types";
import { BlogPostBlockRenderer } from "./content/BlogPostBlockRenderer";

export function BlogPostArticleBody({ blocks }: { blocks: BlogContentBlock[] }) {
  if (!blocks.length) return null;

  return (
    <div className="blog-article__body">
      {blocks.map((block, index) => (
        <BlogPostBlockRenderer block={block} key={`${block.type}-${index}`} />
      ))}
    </div>
  );
}
