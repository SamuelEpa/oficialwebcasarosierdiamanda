import type { ProductFormFields } from "../types";
import { ProductSectionHead } from "./ProductSectionHead";

type Props = {
  fields: ProductFormFields;
  disabled?: boolean;
  onPriceChange: (value: number | null) => void;
  onStockChange: (value: number | null) => void;
  onLowStockChange: (value: number) => void;
};

export function ProductPricingSection({
  fields,
  disabled,
  onPriceChange,
  onStockChange,
  onLowStockChange,
}: Props) {
  return (
    <section className="form-block shop-product-editor__section">
      <ProductSectionHead
        icon="sell"
        title="Precio y stock"
        description="Configura precio e inventario disponible."
      />
      <div className="shop-product-editor__metrics">
        <label className="field">
          <span>Precio</span>
          <input
            type="number"
            step="0.01"
            min={0}
            value={fields.price ?? ""}
            disabled={disabled}
            onChange={(event) =>
              onPriceChange(event.target.value ? Number(event.target.value) : null)
            }
          />
        </label>
        <label className="field">
          <span>Stock</span>
          <input
            type="number"
            min={0}
            value={fields.stock ?? ""}
            disabled={disabled}
            onChange={(event) =>
              onStockChange(event.target.value ? Number(event.target.value) : null)
            }
          />
        </label>
        <label className="field">
          <span>Stock mínimo</span>
          <input
            type="number"
            min={0}
            value={fields.lowStockThreshold}
            disabled={disabled}
            onChange={(event) => onLowStockChange(Number(event.target.value))}
          />
        </label>
      </div>
    </section>
  );
}
