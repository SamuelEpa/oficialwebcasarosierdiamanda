import { memo } from "react";
import type { TestimonialSlide } from "../types";

function TestimonialSlideContentComponent({ slide }: { slide: TestimonialSlide }) {
  return (
    <>
      <img
        className="testimonial__avatar"
        src={slide.image}
        alt={slide.alt}
        loading="lazy"
        decoding="async"
      />
      <div className="testimonial__body">
        <p className="testimonial__quote">{slide.quote}</p>
        <p className="testimonial__author">{slide.author}</p>
      </div>
    </>
  );
}

export const TestimonialSlideContent = memo(TestimonialSlideContentComponent);
