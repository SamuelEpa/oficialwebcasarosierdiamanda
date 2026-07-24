"use client";

import type { PaginationItem } from "../utils/pagination";

type Props = {
  page: number;
  totalPages: number;
  pages: PaginationItem[];
  onPageChange: (page: number) => void;
};

export function ShopPagination({ page, totalPages, pages, onPageChange }: Props) {
  return (
    <nav className="shop-pagination" aria-label="Paginación de shop">
      <button
        type="button"
        className="shop-pagination__item shop-pagination__arrow"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Página anterior"
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          chevron_left
        </span>
      </button>
      {pages.map((item, index) =>
        item === "ellipsis" ? (
          <span className="shop-pagination__ellipsis" key={`ellipsis-${index}`}>
            ...
          </span>
        ) : (
          <button
            type="button"
            key={item}
            className={`shop-pagination__item${item === page ? " is-active" : ""}`}
            disabled={item === page}
            onClick={() => onPageChange(item)}
            aria-current={item === page ? "page" : undefined}
          >
            {item}
          </button>
        ),
      )}
      <button
        type="button"
        className="shop-pagination__item shop-pagination__arrow"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        aria-label="Página siguiente"
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          chevron_right
        </span>
      </button>
    </nav>
  );
}
