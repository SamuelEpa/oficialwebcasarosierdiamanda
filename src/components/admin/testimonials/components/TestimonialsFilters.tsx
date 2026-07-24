import Link from "@/components/admin/AdminLink";
import type { TestimonialFilter, TestimonialFilterValue } from "../types";

export function TestimonialsFilters({
  filters,
  status,
}: {
  filters: readonly TestimonialFilter[];
  status: TestimonialFilterValue;
}) {
  return (
    <div className="filters testimonials-admin-filters">
      <div className="filter-group" role="tablist" aria-label="Filtrar testimonios por estado">
        {filters.map((filter) => {
          const active = filter.value === status;
          return (
            <Link
              key={filter.value}
              className={active ? "chip active" : "chip"}
              href={filter.href}
              role="tab"
              aria-selected={active}
            >
              {filter.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
