export type PaginationItem = number | "ellipsis";

export function buildPages(currentPage: number, totalPages: number): PaginationItem[] {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, index) => index + 1);

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

  const result: PaginationItem[] = [];
  sorted.forEach((page, index) => {
    const previous = sorted[index - 1];
    if (previous && page - previous > 1) result.push("ellipsis");
    result.push(page);
  });
  return result;
}
