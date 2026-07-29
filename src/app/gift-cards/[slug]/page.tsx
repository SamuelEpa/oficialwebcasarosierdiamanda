import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GiftCardOfferingDetailPage } from "@/features/gift-cards/GiftCardOfferingDetailPage";
import {
  generateExperienceMetadata,
  generateExperienceStaticParams,
  getExperienceRouteItem,
} from "@/features/experiences/experienceDetailRouting";

export const revalidate = 900;

export async function generateStaticParams() {
  return generateExperienceStaticParams("gift-card");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return generateExperienceMetadata(params);
}

export default async function GiftCardsSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const item = await getExperienceRouteItem(params, "gift-card");
  if (!item) notFound();
  return <GiftCardOfferingDetailPage item={item} />;
}
