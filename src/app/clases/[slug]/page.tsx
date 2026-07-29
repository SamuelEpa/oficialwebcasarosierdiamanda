import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClassDetailPage } from "@/features/classes/ClassDetailPage";
import {
  generateExperienceMetadata,
  generateExperienceStaticParams,
  getExperienceRouteItem
} from "@/features/experiences/experienceDetailRouting";

export const revalidate = 900;

export async function generateStaticParams() {
  return generateExperienceStaticParams("class");
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return generateExperienceMetadata(params);
}

export default async function ClassSlugPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const item = await getExperienceRouteItem(params, "class");
  if (!item) notFound();
  return <ClassDetailPage item={item} />;
}
