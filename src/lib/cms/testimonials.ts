import { randomUUID } from "crypto";
import { createAdminClient } from "../supabase/admin";
import { addTrashItem, getCurrentUserEmail, getTrashItemByEntity, removeTrashItem } from "./trash";
import { readJsonFile, writeJsonFile } from "./local-storage";
import { isTestimonialStatus } from "./types";
import type { Testimonial, TestimonialStatus } from "./types";
import { logAction } from "./history-logs";

const TABLE = "testimonials";
const FILE_NAME = "testimonials.json";
const SUPABASE_READ_TIMEOUT_MS = 1_500;
const TESTIMONIALS_CACHE_TTL_MS = 15_000;

type Input = Partial<Omit<Testimonial, "id" | "created_at" | "updated_at" | "deleted_at">> & {
  id?: string;
  deleted_at?: string | null;
};

export type TestimonialAdminStatusFilter = "all" | "draft" | "published";

let testimonialsCache: { items: Testimonial[]; expiresAt: number } | null = null;

export function invalidateTestimonialsCache() {
  testimonialsCache = null;
}

function getCachedTestimonials() {
  if (!testimonialsCache || testimonialsCache.expiresAt <= Date.now()) return null;
  return testimonialsCache.items;
}

function cacheTestimonials(items: Testimonial[]) {
  testimonialsCache = { items, expiresAt: Date.now() + TESTIMONIALS_CACHE_TTL_MS };
}

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number, fallback: T) {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      promise.catch(() => fallback).finally(() => {
        if (timeout) clearTimeout(timeout);
      }),
      new Promise<T>((resolve) => {
        timeout = setTimeout(() => resolve(fallback), timeoutMs);
      }),
    ]);
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}

function normalize(input: Input, existing?: Testimonial) {
  const name = String(input.name ?? existing?.name ?? "").trim();
  const status = input.status ?? existing?.status ?? "draft";
  const now = new Date().toISOString();
  if (!name) throw new Error("El nombre es obligatorio.");
  if (!isTestimonialStatus(status)) throw new Error("Estado no válido.");
  return {
    id: existing?.id ?? input.id ?? randomUUID(),
    name,
    role: String(input.role ?? existing?.role ?? "").trim(),
    text: String(input.text ?? existing?.text ?? "").trim(),
    avatar_id: String(input.avatar_id ?? existing?.avatar_id ?? "").trim(),
    status,
    sort_order: Number(input.sort_order ?? existing?.sort_order ?? 0),
    is_featured: input.is_featured !== undefined ? Boolean(input.is_featured) : (existing?.is_featured ?? false),
    created_at: existing?.created_at ?? now,
    updated_at: now,
    deleted_at: status === "deleted" ? existing?.deleted_at ?? now : null,
  } satisfies Testimonial;
}

function rowToTestimonial(row: Record<string, unknown>): Testimonial {
  return {
    id: String(row.id),
    name: String(row.name ?? ""),
    role: String(row.role ?? ""),
    text: String(row.text ?? ""),
    avatar_id: String(row.avatar_id ?? ""),
    status: isTestimonialStatus(row.status) ? row.status : "draft",
    sort_order: Number(row.sort_order ?? 0),
    is_featured: Boolean(row.is_featured),
    created_at: String(row.created_at ?? new Date().toISOString()),
    updated_at: String(row.updated_at ?? new Date().toISOString()),
    deleted_at: row.deleted_at == null ? null : String(row.deleted_at),
  };
}

function testimonialToRow(t: Testimonial): Record<string, unknown> {
  return {
    id: t.id,
    name: t.name,
    role: t.role,
    text: t.text,
    avatar_id: t.avatar_id,
    status: t.status,
    sort_order: t.sort_order,
    is_featured: t.is_featured,
    created_at: t.created_at,
    updated_at: t.updated_at,
    deleted_at: t.deleted_at,
  };
}

function sortTestimonials(items: Testimonial[]) {
  return [...items].sort(
    (a, b) => a.sort_order - b.sort_order || +new Date(b.updated_at) - +new Date(a.updated_at),
  );
}

function isActiveAdminItem(item: Testimonial) {
  return item.status !== "deleted" && item.status !== "archived" && item.deleted_at == null;
}

async function readAllFromSupabase(): Promise<Testimonial[] | null> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .order("sort_order", { ascending: true })
      .order("updated_at", { ascending: false });
    if (error) throw error;
    if (!data) return null;
    return (data as Array<Record<string, unknown>>).map(rowToTestimonial);
  } catch {
    return null;
  }
}

async function upsertTestimonial(t: Testimonial): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase.from(TABLE).upsert(testimonialToRow(t), { onConflict: "id" });
  if (error) throw error;
}

async function seedSupabase(items: Testimonial[]): Promise<void> {
  if (items.length === 0) return;
  try {
    const supabase = createAdminClient();
    await supabase.from(TABLE).upsert(items.map(testimonialToRow), { onConflict: "id" });
  } catch {
    /* best-effort */
  }
}

async function deleteTestimonialFromDb(id: string): Promise<void> {
  try {
    const supabase = createAdminClient();
    await supabase.from(TABLE).delete().eq("id", id);
  } catch {
    /* best-effort */
  }
}

async function persistAll(items: Testimonial[]) {
  await writeJsonFile(FILE_NAME, items);
  cacheTestimonials(items);
}

async function loadAll(): Promise<Testimonial[]> {
  const cached = getCachedTestimonials();
  if (cached) return cached;

  const fromSupabase = await withTimeout(readAllFromSupabase(), SUPABASE_READ_TIMEOUT_MS, null);
  if (fromSupabase) {
    cacheTestimonials(fromSupabase);
    return fromSupabase;
  }

  const localTestimonials = await readJsonFile<Testimonial[]>(FILE_NAME, []);
  await seedSupabase(localTestimonials);
  cacheTestimonials(localTestimonials);
  return localTestimonials;
}

export async function getTestimonials() {
  return loadAll();
}

export async function listAdminTestimonials(status: TestimonialAdminStatusFilter = "all") {
  const items = await loadAll();
  return sortTestimonials(
    items
      .filter(isActiveAdminItem)
      .filter((item) => status === "all" || item.status === status),
  );
}

export async function getTestimonialById(id: string) {
  const cached = getCachedTestimonials()?.find((item) => item.id === id);
  if (cached) return cached;

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase.from(TABLE).select("*").eq("id", id).maybeSingle();
    if (!error && data) return rowToTestimonial(data as Record<string, unknown>);
  } catch {
    /* fall through */
  }

  const all = await readJsonFile<Testimonial[]>(FILE_NAME, []);
  const localTestimonial = all.find((x) => x.id === id) ?? null;
  if (localTestimonial) await seedSupabase([localTestimonial]);
  return localTestimonial;
}

export async function createTestimonial(data: Input) {
  invalidateTestimonialsCache();
  const all = await loadAll();
  const next = normalize({
    ...data,
    sort_order: data.sort_order ?? all.filter(isActiveAdminItem).length,
  });
  const items = sortTestimonials([next, ...all]);
  await persistAll(items);
  await upsertTestimonial(next);
  await logAction({
    action: "create",
    entity_type: "testimonial",
    entity_id: next.id,
    entity_title: next.name,
    new_data: next,
  });
  return next;
}

export async function updateTestimonial(id: string, data: Input) {
  invalidateTestimonialsCache();
  const all = await loadAll();
  const idx = all.findIndex((x) => x.id === id);
  if (idx === -1) return null;
  const old = all[idx];
  const next = normalize(data, old);
  all[idx] = next;
  await persistAll(all);
  await upsertTestimonial(next);

  if (old.status !== next.status) {
    if (next.status === "published") {
      await logAction({
        action: "publish",
        entity_type: "testimonial",
        entity_id: next.id,
        entity_title: next.name,
        old_data: old,
        new_data: next,
      });
    } else if (old.status === "published") {
      await logAction({
        action: "unpublish",
        entity_type: "testimonial",
        entity_id: next.id,
        entity_title: next.name,
        old_data: old,
        new_data: next,
      });
    } else {
      await logAction({
        action: "update",
        entity_type: "testimonial",
        entity_id: next.id,
        entity_title: next.name,
        old_data: old,
        new_data: next,
      });
    }
  } else {
    await logAction({
      action: "update",
      entity_type: "testimonial",
      entity_id: next.id,
      entity_title: next.name,
      old_data: old,
      new_data: next,
    });
  }

  return next;
}

export async function setTestimonialStatus(id: string, status: TestimonialStatus) {
  return updateTestimonial(id, { status });
}

export async function reorderTestimonials(orderedIds: string[]) {
  invalidateTestimonialsCache();
  const all = await loadAll();
  const now = new Date().toISOString();
  const byId = new Map(all.map((item) => [item.id, item]));
  const ordered = orderedIds.map((id) => byId.get(id)).filter(Boolean) as Testimonial[];
  const orderedSet = new Set(ordered.map((item) => item.id));
  const rest = all
    .filter((item) => !orderedSet.has(item.id))
    .sort((a, b) => a.sort_order - b.sort_order || +new Date(b.updated_at) - +new Date(a.updated_at));

  let changed = false;
  const next = [...ordered, ...rest].map((item, index) => {
    if (item.sort_order === index) return item;
    changed = true;
    return { ...item, sort_order: index, updated_at: now };
  });

  if (!changed) return next;

  await persistAll(next);

  try {
    const supabase = createAdminClient();
    const changedRows = next.filter((item) => {
      const previous = byId.get(item.id);
      return !previous || previous.sort_order !== item.sort_order || previous.updated_at !== item.updated_at;
    });
    if (changedRows.length) {
      const { error } = await supabase
        .from(TABLE)
        .upsert(changedRows.map(testimonialToRow), { onConflict: "id" });
      if (error) throw error;
    }
  } catch {
    await seedSupabase(next);
  }

  await logAction({
    action: "update",
    entity_type: "testimonial",
    entity_id: "bulk-reorder",
    entity_title: "Orden de testimonios",
    new_data: { orderedIds },
  });
  return next;
}

export async function duplicateTestimonial(id: string) {
  invalidateTestimonialsCache();
  const all = await loadAll();
  const orig = all.find((x) => x.id === id);
  if (!orig) return null;
  const copy = normalize({ ...orig, name: `${orig.name} (copia)`, status: "draft" });
  const items = [copy, ...all];
  await persistAll(items);
  await upsertTestimonial(copy);
  await logAction({
    action: "duplicate",
    entity_type: "testimonial",
    entity_id: orig.id,
    entity_title: orig.name,
    new_data: copy,
  });
  return copy;
}

export async function moveTestimonialToTrash(id: string, deletedBy?: string) {
  invalidateTestimonialsCache();
  const dBy = deletedBy ?? (await getCurrentUserEmail());
  const all = await loadAll();
  const idx = all.findIndex((x) => x.id === id);
  if (idx === -1) return null;
  const d = new Date().toISOString();
  const t: Testimonial = { ...all[idx], status: "deleted", deleted_at: d, updated_at: d };
  all[idx] = t;
  await persistAll(all);
  await upsertTestimonial(t);
  await addTrashItem({
    id: randomUUID(),
    entity_type: "testimonial",
    entity_id: id,
    title: t.name,
    deleted_by: dBy,
    deleted_at: d,
    restore_data: t,
  });
  await logAction({
    action: "trash",
    entity_type: "testimonial",
    entity_id: id,
    entity_title: t.name,
    old_data: t,
    user_email: dBy,
  });
  return t;
}

export async function restoreTestimonial(id: string) {
  invalidateTestimonialsCache();
  const all = await loadAll();
  const idx = all.findIndex((x) => x.id === id);
  const ti = await getTrashItemByEntity(id);
  if (idx === -1 && !ti) return null;
  const r =
    ti?.restore_data && typeof ti.restore_data === "object"
      ? {
          ...(ti.restore_data as Testimonial),
          status: "draft" as const,
          deleted_at: null,
          updated_at: new Date().toISOString(),
        }
      : {
          ...all[idx],
          status: "draft" as const,
          deleted_at: null,
          updated_at: new Date().toISOString(),
        };

  if (idx === -1) {
    const next = [r, ...all];
    await persistAll(next);
  } else {
    all[idx] = r;
    await persistAll(all);
  }
  await upsertTestimonial(r);
  if (ti) await removeTrashItem(ti.id);
  await logAction({
    action: "restore",
    entity_type: "testimonial",
    entity_id: r.id,
    entity_title: r.name,
  });
  return r;
}

export async function deleteTestimonialPermanently(id: string) {
  invalidateTestimonialsCache();
  const all = await loadAll();
  const item = all.find((x) => x.id === id);
  const next = all.filter((x) => x.id !== id);
  if (next.length === all.length && !item) {
    const ti = await getTrashItemByEntity(id);
    if (!ti) return false;
    await deleteTestimonialFromDb(id);
    await removeTrashItem(ti.id);
    return true;
  }
  await persistAll(next);
  await deleteTestimonialFromDb(id);
  const ti = await getTrashItemByEntity(id);
  if (ti) await removeTrashItem(ti.id);
  if (item) {
    await logAction({
      action: "delete_permanently",
      entity_type: "testimonial",
      entity_id: id,
      entity_title: item.name,
      old_data: item,
    });
  }
  return true;
}
