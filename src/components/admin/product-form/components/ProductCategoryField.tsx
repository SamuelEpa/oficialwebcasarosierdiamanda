import Link from "next/link";
import { CATEGORIES_ADMIN_PATH } from "../constants";
import type { ProductCategory } from "../types";
import { selectableProductCategories } from "../utils";

type Props = {
  value: string;
  categories: ProductCategory[];
  loading?: boolean;
  error?: string | null;
  disabled?: boolean;
  onChange: (value: string) => void;
};

export function ProductCategoryField({
  value,
  categories,
  loading,
  error,
  disabled,
  onChange,
}: Props) {
  const options = selectableProductCategories(categories, value);
  const hasOptions = options.length > 0;

  return (
    <div className="shop-product-editor__category-field span-2">
      <label className="field">
        <span>Categoría</span>
        <select
          value={value}
          disabled={disabled || loading}
          onChange={(event) => onChange(event.target.value)}
          aria-busy={loading || undefined}
          aria-describedby="product-category-help"
        >
          <option value="">{loading ? "Cargando categorías…" : "Sin categoría"}</option>
          {options.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
              {category.status !== "active" ? " (inactiva)" : ""}
            </option>
          ))}
        </select>
      </label>

      <p id="product-category-help" className="shop-product-editor__category-help">
        {error ? (
          <span className="form-error">{error}</span>
        ) : !loading && !hasOptions ? (
          <>
            No hay categorías activas.{" "}
            <Link href={`${CATEGORIES_ADMIN_PATH}/new`} className="shop-product-editor__inline-link">
              Crear categoría
            </Link>
          </>
        ) : (
          <>
            Las categorías se gestionan en{" "}
            <Link href={CATEGORIES_ADMIN_PATH} className="shop-product-editor__inline-link">
              Tienda → Categorías
            </Link>
            .
          </>
        )}
      </p>
    </div>
  );
}
