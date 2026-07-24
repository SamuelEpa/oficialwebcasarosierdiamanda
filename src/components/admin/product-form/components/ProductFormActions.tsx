import { STATUS_LABELS } from "../constants";
import type { ProductFormFields, SaveIntent } from "../types";

type Props = {
  fields: ProductFormFields;
  savingIntent: SaveIntent | null;
  disabled?: boolean;
};

export function ProductFormActions({ fields, savingIntent, disabled }: Props) {
  const isSaving = savingIntent !== null;
  const priceLabel = fields.price !== null ? `${fields.price} €` : "Sin precio";
  const stockLabel = fields.stock !== null ? `${fields.stock} en stock` : "Stock ilimitado";

  return (
    <div className="admin-sticky-actionbar shop-product-editor__actions">
      <span className="admin-sticky-actionbar__meta">
        {STATUS_LABELS[fields.status] ?? fields.status} · {priceLabel} · {stockLabel}
        {fields.gallery.length ? ` · ${fields.gallery.length} en galería` : ""}
      </span>
      <button
        className="secondary-btn"
        type="submit"
        name="intent"
        value="draft"
        disabled={disabled || isSaving}
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          save
        </span>
        {isSaving && savingIntent === "draft" ? "Guardando..." : "Borrador"}
      </button>
      <button
        className="primary-btn"
        type="submit"
        name="intent"
        value="publish"
        disabled={disabled || isSaving}
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          publish
        </span>
        {isSaving && savingIntent === "publish" ? "Publicando..." : "Publicar producto"}
      </button>
    </div>
  );
}
