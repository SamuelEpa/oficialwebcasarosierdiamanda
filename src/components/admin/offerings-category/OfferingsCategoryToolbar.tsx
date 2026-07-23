import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { buildCategoryHref, sortLabels, type SortKey } from "./utils";

type OfferingsCategoryToolbarProps = {
  basePath: string;
  title: string;
  rawQuery: string;
  sort: SortKey;
  total: number;
  page: number;
  pageSize: number;
  visibleCount: number;
};

export function OfferingsCategoryToolbar({
  basePath,
  title,
  rawQuery,
  sort,
  total,
  page,
  pageSize,
  visibleCount,
}: OfferingsCategoryToolbarProps) {
  const rangeStart = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const rangeEnd = total === 0 ? 0 : rangeStart + visibleCount - 1;

  return (
    <Card padding="md" className="offerings-category-toolbar">
      <form method="get" className="offerings-category-toolbar__search">
        <input type="hidden" name="sort" value={sort} />
        <label className="offerings-category-toolbar__search-label" htmlFor="offerings-category-q">
          Buscar
        </label>
        <div className="offerings-category-toolbar__search-row">
          <span className="offerings-category-toolbar__search-icon material-symbols-outlined" aria-hidden="true">
            search
          </span>
          <input
            id="offerings-category-q"
            name="q"
            defaultValue={rawQuery}
            placeholder={`Buscar ${title.toLowerCase()} por título, slug o descripción...`}
            className="offerings-category-toolbar__search-input"
            autoComplete="off"
          />
          <Button type="submit" variant="solid" size="sm">
            Buscar
          </Button>
        </div>
      </form>

      <div className="offerings-category-toolbar__meta">
        <p className="offerings-category-toolbar__count" aria-live="polite">
          {total === 0 ? (
            "Sin resultados"
          ) : (
            <>
              Mostrando <strong>{rangeStart}–{rangeEnd}</strong> de <strong>{total}</strong>
            </>
          )}
        </p>

        <div className="offerings-category-toolbar__sort" role="group" aria-label="Ordenar listado">
          <span className="offerings-category-toolbar__sort-label">Ordenar</span>
          {(Object.entries(sortLabels) as [SortKey, string][]).map(([key, label]) => (
            <Button
              key={key}
              href={buildCategoryHref(basePath, { q: rawQuery, sort: key, page: 1 })}
              variant={sort === key ? "solid" : "ghost"}
              size="sm"
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
}
