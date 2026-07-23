"use client";

import { useCallback } from "react";
import type { ClassEditFormState } from "./useClassEditForm";

type GalleryDragDropForm = Pick<
  ClassEditFormState,
  "draggedGalleryIndex" | "setDraggedGalleryIndex" | "moveGalleryImage"
>;

export function useGalleryDragDrop(form: GalleryDragDropForm) {
  const { draggedGalleryIndex, setDraggedGalleryIndex, moveGalleryImage } = form;

  const onDragStart = useCallback((index: number) => {
    setDraggedGalleryIndex(index);
  }, [setDraggedGalleryIndex]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
  }, []);

  const onDrop = useCallback((index: number) => {
    if (draggedGalleryIndex !== null) moveGalleryImage(draggedGalleryIndex, index);
    setDraggedGalleryIndex(null);
  }, [draggedGalleryIndex, moveGalleryImage, setDraggedGalleryIndex]);

  return { onDragStart, onDragOver, onDrop };
}
