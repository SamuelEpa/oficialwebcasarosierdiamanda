import type { Faq, FaqGroup } from "@/lib/cms/types";

export function getSelectedFaqBlock(faqs: Faq[], groups: FaqGroup[], groupId: string) {
  if (!groupId) return null;
  const group = groups.find((item) => item.id === groupId && item.status === "published" && item.deleted_at === null);
  if (!group) return null;
  const selectedFaqs = faqs
    .filter((faq) => faq.status === "published" && faq.deleted_at === null && faq.faq_group_id === groupId)
    .sort(
      (a, b) =>
        (a.topic_title || "").localeCompare(b.topic_title || "") ||
        a.sort_order - b.sort_order ||
        a.question.localeCompare(b.question),
    );
  if (!selectedFaqs.length) return null;
  return { group, faqs: selectedFaqs };
}

export function listPublishedFaqGroups(groups: FaqGroup[]) {
  return groups.filter((group) => group.status === "published" && group.deleted_at === null);
}
