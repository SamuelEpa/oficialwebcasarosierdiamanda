import { renderInlineMarkdown } from "@/components/ui/MarkdownContent";

export function BlogPostBlockQuote({ content }: { content: string }) {
  return (
    <blockquote className="blog-article__pullquote blog-article__pullquote--quote">
      <p>{renderInlineMarkdown(content)}</p>
    </blockquote>
  );
}
