import type { Product, ProductCategory, ProductStatus } from "@/lib/cms/types";

export type ProductFormMode = "create" | "edit";
export type SaveIntent = "draft" | "publish";

export type ProductFormFields = {
  name: string;
  slug: string;
  sku: string;
  status: ProductStatus;
  description: string;
  excerpt: string;
  mainImageId: string;
  gallery: string[];
  price: number | null;
  stock: number | null;
  lowStockThreshold: number;
  categoryId: string;
  characteristics: string;
  weight: string;
  dimensions: string;
  ctaLabel: string;
  ctaUrl: string;
  seoTitle: string;
  seoDescription: string;
  seoImage: string;
};

export type ProductFormFieldKey = keyof ProductFormFields;

export type ProductFormModal = {
  type: "success" | "error";
  title: string;
  message?: string;
  details?: string[];
  redirectOnClose?: boolean;
} | null;

export type ProductFormProps = {
  mode: ProductFormMode;
  item?: Product;
};

export type { Product, ProductCategory, ProductStatus };
