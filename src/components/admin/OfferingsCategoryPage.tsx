import AdminShell from "@/components/admin/AdminShell";
import ClassOfferingsTable from "@/components/admin/ClassOfferingsTable";
import { OfferingsCategoryPagination } from "@/components/admin/offerings-category/OfferingsCategoryPagination";
import { OfferingsCategoryStats } from "@/components/admin/offerings-category/OfferingsCategoryStats";
import { OfferingsCategoryToolbar } from "@/components/admin/offerings-category/OfferingsCategoryToolbar";
import {
  isSortKey,
  OFFERINGS_PAGE_SIZE,
  type CategorySearchParams,
  type SortKey,
} from "@/components/admin/offerings-category/utils";
import TopBar from "@/components/layout/TopBar";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import { getOfferingsPage } from "@/lib/cms/offerings";
import type { OfferingType } from "@/lib/cms/types";

export default async function OfferingsCategoryPage({
  title,
  subtitle,
  type,
  basePath,
  typeLabel,
  emptyIcon,
  emptyTitle,
  emptyDescription,
  createLabel,
  searchParams,
}: {
  title: string;
  subtitle: string;
  type: OfferingType;
  basePath: string;
  typeLabel: string;
  emptyIcon: string;
  emptyTitle: string;
  emptyDescription: string;
  createLabel: string;
  searchParams?: CategorySearchParams | Promise<CategorySearchParams>;
}) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const rawQuery = (resolvedSearchParams.q ?? "").trim();
  const q = rawQuery.toLowerCase();
  const rawSort = resolvedSearchParams.sort ?? "";
  const sort: SortKey = isSortKey(rawSort) ? rawSort : "recent";
  const page = Math.max(1, Number(resolvedSearchParams?.page ?? 1) || 1);
  const hasSearch = Boolean(q);

  const resultPromise = getOfferingsPage({
    type,
    status: ["draft", "published"],
    q: rawQuery,
    sort,
    page,
    pageSize: OFFERINGS_PAGE_SIZE,
  });

  const statsPromise = hasSearch
    ? null
    : Promise.all([
        getOfferingsPage({ type, status: "published", page: 1, pageSize: 1 }),
        getOfferingsPage({ type, status: "draft", page: 1, pageSize: 1 }),
      ]);

  const [result, stats] = await Promise.all([resultPromise, statsPromise]);

  const currentPage = result.page;
  const totalPages = result.totalPages;
  const visible = result.items;
  const hasAnyItems = result.total > 0;
  const publishedTotal = stats?.[0].total ?? 0;
  const draftTotal = stats?.[1].total ?? 0;

  return (
    <AdminShell>
      <TopBar
        title={title}
        subtitle={subtitle}
        actions={
          <Button href={`${basePath}/new`} icon="add">
            {createLabel}
          </Button>
        }
      />

      <div className="offerings-category-layout">
        {hasAnyItems ? (
          <OfferingsCategoryStats
            total={result.total}
            published={publishedTotal}
            draft={draftTotal}
            typeLabel={typeLabel}
            isFiltered={hasSearch}
          />
        ) : null}

        <OfferingsCategoryToolbar
          basePath={basePath}
          title={title}
          rawQuery={rawQuery}
          sort={sort}
          total={result.total}
          page={currentPage}
          pageSize={OFFERINGS_PAGE_SIZE}
          visibleCount={visible.length}
        />

        {visible.length ? (
          <Card padding="none" className="offerings-category-table-card">
            <ClassOfferingsTable offerings={visible} basePath={basePath} typeLabel={typeLabel} />
            <OfferingsCategoryPagination
              basePath={basePath}
              page={currentPage}
              totalPages={totalPages}
              rawQuery={rawQuery}
              sort={sort}
            />
          </Card>
        ) : (
          <Card padding="lg" className="offerings-category-empty-card">
            <EmptyState
              icon={emptyIcon}
              title={hasAnyItems && hasSearch ? "No se encontraron resultados." : emptyTitle}
              description={hasAnyItems && hasSearch ? "Prueba con otra búsqueda o limpia el filtro." : emptyDescription}
              action={
                <Button href={`${basePath}/new`} icon="add">
                  {createLabel}
                </Button>
              }
            />
          </Card>
        )}
      </div>
    </AdminShell>
  );
}
