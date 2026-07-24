import Link from "@/components/admin/AdminLink";
import { TESTIMONIALS_NEW_PATH } from "../constants";
import type { TestimonialsStats } from "../types";

export function TestimonialsPageHeader({
  stats,
  hasOrderChanges,
  isSavingOrder,
  onSaveOrder,
}: {
  stats: TestimonialsStats;
  hasOrderChanges: boolean;
  isSavingOrder: boolean;
  onSaveOrder: () => void;
}) {
  return (
    <div className="section-head testimonials-admin-head">
      <div>
        <p className="auth-kicker">CMS</p>
        <h2>Testimonios</h2>
        <p className="muted testimonials-admin-head__lede">
          Administra las reseñas visibles en la página principal. Usa las flechas para definir el
          orden.
        </p>
        <div className="testimonials-admin-stats" aria-label="Resumen de testimonios">
          <span className="testimonials-admin-stat">
            <strong>{stats.total}</strong> totales
          </span>
          <span className="testimonials-admin-stat testimonials-admin-stat--published">
            <strong>{stats.published}</strong> publicados
          </span>
          <span className="testimonials-admin-stat testimonials-admin-stat--draft">
            <strong>{stats.draft}</strong> borradores
          </span>
        </div>
      </div>
      <div className="row-actions testimonials-admin-actions">
        <Link className="primary-btn inline" href={TESTIMONIALS_NEW_PATH}>
          <span className="material-symbols-outlined" aria-hidden="true">
            add
          </span>
          Crear testimonio
        </Link>
        <button
          className="secondary-btn"
          type="button"
          onClick={onSaveOrder}
          disabled={!hasOrderChanges || isSavingOrder}
          aria-live="polite"
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            {isSavingOrder ? "progress_activity" : "save"}
          </span>
          {isSavingOrder ? "Guardando…" : hasOrderChanges ? "Guardar orden" : "Orden al día"}
        </button>
      </div>
    </div>
  );
}
