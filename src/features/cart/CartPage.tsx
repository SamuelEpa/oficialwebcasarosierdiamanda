import { HeaderInterno } from "@/components/layout/HeaderInterno";
import { Cart } from "@/components/shop/Cart";
import { SitePage } from "@/features/shared/layout/SitePage";
import { getWhatsappHref } from "@/lib/whatsapp";

export async function CartPage() {
  const whatsappHref = await getWhatsappHref();

  return (
    <SitePage
      bodyClass="cart-page"
      header={<HeaderInterno eyebrow="Resumen del pedido" title="Carrito" />}
    >
      <section className="cart section">
        <div className="container cart__container">
          <Cart whatsappHref={whatsappHref} />
        </div>
      </section>
    </SitePage>
  );
}
