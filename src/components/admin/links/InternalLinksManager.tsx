"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import type { InternalLink } from "@/lib/cms/types";

type LinkDraft = {
  label: string;
  url: string;
  description: string;
};

export default function InternalLinksManager({ items }: { items: InternalLink[] }) {
  const router = useRouter();

  const sorted = useMemo(
    () => [...items].sort((a, b) => a.sort_order - b.sort_order || a.label.localeCompare(b.label)),
    [items],
  );

  const initialDrafts = useMemo(() => {
    return Object.fromEntries(
      sorted.map((item) => [
        item.id,
        { label: item.label, url: item.url, description: item.description },
      ]),
    ) as Record<string, LinkDraft>;
  }, [sorted]);

  const [drafts, setDrafts] = useState(initialDrafts);
  const [newLink, setNewLink] = useState<LinkDraft>({ label: "", url: "", description: "" });
  const [busyId, setBusyId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateDraft(id: string, field: keyof LinkDraft, value: string) {
    setDrafts((current) => ({
      ...current,
      [id]: { ...current[id], [field]: value },
    }));
  }

  function isDirty(item: InternalLink) {
    const draft = drafts[item.id];
    if (!draft) return false;
    return draft.label !== item.label || draft.url !== item.url || draft.description !== item.description;
  }

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

  async function save(item: InternalLink) {
    const draft = drafts[item.id];
    if (!draft) return;
    const label = draft.label.trim();
    const url = normalizeLinkUrl(draft.url);

    setError(null);
    if (!label || !url) {
      setError("La etiqueta y la URL son obligatorias.");
      return;
    }

    setBusyId(item.id);
    const response = await fetch(`/api/admin/links/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label, url, description: draft.description.trim() }),
    });

    if (response.ok) {
      router.refresh();
    } else {
      const data = await response.json().catch(() => ({ error: "No se pudo guardar el link." }));
      setError(data.error || "No se pudo guardar el link.");
    }
    setBusyId(null);
  }

  async function toggleActive(item: InternalLink) {
    setBusyId(item.id);
    setError(null);
    const response = await fetch(`/api/admin/links/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "toggle_active" }),
    });
    if (!response.ok) {
      const data = await response.json().catch(() => ({ error: "No se pudo actualizar el estado." }));
      setError(data.error || "No se pudo actualizar el estado.");
    } else {
      router.refresh();
    }
    setBusyId(null);
  }

  async function remove(id: string) {
    const confirmed = window.confirm("¿Eliminar este link externo?");
    if (!confirmed) return;
    setBusyId(id);
    setError(null);
    const response = await fetch(`/api/admin/links/${id}`, { method: "DELETE" });
    if (!response.ok) {
      const data = await response.json().catch(() => ({ error: "No se pudo eliminar el link." }));
      setError(data.error || "No se pudo eliminar el link.");
    } else {
      router.refresh();
    }
    setBusyId(null);
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-6">
        <p className="auth-kicker">Configuración</p>
        <h2 className="text-title-lg font-bold text-on-surface">Links externos</h2>
        <p className="muted">Enlaces de uso interno del CMS. Al pulsar «Abrir» se abren en una pestaña nueva.</p>
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
          sorted.map((item) => {
            const draft = drafts[item.id] ?? { label: item.label, url: item.url, description: item.description };
            const dirty = isDirty(item);
            return (
              <div
                key={item.id}
                className="rounded-xl border border-outline-variant bg-white p-5 shadow-[0_12px_28px_rgba(11,28,48,0.05)]"
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_1.4fr]">
                  <div>
                    <label className="mb-1 block text-label-sm font-semibold text-on-surface-variant">Etiqueta</label>
                    <input
                      type="text"
                      value={draft.label}
                      onChange={(event) => updateDraft(item.id, "label", event.target.value)}
                      placeholder="Etiqueta"
                      className="admin-marketing-input"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-label-sm font-semibold text-on-surface-variant">URL</label>
                    <input
                      type="text"
                      value={draft.url}
                      onChange={(event) => updateDraft(item.id, "url", event.target.value)}
                      placeholder="https://..."
                      className="admin-marketing-input"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-label-sm font-semibold text-on-surface-variant">Descripción (opcional)</label>
                    <input
                      type="text"
                      value={draft.description}
                      onChange={(event) => updateDraft(item.id, "description", event.target.value)}
                      placeholder="Para qué sirve este enlace"
                      className="admin-marketing-input"
                    />
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-label-sm font-bold text-on-secondary transition-colors hover:bg-secondary/90"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>open_in_new</span>
                    Abrir
                  </a>
                  <label className="inline-flex cursor-pointer items-center gap-2 text-label-sm font-semibold text-on-surface-variant">
                    <input type="checkbox" checked={item.is_active} onChange={() => toggleActive(item)} disabled={busyId === item.id} />
                    Activo
                  </label>
                  {dirty ? (
                    <button type="button" className="primary-btn" onClick={() => save(item)} disabled={busyId === item.id}>
                      {busyId === item.id ? "Guardando..." : "Guardar cambios"}
                    </button>
                  ) : null}
                  <button type="button" className="danger-btn" onClick={() => remove(item.id)} disabled={busyId === item.id}>
                    Eliminar
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}