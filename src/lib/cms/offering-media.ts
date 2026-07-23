import { createAdminClient } from "../supabase/admin";
import type { Offering } from "./types";
import { deleteStorageFiles } from "./media";

const STORAGE_MEDIA_URL =
  /\/storage\/v1\/object\/(?:public|sign)\/media\/([^?#]+)/i;

export function storagePathFromMediaUrl(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) return null;

  const match = trimmed.match(STORAGE_MEDIA_URL);
  if (!match?.[1]) return null;

  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}

function collectMediaUrlsFromValue(value: unknown, urls: Set<string>) {
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed && storagePathFromMediaUrl(trimmed)) urls.add(trimmed);
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => collectMediaUrlsFromValue(item, urls));
    return;
  }

  if (value && typeof value === "object") {
    Object.values(value).forEach((item) => collectMediaUrlsFromValue(item, urls));
  }
}

export function collectOfferingMediaStoragePaths(offering: Offering): string[] {
  const urls = new Set<string>();

  if (offering.cover_image_url) urls.add(offering.cover_image_url);
  offering.gallery?.forEach((item) => item && urls.add(item));
  collectMediaUrlsFromValue(offering.details, urls);

  const paths = new Set<string>();
  for (const url of urls) {
    const path = storagePathFromMediaUrl(url);
    if (path) paths.add(path);
  }

  return [...paths];
}

async function deleteMediaAssetRecords(filePaths: string[]) {
  if (!filePaths.length) return;

  try {
    const supabase = createAdminClient();
    await supabase.from("media_assets").delete().in("file_name", filePaths);
  } catch {
    /* best-effort */
  }
}

export async function deleteOfferingMediaAssets(offering: Offering) {
  const paths = collectOfferingMediaStoragePaths(offering);
  if (!paths.length) {
    return { paths: [], deleted: [] as string[] };
  }

  const deleted = await deleteStorageFiles(paths);
  await deleteMediaAssetRecords(deleted);
  return { paths, deleted };
}
