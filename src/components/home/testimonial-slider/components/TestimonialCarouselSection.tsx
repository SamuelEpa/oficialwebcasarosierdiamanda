"use client";

import { memo } from "react";
import { Carousel } from "@/components/ui/Carousel";
import { HOME_TESTIMONIAL_SECTION_COPY, TESTIMONIAL_SECTION_COPY } from "../constants";
import type { TestimonialSlide } from "../types";
import { TestimonialSlideContent } from "./TestimonialSlideContent";

function TestimonialCarouselSectionComponent({
  testimonials,
  onOpenSlide,
  variant = "default",
}: {
  testimonials: TestimonialSlide[];
  onOpenSlide: (index: number) => void;
  variant?: "default" | "home";
}) {
  const copy = variant === "home" ? HOME_TESTIMONIAL_SECTION_COPY : TESTIMONIAL_SECTION_COPY;
  const isHome = variant === "home";

  return (
    <section
      id="testimonio"
      className={isHome ? "testimonial testimonial--home section" : "testimonial section"}
    >
      <div className="container testimonial__container">
        <header className="testimonial__head">
          <h2 className="testimonial__title section-title">
            {copy.title.split("\n").map((line, index, lines) => (
              <span key={`${line}-${index}`}>
                {line}
                {index < lines.length - 1 && <br />}
              </span>
            ))}
          </h2>
          <p className="testimonial__subtitle section-subtitle">{copy.subtitle}</p>
        </header>
        <Carousel
          items={testimonials}
          ariaLabel={copy.carouselAriaLabel}
          className="testimonial__carousel"
          viewportClassName="testimonial__viewport"
          trackClassName="testimonial__track"
          slideClassName="testimonial__slide"
          dotsClassName="testimonial__dots"
          dotClassName="testimonial__dot"
          showDots
          dotLabel={(slideIndex) => copy.dotLabel(slideIndex)}
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
