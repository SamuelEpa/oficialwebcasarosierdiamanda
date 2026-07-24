"use client";

import { memo, useMemo } from "react";
import type { ClassEditorPreviewChrome } from "@/lib/cms/class-editor-preview";
import { SocialGallery } from "@/components/home/SocialGallery";

function socialGalleryPosts(previewChrome: ClassEditorPreviewChrome) {
  return previewChrome.socialGallery?.items
    .filter((item) => item.is_visible !== false && item.image_url)
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((item) => ({
      image: item.image_url,
      title: item.title,
      body: item.description,
      instagramUrl: item.instagram_url,
    }));
}

function PublicSocialGalleryPreviewComponent({ previewChrome }: { previewChrome: ClassEditorPreviewChrome }) {
  const gallery = previewChrome.socialGallery;
  const posts = useMemo(() => socialGalleryPosts(previewChrome), [previewChrome]);

  return (
    <SocialGallery
      title={gallery?.title || undefined}
      subtitle={gallery?.description || undefined}
      posts={posts?.length ? posts : undefined}
      sourceHref={gallery?.cta_url || undefined}
    />
  );
}

export const PublicSocialGalleryPreview = memo(PublicSocialGalleryPreviewComponent);
