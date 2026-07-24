import type { ProductFormFields } from "../types";
import { ProductSectionHead } from "./ProductSectionHead";

type Props = {
  fields: ProductFormFields;
  disabled?: boolean;
  onCharacteristicsChange: (value: string) => void;
  onWeightChange: (value: string) => void;
  onDimensionsChange: (value: string) => void;
};

export function ProductCharacteristicsSection({
  fields,
  disabled,
  onCharacteristicsChange,
  onWeightChange,
  onDimensionsChange,
}: Props) {
  return (
    <section className="form-block shop-product-editor__section">
      <ProductSectionHead
        icon="straighten"
        title="Características"
        description="Detalles físicos y notas técnicas que ayudan a comparar piezas."
      />
      <div className="grid-2">
        <label className="field span-2">
          <span>Características</span>
          <textarea
            rows={4}
            value={fields.characteristics}
            disabled={disabled}
            onChange={(event) => onCharacteristicsChange(event.target.value)}
            placeholder="Materiales, acabados, cuidados…"
          />
        </label>
        <label className="field">
          <span>Peso</span>
          <input
            value={fields.weight}
            disabled={disabled}
            onChange={(event) => onWeightChange(event.target.value)}
            placeholder="Ej. 12 g"
          />
        </label>
        <label className="field">
          <span>Dimensiones</span>
          <input
            value={fields.dimensions}
            disabled={disabled}
            onChange={(event) => onDimensionsChange(event.target.value)}
            placeholder="Ej. 40 × 2 cm"
          />
        </label>
      </div>
    </section>
  );
}
