"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import type { InternalLink } from "@/lib/cms/types";

export default function InternalLinksManager({ items }: { items: InternalLink[] }) {
  const router = useRouter();

  const sorted = useMemo(
    () => [...items].sort((a, b) => a.sort_order - b.sort_order || a.label.localeCompare(b.label)),
    [items],
  );

  const [newLink, setNewLink] = useState<{ label: string; url: string; description: string }>({ label: "", url: "", description: "" });
  const [isCreating, setIsCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function normalizeLinkUrl(url: string) {
    const trimmed = url.trim();
    if (/^https?:\/\//i.test(trimmed) || /^mailto:/i.test(trimmed)) return trimmed;
    if (/^www\./i.test(trimmed)) return `https://${trimmed}`;
    return trimmed;
  }

  async function create(event: FormEvent) {
    event.preventDefault();
    const label = newLink.label.trim();
    const url = normalizeLinkUrl(newLink.url);

    setError(null);
    if (!label || !url) {
      setError("La etiqueta y la URL son obligatorias.");
      return;
    }

    setIsCreating(true);
    const response = await fetch("/api/admin/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label, url, description: newLink.description.trim() }),
    });

    if (response.ok) {
      setNewLink({ label: "", url: "", description: "" });
      router.refresh();
    } else {
      const data = await response.json().catch(() => ({ error: "No se pudo crear el link." }));
      setError(data.error || "No se pudo crear el link.");
    }
    setIsCreating(false);
  }

  async function remove(id: string) {
    const confirmed = window.confirm("¿Eliminar este link externo?");
    if (!confirmed) return;
    setDeletingId(id);
    setError(null);
    const response = await fetch(`/api/admin/links/${id}`, { method: "DELETE" });
    if (!response.ok) {
      const data = await response.json().catch(() => ({ error: "No se pudo eliminar el link." }));
      setError(data.error || "No se pudo eliminar el link.");
    } else {
      router.refresh();
    }
    setDeletingId(null);
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-6">
        <p className="auth-kicker">Configuración</p>
        <h2 className="text-title-lg font-bold text-on-surface">Links externos</h2>
        <p className="muted">Enlaces de uso interno del CMS. Al pulsar un link se abre en una pestaña nueva.</p>
      </div>

      <section className="rounded-xl border border-outline-variant bg-white p-5 shadow-[0_12px_28px_rgba(11,28,48,0.05)]">
        <h3 className="text-title-md font-bold text-on-surface">Añadir link</h3>
        <form onSubmit={create} className="mt-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-label-sm font-semibold text-on-surface-variant">Etiqueta</label>
              <input
                type="text"
                value={newLink.label}
                onChange={(event) => setNewLink({ ...newLink, label: event.target.value })}
                placeholder="Nombre que identifica el link"
                className="admin-marketing-input"
              />
            </div>
            <div>
              <label className="mb-1 block text-label-sm font-semibold text-on-surface-variant">URL</label>
              <input
                type="text"
                value={newLink.url}
                onChange={(event) => setNewLink({ ...newLink, url: event.target.value })}
                placeholder="https://..."
                className="admin-marketing-input"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-label-sm font-semibold text-on-surface-variant">Descripción (opcional)</label>
              <input
                type="text"
                value={newLink.description}
                onChange={(event) => setNewLink({ ...newLink, description: event.target.value })}
                placeholder="Para qué sirve este enlace"
                className="admin-marketing-input"
              />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <button type="submit" className="primary-btn" disabled={isCreating}>
              {isCreating ? "Guardando..." : "Añadir link"}
            </button>
            {error ? <p className="form-error m-0">{error}</p> : null}
          </div>
        </form>
      </section>

      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-title-md font-bold text-on-surface">Links guardados</h3>
          <span className="entity-badge">{sorted.length} links</span>
        </div>

        {sorted.length === 0 ? (
          <div className="rounded-xl border border-dashed border-outline-variant bg-white p-8 text-center">
            <p className="muted">No hay links externos. Añade el primero arriba.</p>
          </div>
        ) : (
          sorted.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-outline-variant bg-white p-5 shadow-[0_12px_28px_rgba(11,28,48,0.05)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-label-md font-bold text-secondary underline-offset-4 hover:underline"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>open_in_new</span>
                    {item.label}
                  </a>
                  {item.description ? <p className="muted mt-1">{item.description}</p> : null}
                  <p className="mt-1 truncate text-body-sm text-on-surface-variant">{item.url}</p>
                </div>
                <button
                  type="button"
                  onClick={() => remove(item.id)}
                  disabled={deletingId === item.id}
                  aria-label="Eliminar link"
                  title="Eliminar link"
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-red-600"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 20 }}>delete</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}