import { MarkdownContent } from "@/components/ui/MarkdownContent";

export function BlogPostBlockParagraph({ content }: { content: string }) {
  return <MarkdownContent className="blog-article__paragraph" source={content} />;
}
