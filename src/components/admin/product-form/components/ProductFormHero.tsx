import { STATUS_LABELS } from "../constants";
import type { ProductFormMode, ProductStatus } from "../types";

export function ProductFormHero({
  mode,
  name,
  status,
}: {
  mode: ProductFormMode;
  name: string;
  status: ProductStatus;
}) {
  return (
    <header className="shop-product-editor__hero">
      <div>
        <p className="auth-kicker">Producto de tienda</p>
        <h3>{mode === "create" ? "Nuevo artículo" : name || "Editar artículo"}</h3>
        <p>Organiza la información comercial, contenido público, inventario e imágenes del producto.</p>
      </div>
      <span className={`status-pill status-pill--${status}`}>{STATUS_LABELS[status] ?? status}</span>
    </header>
  );
}
