import Link from "@/components/admin/AdminLink";
import { TESTIMONIALS_NEW_PATH } from "../constants";
import type { TestimonialFilterValue } from "../types";

export function TestimonialsEmptyState({ status }: { status: TestimonialFilterValue }) {
  const title =
    status === "published"
      ? "No hay testimonios publicados"
      : status === "draft"
        ? "No hay borradores"
        : "Aún no hay testimonios";

  const description =
    status === "all"
      ? "Crea el primero para mostrarlo en la home."
      : "Prueba otro filtro o crea un nuevo testimonio.";

  return (
    <div className="empty-state testimonials-admin-empty">
      <span className="material-symbols-outlined testimonials-admin-empty__icon" aria-hidden="true">
        format_quote
      </span>
      <h3>{title}</h3>
      <p className="muted">{description}</p>
      <Link className="primary-btn inline" href={TESTIMONIALS_NEW_PATH}>
        Crear testimonio
      </Link>
    </div>
  );
}
