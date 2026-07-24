"use client";

import { DEFAULT_TESTIMONIAL_SLIDES } from "./constants";
import { TestimonialCarouselSection } from "./components/TestimonialCarouselSection";
import { TestimonialDetailModal } from "./components/TestimonialDetailModal";
import { useTestimonialSliderModal } from "./hooks/useTestimonialSliderModal";
import type { TestimonialSlide } from "./types";

export function TestimonialSlider({
  testimonials,
}: {
  testimonials?: TestimonialSlide[];
}) {
  const slides = testimonials ?? DEFAULT_TESTIMONIAL_SLIDES;
  const modal = useTestimonialSliderModal(slides);

  if (!slides.length) return null;

  return (
    <>
      <TestimonialCarouselSection testimonials={slides} onOpenSlide={modal.openAt} />
      {modal.current ? (
        <TestimonialDetailModal
          slide={modal.current}
          panelRef={modal.panelRef}
          onClose={modal.close}
          onPrevious={modal.goPrev}
          onNext={modal.goNext}
        />
      ) : null}
    </>
  );
}
