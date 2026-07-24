export function TestimonialFormActions({
  savingStatus,
  onPublish,
}: {
  savingStatus: "draft" | "published" | "archived" | "deleted" | null;
  onPublish: () => void;
}) {
  const isSaving = savingStatus !== null;

  return (
    <div className="form-actions testimonials-form-actions">
      <button className="secondary-btn" type="submit" disabled={isSaving}>
        {savingStatus === "draft" ? "Guardando…" : "Borrador"}
      </button>
      <button className="primary-btn" type="button" onClick={onPublish} disabled={isSaving}>
        {savingStatus === "published" ? "Publicando…" : "Publicar"}
      </button>
    </div>
  );
}
