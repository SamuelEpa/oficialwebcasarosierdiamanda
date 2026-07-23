import Link from "next/link";
import { buildCategoryHref, buildPaginationItems, type SortKey } from "./utils";

type OfferingsCategoryPaginationProps = {
  basePath: string;
  page: number;
  totalPages: number;
  rawQuery: string;
  sort: SortKey;
};

export function OfferingsCategoryPagination({
  basePath,
  page,
  totalPages,
  rawQuery,
  sort,
}: OfferingsCategoryPaginationProps) {
  if (totalPages <= 1) return null;

  const safePage = Math.min(Math.max(page, 1), totalPages);
  const pages = buildPaginationItems(safePage, totalPages);

  return (
    <nav className="offerings-category-pagination" aria-label="Paginación del listado">
      {safePage > 1 ? (
        <Link
          href={buildCategoryHref(basePath, { q: rawQuery, sort, page: safePage - 1 })}
          className="offerings-category-pagination__item offerings-category-pagination__arrow"
          aria-label="Página anterior"
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            chevron_left
          </span>
        </Link>
      ) : (
        <span
          className="offerings-category-pagination__item offerings-category-pagination__arrow is-disabled"
          aria-hidden="true"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </span>
      )}

      {pages.map((item, index) =>
        item === "ellipsis" ? (
          <span className="offerings-category-pagination__ellipsis" key={`ellipsis-${index}`}>
            …
          </span>
        ) : (
          <Link
            key={item}
            href={buildCategoryHref(basePath, { q: rawQuery, sort, page: item })}
            className={`offerings-category-pagination__item${item === safePage ? " is-active" : ""}`}
            aria-current={item === safePage ? "page" : undefined}
          >
            {item}
          </Link>
        ),
      )}

      {safePage < totalPages ? (
        <Link
          href={buildCategoryHref(basePath, { q: rawQuery, sort, page: safePage + 1 })}
          className="offerings-category-pagination__item offerings-category-pagination__arrow"
          aria-label="Página siguiente"
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            chevron_right
          </span>
        </Link>
      ) : (
        <span
          className="offerings-category-pagination__item offerings-category-pagination__arrow is-disabled"
          aria-hidden="true"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </span>
      )}
    </nav>
  );
}
