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
      <div className="container public-faq__container w-[min(100%-32px,980px)] mx-auto grid grid-cols-[minmax(180px,0.38fr)_minmax(0,0.62fr)] gap-[clamp(28px,6vw,72px)] max-[760px]:grid-cols-1 max-[760px]:gap-5.5">
        <div className="public-faq__head min-w-0">
          <p className="mb-2.5 text-[#8b6f4d] text-xs font-bold tracking-normal uppercase">{eyebrow}</p>
          <h2 id="public-faq-title" className="m-0 max-w-[11ch] [font-family:var(--font-display),Georgia,serif] text-[clamp(34px,5vw,58px)] font-normal leading-[0.98] max-[760px]:max-w-full">{title || selectedGroup?.title || "Preguntas frecuentes"}</h2>
          {selectedGroup?.description ? (
            <div className="public-faq__description max-w-[32ch] mt-4 text-[#6c5e51] text-[clamp(14px,1.5vw,16px)] leading-[1.55]">{selectedGroup.description}</div>
          ) : null}
        </div>
        <div className="public-faq__topics min-w-0 grid gap-7">
          {topicEntries.map(([topic, topicFaqs]) => (
            <div className="public-faq__topic" key={topic}>
              <h3 className="m-0 mb-3 text-[#6d583e] text-[clamp(16px,2vw,20px)] font-bold leading-[1.2]">{topic}</h3>
              <div className="public-faq__list grid border-t border-[rgba(67,55,43,0.2)]">
                {topicFaqs.map((faq) => (
                  <details className="public-faq__item border-b border-[rgba(67,55,43,0.2)]" key={faq.id}>
                    <summary className="public-faq__summary min-h-16 flex items-center justify-between gap-4.5 cursor-pointer text-[#332c24] text-[clamp(17px,2vw,22px)] font-semibold leading-tight list-none max-[760px]:min-h-14.5">{faq.question}</summary>
                    <MarkdownContent className="public-faq__answer max-w-[64ch] pr-10.5 pb-6 text-[#5d5145] text-[clamp(15px,1.6vw,17px)] leading-[1.65] max-[760px]:pr-7" source={faq.answer || ""} />
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
