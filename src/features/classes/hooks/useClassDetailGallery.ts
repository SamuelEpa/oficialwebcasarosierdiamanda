"use client";

import { useCallback, useMemo, useState } from "react";
import type { ExperienceItem } from "@/data/types";

export type ClassDetailGalleryItem = {
  id: string;
  kind: "image" | "video";
  poster: string;
  videoUrl?: string;
};

export function buildClassDetailGalleryItems(item: ExperienceItem): ClassDetailGalleryItem[] {
  const images = item.galleryImages.filter(Boolean);
  const videoUrl = item.videoUrl?.trim();

  if (videoUrl) {
    const poster = item.videoCardImage || images[0] || item.coverImage || "";
    const entries: ClassDetailGalleryItem[] = [
      { id: "featured-video", kind: "video", poster, videoUrl },
    ];
    images.forEach((image, index) => {
      entries.push({ id: `image-${index}`, kind: "image", poster: image });
    });
    return entries;
  }

  return images.map((image, index) => ({
    id: `image-${index}`,
    kind: "image",
    poster: image,
  }));
}

export function useClassDetailGallery(item: ExperienceItem) {
  const items = useMemo(() => buildClassDetailGalleryItems(item), [item]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const safeIndex = Math.min(activeIndex, Math.max(items.length - 1, 0));
  const activeItem = items[safeIndex] ?? null;

  const selectIndex = useCallback((index: number) => {
    setActiveIndex(index);
    setIsPlaying(false);
  }, []);

  const startPlayback = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const stopPlayback = useCallback(() => {
    setIsPlaying(false);
  }, []);

  return {
    items,
    activeIndex: safeIndex,
    activeItem,
    isPlaying,
    selectIndex,
    startPlayback,
    stopPlayback,
  };
}
