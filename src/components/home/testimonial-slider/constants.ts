import type { TestimonialSlide } from "./types";

/** Fallback when no CMS slides are passed (dev / empty props). */
export const DEFAULT_TESTIMONIAL_SLIDES: TestimonialSlide[] = [
  {
    image: "/img/avatar-1.jpg",
    alt: "Foto de Ana",
    quote:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem illo accusantium doloremque laudantium, totam rem aperiam.",
    author: "Ana — Hope River Artist",
  },
  {
    image: "/img/avatar-2.jpg",
    alt: "Foto de Marta",
    quote:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem illo accusantium doloremque laudantium, totam rem aperiam.",
    author: "Marta — Hope River Artist",
  },
  {
    image: "/img/avatar-3.jpg",
    alt: "Foto de Luis",
    quote:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem illo accusantium doloremque laudantium, totam rem aperiam.",
    author: "Luis — Hope River Artist",
  },
];

export const TESTIMONIAL_SECTION_COPY = {
  title: "Lo que dicen",
  subtitle: "Quienes han pasado por el taller",
  carouselAriaLabel: "Testimonios de quienes han pasado por el taller",
  dotLabel: (index: number) => `Ver testimonio ${index + 1}`,
} as const;

export const HOME_TESTIMONIAL_SECTION_COPY = {
  title: "Lo que dicen\nde Nosotros",
  subtitle: "Quienes han pasado por el taller",
  carouselAriaLabel: "Testimonios de quienes han pasado por el taller",
  dotLabel: (index: number) => `Ver testimonio ${index + 1}`,
} as const;
