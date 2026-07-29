import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShopItemPage as ShopItemScreen } from "@/features/shop/ShopItemPage";
import { loadShopItemPage } from "@/features/shop/loadShopItemPage";
import {
  generateShopItemMetadata,
  generateShopStaticParams,
} from "@/features/shop/shopRouting";

export function generateStaticParams() {
  return generateShopStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return generateShopItemMetadata(params);
}

export default async function ShopDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const data = await loadShopItemPage((await params).slug);
  if (!data) notFound();
  return <ShopItemScreen item={data.item} related={data.related} />;
}
