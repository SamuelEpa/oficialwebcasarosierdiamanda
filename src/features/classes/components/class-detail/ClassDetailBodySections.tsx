import { Accordion } from "@/components/collections/Accordion";
import { MarkdownContent } from "@/components/ui/MarkdownContent";
import type { ExperienceItem } from "@/data/types";
import {
  DEFAULT_DESCRIPTION_TYPOGRAPHY,
  DEFAULT_RICH_TEXT_TYPOGRAPHY,
  normalizeRichTextTypography,
  richTextTypographyStyle,
} from "@/lib/cms/rich-text-typography";
import { ClassDetailIncludesList } from "./ClassDetailIncludesList";

type Props = {
  item: ExperienceItem;
  showIncluded: boolean;
  hasLearningContent: boolean;
  hasParticipationContent: boolean;
  showProgram: boolean;
  programItems: ExperienceItem["program"];
};

export function ClassDetailBodySections({
  item,
  showIncluded,
  hasLearningContent,
  hasParticipationContent,
  showProgram,
  programItems,
}: Props) {
  return (
    <div className="class-detail__body-stack">
      {showIncluded ? (
        <section className="class-detail__includes class-detail__includes--editorial">
          <h2>Incluye</h2>
          <ClassDetailIncludesList
            included={item.included}
            typography={item.includedTypography ?? { ...DEFAULT_RICH_TEXT_TYPOGRAPHY, fontSize: 16 }}
          />
        </section>
      ) : null}

      {hasLearningContent ? (
        <section className="class-detail__text-block">
          <h2>{item.learningSectionTitle || "Que aprendes..."}</h2>
          <MarkdownContent
            source={item.whatYouWillLearn}
            className="class-detail__content-copy"
            style={richTextTypographyStyle(
              normalizeRichTextTypography(item.whatYouWillLearnTypography ?? DEFAULT_DESCRIPTION_TYPOGRAPHY),
            )}
          />
        </section>
      ) : null}

      {hasParticipationContent ? (
        <section className="class-detail__text-block">
          <h2>{item.participationSectionTitle || "Quien puede ser"}</h2>
          <MarkdownContent
            source={item.whoCanJoin}
            className="class-detail__content-copy"
            style={richTextTypographyStyle(
              normalizeRichTextTypography(item.whoCanJoinTypography ?? DEFAULT_DESCRIPTION_TYPOGRAPHY),
            )}
          />
        </section>
      ) : null}

      {showProgram ? (
        <section className="class-detail__program">
          <h2>{item.programSectionTitle || "Silabus del curso"}</h2>
          <Accordion items={programItems} />
        </section>
      ) : null}
    </div>
  );
}
