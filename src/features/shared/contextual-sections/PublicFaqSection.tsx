import { MarkdownContent } from "@/components/ui/MarkdownContent";
import type { Faq, FaqGroup, PageFaqSection, PublicFaqBlock } from "@/lib/cms/types";

type Props = {
  block?: PublicFaqBlock | null;
  group?: FaqGroup | null;
  faqs?: Faq[];
  title?: string;
  pageSection?: PageFaqSection | null;
  eyebrow?: string;
  className?: string;
};

export default function PublicFaqSection({
  block,
  group,
  faqs,
  title,
  eyebrow = "FAQ",
  className,
}: Props) {
  const selectedGroup = block?.group ?? group ?? null;
  const items = block?.faqs ?? faqs ?? [];
  if (!items.length) return null;

  const groups = items.reduce<Record<string, Faq[]>>((acc, faq) => {
    const topic = faq.topic_title?.trim() || "General";
    acc[topic] = acc[topic] ?? [];
    acc[topic].push(faq);
    return acc;
  }, {});
  const topicEntries = Object.entries(groups);
  const sectionClassName = ["public-faq", "section", className].filter(Boolean).join(" ");

  return (
    <section className={sectionClassName} aria-labelledby="public-faq-title">
      <div className="container public-faq__container">
        <div className="public-faq__head">
          <p>{eyebrow}</p>
          <h2 id="public-faq-title">{title || selectedGroup?.title || "Preguntas frecuentes"}</h2>
          {selectedGroup?.description ? (
            <div className="public-faq__description">{selectedGroup.description}</div>
          ) : null}
        </div>
        <div className="public-faq__topics">
          {topicEntries.map(([topic, topicFaqs]) => (
            <div className="public-faq__topic" key={topic}>
              <h3>{topic}</h3>
              <div className="public-faq__list">
                {topicFaqs.map((faq) => (
                  <details className="public-faq__item" key={faq.id}>
                    <summary>{faq.question}</summary>
                    <MarkdownContent className="public-faq__answer" source={faq.answer || ""} />
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
