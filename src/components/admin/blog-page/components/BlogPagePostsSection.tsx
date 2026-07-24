"use client";

import { memo } from "react";
import Link from "@/components/admin/AdminLink";
import Button from "@/components/ui/Button";
import { SectionCard } from "@/components/admin/class-edit/components/SectionCard";
import { BITACORA_CREATE_PATH } from "@/lib/admin/bitacora-actions";
import type { BlogPost } from "@/lib/cms/types";
import { BlogPagePostsTable } from "./BlogPagePostsTable";
import { useBlogPostsSection, type BlogPostsStatusFilter } from "../hooks/useBlogPostsSection";

const FILTER_OPTIONS: Array<{ key: BlogPostsStatusFilter; label: string }> = [
  { key: "all", label: "Todas" },
  { key: "published", label: "Publicadas" },
  { key: "draft", label: "Borradores" },
  { key: "archived", label: "Archivadas" },
];

function BlogPagePostsSectionComponent({
  visiblePosts,
  onPostUpdated,
  onPostRemoved,
}: {
  visiblePosts: BlogPost[];
  onPostUpdated?: (id: string, post: unknown, fallbackPatch?: Partial<BlogPost>) => void;
  onPostRemoved?: (id: string) => void;
}) {
  const { query, setQuery, statusFilter, setStatusFilter, stats, filteredPosts } = useBlogPostsSection(visiblePosts);

  return (
    <SectionCard
      title="Bitácoras"
      description="Gestiona entradas, orden y publicación. Las publicadas aparecen en la vista previa y en el sitio."
      action={
        <Button href={BITACORA_CREATE_PATH} variant="solid" className="primary-btn shrink-0">
          Crear bitácora
        </Button>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total", value: stats.total },
            { label: "Publicadas", value: stats.published },
            { label: "Borradores", value: stats.draft },
            { label: "Destacadas", value: stats.featured },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-outline-variant/60 bg-surface-container-low px-4 py-3"
            >
              <p className="text-label-md text-on-surface-variant">{item.label}</p>
              <p className="text-headline-sm font-bold text-on-surface">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative block min-w-0 flex-1 lg:max-w-md">
            <span className="sr-only">Buscar bitácoras</span>
            <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
              search
            </span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por título, categoría o slug…"
              className="block w-full rounded-xl border border-outline-variant bg-surface-container-lowest py-2.5 pl-10 pr-4 text-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-secondary-container"
            />
          </label>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por estado">
            {FILTER_OPTIONS.map((option) => (
              <button
                key={option.key}
                type="button"
                className={`rounded-full px-3 py-1.5 text-label-md font-semibold transition-colors ${
                  statusFilter === option.key
                    ? "bg-secondary text-on-secondary"
                    : "bg-surface-container-high text-on-surface-variant hover:text-on-surface"
                }`}
                onClick={() => setStatusFilter(option.key)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {visiblePosts.length === 0 ? (
          <div className="empty-inline rounded-2xl border border-dashed border-outline-variant bg-surface-container-low p-8 text-center">
            <strong>Aún no hay artículos.</strong>
            <span className="mt-1 block text-on-surface-variant">Crea la primera entrada de la bitácora.</span>
            <Link className="primary-btn mt-4 inline-flex" href={BITACORA_CREATE_PATH}>
              Crear bitácora
            </Link>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-outline-variant bg-surface-container-low p-8 text-center">
            <p className="text-body-md font-semibold text-on-surface">No hay resultados</p>
            <p className="mt-1 text-label-md text-on-surface-variant">Prueba otro término o cambia el filtro de estado.</p>
            <Button type="button" variant="ghost" className="mt-4" onClick={() => { setQuery(""); setStatusFilter("all"); }}>
              Limpiar filtros
            </Button>
          </div>
        ) : (
          <BlogPagePostsTable
            items={filteredPosts}
            showDuplicate={false}
            showArchive={false}
            onPostUpdated={onPostUpdated}
            onPostRemoved={onPostRemoved}
          />
        )}
      </div>
    </SectionCard>
  );
}

export const BlogPagePostsSection = memo(BlogPagePostsSectionComponent);
