export type SortKey = "recent" | "old";

export type CategorySearchParams = { q?: string; sort?: string; page?: string };

export const sortLabels: Record<SortKey, string> = {
  recent: "Más recientes",
  old: "Más antiguos",
};

export const OFFERINGS_PAGE_SIZE = 8;

export const OFFERING_LIST_EXCERPT_MAX_LENGTH = 120;

export function normalizeOfferingListText(value: string) {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[`*_>#~]/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;|&#34;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
}

export function truncateOfferingExcerpt(
  value: string | null | undefined,
  maxLength = OFFERING_LIST_EXCERPT_MAX_LENGTH,
  fallback = "Sin descripción corta.",
) {
  const normalized = normalizeOfferingListText(value ?? "");
  if (!normalized) return fallback;
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength).trimEnd()}...`;
}

export function isSortKey(value: string): value is SortKey {
  return value === "recent" || value === "old";
}

export function buildCategoryHref(
  basePath: string,
  params: { q?: string; sort?: SortKey; page?: number },
) {
  const search = new URLSearchParams();
  if (params.q) search.set("q", params.q);
  if (params.sort && params.sort !== "recent") search.set("sort", params.sort);
  if (params.page && params.page > 1) search.set("page", String(params.page));
  const query = search.toString();
  return query ? `${basePath}?${query}` : basePath;
}

export function buildPaginationItems(currentPage: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1) as Array<number | "ellipsis">;
  }

  const pages = new Set<number>([1, totalPages, currentPage, currentPage - 1, currentPage + 1]);
  if (currentPage <= 4) {
    pages.add(2);
    pages.add(3);
    pages.add(4);
    pages.add(5);
  }
  if (currentPage >= totalPages - 3) {
    pages.add(totalPages - 1);
    pages.add(totalPages - 2);
    pages.add(totalPages - 3);
    pages.add(totalPages - 4);
  }

  const sorted = Array.from(pages)
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);

  const result: Array<number | "ellipsis"> = [];
  sorted.forEach((page, index) => {
    const previous = sorted[index - 1];
    if (previous && page - previous > 1) result.push("ellipsis");
    result.push(page);
  });
  return result;
}
