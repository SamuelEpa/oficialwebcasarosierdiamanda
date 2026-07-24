export function slugifyBlogPost(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function parseTagsInput(value: string) {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function clampListingExcerpt(value: string) {
  return value.trimStart().split(/\s+/).slice(0, 10).join(" ");
}

export function listingExcerptWordCount(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}
