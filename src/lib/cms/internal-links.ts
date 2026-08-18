import { randomUUID } from "crypto";
import { createAdminClient } from "../supabase/admin";
import { logAction } from "./history-logs";
import { readJsonFile, writeJsonFile } from "./local-storage";
import type { InternalLink } from "./types";

const TABLE = "internal_links";
const FILE_NAME = "internal-links.json";
const SUPABASE_READ_TIMEOUT_MS = Number(process.env.CMS_SUPABASE_READ_TIMEOUT_MS ?? 8_000);
const LINKS_CACHE_TTL_MS = Number(process.env.CMS_LINKS_CACHE_MS ?? 15_000);

type InternalLinkInput = Partial<Omit<InternalLink, "id" | "created_at" | "updated_at">> & { id?: string };

let linksCache: { items: InternalLink[]; expiresAt: number } | null = null;

function getCachedLinks() {
  if (!linksCache || linksCache.expiresAt <= Date.now()) return null;
  return linksCache.items;
}

function cacheLinks(items: InternalLink[]) {
  linksCache = { items, expiresAt: Date.now() + LINKS_CACHE_TTL_MS };
}

function invalidateLinksCache() {
  linksCache = null;
}

async function withTimeout<T>(promise: PromiseLike<T>, timeoutMs: number, fallback: T) {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  try {
    const wrappedPromise = Promise.resolve(promise);
    return await Promise.race([
      wrappedPromise.catch(() => fallback).finally(() => {
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

function normalizeUrl(value: string) {
  const url = value.trim();
  if (!url) throw new Error("La URL es obligatoria.");
  if (!/^https?:\/\//i.test(url) && !/^mailto:/i.test(url)) {
    throw new Error("La URL debe comenzar con http(s):// o mailto:.");
  }
  return url;
}

function normalize(input: InternalLinkInput, existing?: InternalLink) {
  const now = new Date().toISOString();
  const label = String(input.label ?? existing?.label ?? "").trim();
  if (!label) throw new Error("La etiqueta es obligatoria.");
  return {
    id: existing?.id ?? input.id ?? randomUUID(),
    label,
    url: normalizeUrl(String(input.url ?? existing?.url ?? "")),
    description: String(input.description ?? existing?.description ?? "").trim(),
    sort_order: input.sort_order ?? existing?.sort_order ?? 0,
    is_active: input.is_active !== undefined ? input.is_active : (existing?.is_active ?? true),
    created_at: existing?.created_at ?? now,
    updated_at: now,
  } satisfies InternalLink;
}

function rowToLink(row: Record<string, unknown>): InternalLink { return row as unknown as InternalLink; }
function linkToRow(link: InternalLink): Record<string, unknown> { return { ...link }; }

async function readAllFromSupabase(): Promise<InternalLink[] | null> {
  try {
    const { data, error } = await createAdminClient().from(TABLE).select("*").order("sort_order");
    if (error) throw error;
    if (!data || data.length === 0) return null;
    return (data as Array<Record<string, unknown>>).map(rowToLink);
  } catch {
    return null;
  }
}

async function readFromSupabase(id: string): Promise<InternalLink | null> {
  try {
    const { data } = await createAdminClient().from(TABLE).select("*").eq("id", id).maybeSingle();
    return data ? rowToLink(data as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

async function upsertLink(link: InternalLink) {
  try {
    await createAdminClient().from(TABLE).upsert(linkToRow(link), { onConflict: "id" });
  } catch {
    /* El archivo local mantiene el CMS operativo si Supabase no responde. */
  }
  invalidateLinksCache();
}

async function deleteLinkFromDb(id: string) {
  try {
    await createAdminClient().from(TABLE).delete().eq("id", id);
  } catch {
    /* Eliminación local de respaldo. */
  }
  invalidateLinksCache();
}

export async function getInternalLinks(): Promise<InternalLink[]> {
  const cached = getCachedLinks();
  if (cached) return cached;

  const fromSupabase = await withTimeout(readAllFromSupabase(), SUPABASE_READ_TIMEOUT_MS, null);
  const items = fromSupabase ?? await readJsonFile<InternalLink[]>(FILE_NAME, []);
  cacheLinks(items);
  return items;
}

export async function getInternalLinkById(id: string): Promise<InternalLink | null> {
  const result = await readFromSupabase(id);
  if (result) return result;
  const items = await readJsonFile<InternalLink[]>(FILE_NAME, []);
  return items.find((link) => link.id === id) ?? null;
}

export async function createInternalLink(data: InternalLinkInput): Promise<InternalLink> {
  const items = await getInternalLinks();
  const next = normalize(data);
  next.sort_order = items.length;
  await writeJsonFile(FILE_NAME, [next, ...items]);
  await upsertLink(next);
  await logAction({ action: "create", entity_type: "internal_link", entity_id: next.id, entity_title: next.label, new_data: next });
  return next;
}

export async function updateInternalLink(id: string, data: InternalLinkInput): Promise<InternalLink | null> {
  const items = await getInternalLinks();
  const index = items.findIndex((link) => link.id === id);
  const old = index === -1 ? await getInternalLinkById(id) : items[index];
  if (!old) return null;
  const next = normalize(data, old);
  if (index === -1) items.unshift(next); else items[index] = next;
  await writeJsonFile(FILE_NAME, items);
  await upsertLink(next);
  await logAction({ action: "update", entity_type: "internal_link", entity_id: next.id, entity_title: next.label, old_data: old, new_data: next });
  return next;
}

export async function deleteInternalLink(id: string): Promise<boolean> {
  const items = await readJsonFile<InternalLink[]>(FILE_NAME, []);
  const item = items.find((link) => link.id === id) ?? await getInternalLinkById(id);
  const next = items.filter((link) => link.id !== id);
  if (next.length === items.length && !item) return false;
  await writeJsonFile(FILE_NAME, next);
  await deleteLinkFromDb(id);
  if (item) await logAction({ action: "delete_permanently", entity_type: "internal_link", entity_id: id, entity_title: item.label, old_data: item });
  return true;
}

export async function toggleInternalLinkActive(id: string): Promise<InternalLink | null> {
  const items = await getInternalLinks();
  const index = items.findIndex((link) => link.id === id);
  const old = index === -1 ? await getInternalLinkById(id) : items[index];
  if (!old) return null;
  const next = { ...old, is_active: !old.is_active, updated_at: new Date().toISOString() };
  if (index === -1) items.unshift(next); else items[index] = next;
  await writeJsonFile(FILE_NAME, items);
  await upsertLink(next);
  await logAction({ action: "update", entity_type: "internal_link", entity_id: next.id, entity_title: next.label, old_data: old, new_data: next });
  return next;
}