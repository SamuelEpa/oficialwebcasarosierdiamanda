import {
  DEFAULT_CTA_LABEL,
  DEFAULT_CTA_URL,
  DEFAULT_LOW_STOCK_THRESHOLD,
} from "./constants";
import type { Product, ProductCategory, ProductFormFields, SaveIntent } from "./types";

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function skuFromName(value: string) {
  const base = slugify(value).replace(/-/g, "").toUpperCase();
  return base ? `CR-${base.slice(0, 18)}` : "";
}

export function fieldsFromProduct(item?: Product): ProductFormFields {
  return {
    name: item?.name ?? "",
    slug: item?.slug ?? "",
    sku: item?.sku ?? "",
    status: item?.status ?? "draft",
    description: item?.description ?? "",
    excerpt: item?.excerpt ?? "",
    mainImageId: item?.main_image_id ?? "",
    gallery: Array.isArray(item?.gallery) ? [...item.gallery] : [],
    price: item?.price ?? null,
    stock: item?.stock ?? null,
    lowStockThreshold: item?.low_stock_threshold ?? DEFAULT_LOW_STOCK_THRESHOLD,
    categoryId: item?.category_id ?? "",
    characteristics: item?.characteristics ?? "",
    weight: item?.weight ?? "",
    dimensions: item?.dimensions ?? "",
    ctaLabel: item?.cta_label ?? DEFAULT_CTA_LABEL,
    ctaUrl: item?.cta_url ?? DEFAULT_CTA_URL,
    seoTitle: item?.seo_title ?? "",
    seoDescription: item?.seo_description ?? "",
    seoImage: item?.seo_image ?? "",
  };
}

export function applyNameDerivedFields(fields: ProductFormFields, name: string): ProductFormFields {
  return {
    ...fields,
    name,
    slug: slugify(name),
    sku: skuFromName(name),
  };
}

export function validateProductForm(fields: ProductFormFields, intent: SaveIntent) {
  const details: string[] = [];
  const normalizedSlug = slugify(fields.slug);
  const normalizedSku = skuFromName(fields.name);

  if (!fields.name.trim()) details.push("Nombre es obligatorio.");
  if (!normalizedSlug) details.push("Slug no pudo generarse. Escribe un nombre con letras o números.");
  if (fields.slug && fields.slug !== normalizedSlug) {
    details.push("Slug solo puede usar minúsculas, números y guiones.");
  }
  if (!normalizedSku) details.push("SKU no pudo generarse. Escribe un nombre válido.");
  if (fields.price !== null && (!Number.isFinite(fields.price) || fields.price < 0)) {
    details.push("Precio debe ser un número mayor o igual a 0.");
  }
  if (fields.stock !== null && (!Number.isInteger(fields.stock) || fields.stock < 0)) {
    details.push("Stock debe ser un número entero mayor o igual a 0.");
  }
  if (!Number.isInteger(fields.lowStockThreshold) || fields.lowStockThreshold < 0) {
    details.push("Stock mínimo debe ser un número entero mayor o igual a 0.");
  }
  if (fields.ctaUrl.trim() && !/^(https?:\/\/|\/|mailto:|tel:)/.test(fields.ctaUrl.trim())) {
    details.push("Link del CTA debe empezar con https://, /, mailto: o tel:.");
  }
  if (fields.ctaLabel.trim() && !fields.ctaUrl.trim()) {
    details.push("Si el CTA tiene texto, también necesita un link destino.");
  }
  if (fields.ctaUrl.trim() && !fields.ctaLabel.trim()) {
    details.push("Si el CTA tiene link, también necesita texto de botón.");
  }

  if (intent === "publish") {
    if (fields.price === null) details.push("Precio es obligatorio para publicar.");
    if (!fields.excerpt.trim()) details.push("Extracto es obligatorio para publicar.");
    if (!fields.description.trim()) details.push("Descripción es obligatoria para publicar.");
    if (!fields.mainImageId.trim()) details.push("Imagen principal es obligatoria para publicar.");
  }

  return details;
}

export function buildProductPayload(fields: ProductFormFields, nextStatus: "draft" | "published") {
  return {
    name: fields.name.trim(),
    slug: slugify(fields.slug || fields.name),
    sku: skuFromName(fields.name),
    status: nextStatus,
    description: fields.description.trim(),
    excerpt: fields.excerpt.trim(),
    main_image_id: fields.mainImageId,
    gallery: fields.gallery.map((value) => value.trim()).filter(Boolean),
    price: fields.price,
    stock: fields.stock,
    low_stock_threshold: fields.lowStockThreshold,
    category_id: fields.categoryId.trim() || null,
    characteristics: fields.characteristics,
    weight: fields.weight,
    dimensions: fields.dimensions,
    cta_label: fields.ctaLabel.trim(),
    cta_url: fields.ctaUrl.trim(),
    seo_title: fields.seoTitle,
    seo_description: fields.seoDescription,
    seo_image: fields.seoImage,
  };
}

export function isAbsoluteUrl(url: string) {
  return /^https?:\/\//i.test(url);
}

export function localImageSrc(url: string) {
  if (!url) return "";
  return url.startsWith("/") ? url : `/${url}`;
}

export function uniqueGalleryUrls(current: string[], nextUrls: string[]) {
  const seen = new Set(current);
  const appended: string[] = [];
  for (const url of nextUrls) {
    const trimmed = url.trim();
    if (!trimmed || seen.has(trimmed)) continue;
    seen.add(trimmed);
    appended.push(trimmed);
  }
  return [...current, ...appended];
}

export function isUsableProductCategory(category: ProductCategory) {
  return category.status === "active" && !category.deleted_at;
}

export function sortProductCategories(categories: ProductCategory[]) {
  return [...categories].sort(
    (a, b) => a.sort_order - b.sort_order || a.name.localeCompare(b.name, "es"),
  );
}

export function selectableProductCategories(
  categories: ProductCategory[],
  currentCategoryId?: string,
) {
  const usable = sortProductCategories(categories.filter(isUsableProductCategory));
  const currentId = currentCategoryId?.trim();
  if (!currentId) return usable;

  const hasCurrent = usable.some((category) => category.id === currentId);
  if (hasCurrent) return usable;

  const current = categories.find((category) => category.id === currentId);
  return current ? [current, ...usable] : usable;
}
