import { MarkdownContent } from "@/components/ui/MarkdownContent";
import { richTextTypographyStyle } from "@/lib/cms/rich-text-typography";
import type { StudioIntroView } from "../../types";

export function StudioEditorialIntroView({ intro }: { intro: StudioIntroView }) {
  if (!intro.heading.trim() && !intro.body.trim()) return null;

  return (
    <header className="studio-editorial-split__intro">
      {intro.heading.trim() ? (
        <MarkdownContent
          className="studio-editorial-split__heading"
          source={intro.heading}
        />
      ) : null}
      {intro.body.trim() ? (
        <MarkdownContent
          className="studio-editorial-split__lede"
          source={intro.body}
          style={richTextTypographyStyle(intro.bodyTypography)}
        />
      ) : null}
    </header>
  );
}
