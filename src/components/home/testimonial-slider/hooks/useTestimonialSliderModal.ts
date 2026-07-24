"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { TestimonialSlide } from "../types";

export function useTestimonialSliderModal(testimonials: TestimonialSlide[]) {
  const count = testimonials.length;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const current = activeIndex === null ? null : testimonials[activeIndex];

  const openAt = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const close = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((value) => (value === null ? 0 : (value + 1) % count));
  }, [count]);

  const goPrev = useCallback(() => {
    setActiveIndex((value) => (value === null ? 0 : (value - 1 + count) % count));
  }, [count]);

  useEffect(() => {
    if (activeIndex === null) return;

    document.body.classList.add("modal-open");
    panelRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") goNext();
      if (event.key === "ArrowLeft") goPrev();
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("modal-open");
      document.removeEventListener("keydown", onKey);
    };
  }, [activeIndex, close, goNext, goPrev]);

  return {
    activeIndex,
    current,
    panelRef,
    openAt,
    close,
    goNext,
    goPrev,
  };
}
