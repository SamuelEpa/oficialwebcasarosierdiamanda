import { renderInlineMarkdown } from "@/components/ui/MarkdownContent";

export function BlogPostBlockHeading({
  level,
  content,
}: {
  level: 2 | 3;
  content: string;
}) {
  if (level === 3) {
    return (
      <h3 className="blog-article__subheading">{renderInlineMarkdown(content)}</h3>
    );
  }

  return (
    <p className="blog-article__pullquote" role="doc-subtitle">
      {renderInlineMarkdown(content)}
    </p>
  );
}
