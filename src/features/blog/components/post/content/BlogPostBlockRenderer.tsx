import type { BlogContentBlock } from "@/data/types";
import { BlogPostBlockCta } from "./BlogPostBlockCta";
import { BlogPostBlockGallery } from "./BlogPostBlockGallery";
import { BlogPostBlockHeading } from "./BlogPostBlockHeading";
import { BlogPostBlockImage } from "./BlogPostBlockImage";
import { BlogPostBlockList } from "./BlogPostBlockList";
import { BlogPostBlockParagraph } from "./BlogPostBlockParagraph";
import { BlogPostBlockQuote } from "./BlogPostBlockQuote";

export function BlogPostBlockRenderer({ block }: { block: BlogContentBlock }) {
  switch (block.type) {
    case "paragraph":
      return <BlogPostBlockParagraph content={block.content} />;
    case "heading":
      return <BlogPostBlockHeading level={block.level} content={block.content} />;
    case "quote":
      return <BlogPostBlockQuote content={block.content} />;
    case "image":
      return <BlogPostBlockImage src={block.src} alt={block.alt} caption={block.caption} />;
    case "list":
      return <BlogPostBlockList items={block.items} />;
    case "gallery":
      return <BlogPostBlockGallery images={block.images} />;
    case "cta":
      return <BlogPostBlockCta text={block.text} href={block.href} />;
    default:
      return null;
  }
}
