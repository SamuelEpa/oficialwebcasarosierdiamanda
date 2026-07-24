"use client";

import { memo } from "react";
import { Carousel } from "@/components/ui/Carousel";
import { TESTIMONIAL_SECTION_COPY } from "../constants";
import type { TestimonialSlide } from "../types";
import { TestimonialSlideContent } from "./TestimonialSlideContent";

function TestimonialCarouselSectionComponent({
  testimonials,
  onOpenSlide,
}: {
  testimonials: TestimonialSlide[];
  onOpenSlide: (index: number) => void;
}) {
  return (
    <section id="testimonio" className="testimonial section">
      <div className="container testimonial__container">
        <header className="testimonial__head">
          <h2 className="testimonial__title section-title">{TESTIMONIAL_SECTION_COPY.title}</h2>
          <p className="testimonial__subtitle section-subtitle">
            {TESTIMONIAL_SECTION_COPY.subtitle}
          </p>
        </header>
        <Carousel
          items={testimonials}
          ariaLabel={TESTIMONIAL_SECTION_COPY.carouselAriaLabel}
          className="testimonial__carousel"
          viewportClassName="testimonial__viewport"
          trackClassName="testimonial__track"
          slideClassName="testimonial__slide"
          dotsClassName="testimonial__dots"
          dotClassName="testimonial__dot"
          showDots
          dotLabel={(slideIndex) => TESTIMONIAL_SECTION_COPY.dotLabel(slideIndex)}
          getSlideProps={(_, { realIndex }) => ({
            tabIndex: 0,
            onClick: () => onOpenSlide(realIndex),
            onKeyDown: (event) => {
              if (event.key === "Enter" || event.key === " ") {
                onOpenSlide(realIndex);
              }
            },
          })}
          renderItem={(testimonial) => <TestimonialSlideContent slide={testimonial} />}
        />
      </div>
    </section>
  );
}

export const TestimonialCarouselSection = memo(TestimonialCarouselSectionComponent);
