import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostPage as BlogPostScreen } from "@/features/blog/BlogPostPage";
import { loadBlogPostPage } from "@/features/blog/loadBlogPostPage";
import {
  generateBlogPostMetadata,
  generateBlogStaticParams,
} from "@/features/blog/blogRouting";

export const revalidate = 900;

export async function generateStaticParams() {
  return generateBlogStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return generateBlogPostMetadata(params);
}

export default async function BlogPostRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const data = await loadBlogPostPage((await params).slug);
  if (!data) notFound();

  return (
    <BlogPostScreen
      post={data.post}
      adjacent={data.adjacent}
      position={data.position}
      total={data.total}
    />
  );
}
