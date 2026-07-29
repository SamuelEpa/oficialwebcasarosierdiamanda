import { MarkdownContent, renderInlineMarkdown } from "@/components/ui/MarkdownContent";
import {
  normalizeRichTextTypography,
  richTextTypographyStyle,
  type RichTextTypography,
} from "@/lib/cms/rich-text-typography";
import { includedMarkdownSource } from "../../lib/classDetailContent";

function isStructuredIncludedSource(source: string) {
  return /<\/?(?:p|ul|ol|h[1-3])\b/i.test(source);
}

function parsePlainIncludedLines(included: string[]) {
  const source = includedMarkdownSource(included);
  if (!source || isStructuredIncludedSource(source)) return null;

  return source
    .split("\n")
    .map((line) => line.trim().replace(/^[-*]\s+/, "").replace(/^#{1,3}\s+/, ""))
    .filter(Boolean);
}

function isNoIncluyeDivider(text: string) {
  const normalized = text.replace(/\*\*/g, "").trim().toLowerCase();
  return normalized === "no incluye" || normalized.startsWith("no incluye ");
}

type Props = {
  included: string[];
  typography: RichTextTypography;
};

export function ClassDetailIncludesList({ included, typography }: Props) {
  const lines = parsePlainIncludedLines(included);
  const style = richTextTypographyStyle(normalizeRichTextTypography(typography));

  if (lines === null) {
    return (
      <MarkdownContent
        source={includedMarkdownSource(included)}
        className="class-detail__includes-copy class-detail__includes-copy--plain-list"
        style={style}
      />
    );
  }

  if (!lines.length) return null;

  return (
    <ul className="class-detail__includes-lines" style={style}>
      {lines.map((line, index) => (
        <li
          key={`${index}-${line.slice(0, 32)}`}
          className={isNoIncluyeDivider(line) ? "class-detail__includes-lines__divider" : undefined}
        >
          {renderInlineMarkdown(line)}
        </li>
      ))}
    </ul>
  );
}
