/**
 * Plain-text normalization and truncation for previews (admin lists, home flip cards, etc.).
 */

/** Approx. visible copy in a padded 1:1 home flip card (~10 lines at 28ch). */
export const HOME_FLIP_EXCERPT_MAX_LENGTH = 280;

export function normalizePlainText(value: string) {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[`*_>#~]/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;|&#34;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
}

export function truncatePlainText(
  value: string | null | undefined,
  maxLength: number,
  options?: { fallback?: string; ellipsis?: string },
) {
  const fallback = options?.fallback ?? "";
  const ellipsis = options?.ellipsis ?? "...";
  const normalized = normalizePlainText(value ?? "");
  if (!normalized) return fallback;
  if (normalized.length <= maxLength) return normalized;
  const sliceEnd = Math.max(0, maxLength - ellipsis.length);
  return `${normalized.slice(0, sliceEnd).trimEnd()}${ellipsis}`;
}

export function truncateHomeFlipExcerpt(
  value: string | null | undefined,
  fallback = "Descubre esta experiencia en Casa Rosier.",
) {
  return truncatePlainText(value, HOME_FLIP_EXCERPT_MAX_LENGTH, { fallback });
}
