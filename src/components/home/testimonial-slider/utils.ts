import type { Testimonial } from "@/lib/cms/types";
import type { TestimonialSlide } from "./types";

const DEFAULT_AVATAR = "/img/avatar-1.jpg";

/** Maps CMS testimonials to public carousel slides (single transform path for all pages). */
export function mapCmsTestimonialsToSlides(items: Testimonial[]): TestimonialSlide[] {
  return items.map((item) => ({
    image: item.avatar_id?.trim() || DEFAULT_AVATAR,
    alt: `Foto de ${item.name}`,
    quote: item.text,
    author: item.role ? `${item.name} — ${item.role}` : item.name,
  }));
}
