import type { ProductFormFields } from "../types";
import { ProductSectionHead } from "./ProductSectionHead";

type Props = {
  fields: ProductFormFields;
  disabled?: boolean;
  onLabelChange: (value: string) => void;
  onUrlChange: (value: string) => void;
};

export function ProductCtaSection({ fields, disabled, onLabelChange, onUrlChange }: Props) {
  return (
    <section className="form-block shop-product-editor__section">
      <ProductSectionHead
        icon="ads_click"
        title="CTA"
        description="Botón principal visible en la ficha pública del producto."
      />
      <div className="grid-2">
        <label className="field span-2">
          <span>Texto del botón</span>
          <input
            value={fields.ctaLabel}
            disabled={disabled}
            onChange={(event) => onLabelChange(event.target.value)}
            placeholder="Comprar"
          />
        </label>
        <label className="field span-2">
          <span>Link destino</span>
          <input
            value={fields.ctaUrl}
            disabled={disabled}
            onChange={(event) => onUrlChange(event.target.value)}
            placeholder="https://wa.me/..."
          />
        </label>
      </div>
    </section>
  );
}
