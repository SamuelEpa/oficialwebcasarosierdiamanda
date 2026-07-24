import type { ProductFormFields } from "../types";
import { ProductSectionHead } from "./ProductSectionHead";

type Props = {
  fields: ProductFormFields;
  disabled?: boolean;
  onExcerptChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
};

export function ProductContentSection({
  fields,
  disabled,
  onExcerptChange,
  onDescriptionChange,
}: Props) {
  return (
    <section className="form-block shop-product-editor__section">
      <ProductSectionHead
        icon="edit_note"
        title="Contenido"
        description="Texto breve para tarjetas y descripción completa para la ficha del artículo."
      />
      <div className="grid-2">
        <label className="field span-2">
          <span>Extracto</span>
          <textarea
            rows={3}
            value={fields.excerpt}
            disabled={disabled}
            onChange={(event) => onExcerptChange(event.target.value)}
            placeholder="Resumen corto para listados y tarjetas."
          />
        </label>
        <label className="field span-2">
          <span>Descripción</span>
          <textarea
            rows={7}
            value={fields.description}
            disabled={disabled}
            onChange={(event) => onDescriptionChange(event.target.value)}
            placeholder="Describe materiales, acabado y detalles de la pieza."
          />
        </label>
      </div>
    </section>
  );
}
