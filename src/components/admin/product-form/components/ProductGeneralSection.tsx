import type { ProductCategory, ProductFormFields } from "../types";
import { ProductCategoryField } from "./ProductCategoryField";
import { ProductSectionHead } from "./ProductSectionHead";

type Props = {
  fields: ProductFormFields;
  categories: ProductCategory[];
  categoriesLoading?: boolean;
  categoriesError?: string | null;
  disabled?: boolean;
  onNameChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
};

export function ProductGeneralSection({
  fields,
  categories,
  categoriesLoading,
  categoriesError,
  disabled,
  onNameChange,
  onCategoryChange,
}: Props) {
  return (
    <section className="form-block shop-product-editor__section">
      <ProductSectionHead
        icon="inventory_2"
        title="Información general"
        description="Datos visibles para administrar y encontrar el producto."
      />
      <div className="grid-2">
        <label className="field span-2">
          <span>Nombre</span>
          <input
            value={fields.name}
            disabled={disabled}
            onChange={(event) => onNameChange(event.target.value)}
            placeholder="Ej. Collar Luna Rosa"
            autoComplete="off"
          />
        </label>
        <label className="field">
          <span>Slug</span>
          <input value={fields.slug} readOnly aria-readonly="true" />
        </label>
        <label className="field">
          <span>SKU</span>
          <input value={fields.sku} readOnly aria-readonly="true" />
        </label>
        <ProductCategoryField
          value={fields.categoryId}
          categories={categories}
          loading={categoriesLoading}
          error={categoriesError}
          disabled={disabled}
          onChange={onCategoryChange}
        />
      </div>
    </section>
  );
}
