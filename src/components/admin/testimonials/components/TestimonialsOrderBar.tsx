export function TestimonialsOrderBar({
  visible,
  isSavingOrder,
  onSaveOrder,
  onDismissHint,
}: {
  visible: boolean;
  isSavingOrder: boolean;
  onSaveOrder: () => void;
  onDismissHint?: () => void;
}) {
  if (!visible) return null;

  return (
    <div className="testimonials-order-bar" role="status" aria-live="polite">
      <div className="testimonials-order-bar__copy">
        <span className="material-symbols-outlined" aria-hidden="true">
          reorder
        </span>
        <p>Hay cambios de orden sin guardar.</p>
      </div>
      <div className="testimonials-order-bar__actions">
        {onDismissHint ? (
          <button type="button" className="link-btn" onClick={onDismissHint}>
            Seguir editando
          </button>
        ) : null}
        <button
          type="button"
          className="primary-btn"
          onClick={onSaveOrder}
          disabled={isSavingOrder}
        >
          {isSavingOrder ? "Guardando…" : "Guardar orden"}
        </button>
      </div>
    </div>
  );
}
