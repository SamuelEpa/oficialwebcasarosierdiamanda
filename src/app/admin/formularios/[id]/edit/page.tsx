import FormForm from "@/components/admin/FormForm";
import FooterContactFormSubmitForm from "@/components/admin/formularios/FooterContactFormSubmitForm";
import { FOOTER_CONTACT_FORM_SLUG } from "@/lib/cms/footer-contact-form-defaults";
import { getFormById } from "@/lib/cms/forms";
import { notFound } from "next/navigation";

export default async function EditFormulario({ params }: { params: Promise<{ id: string }> }) {
  const item = await getFormById((await params).id);
  if (!item) notFound();

  if (item.slug === FOOTER_CONTACT_FORM_SLUG) {
    return (
      <div className="page-card">
        <div className="page-header">
          <div>
            <p className="auth-kicker">Formularios · Footer</p>
            <h2>Envío y notificaciones</h2>
            <p className="muted">
              Formulario <code>{FOOTER_CONTACT_FORM_SLUG}</code> · {item.fields.length}{" "}
              {item.fields.length === 1 ? "campo" : "campos"} en el footer
            </p>
          </div>
        </div>
        <FooterContactFormSubmitForm item={item} />
      </div>
    );
  }

  return (
    <div className="page-card">
      <div className="page-header">
        <h2>Editar: {item.name}</h2>
        <a className="secondary-btn" href="/admin/formularios">
          Volver
        </a>
      </div>
      <FormForm mode="edit" item={item} />
    </div>
  );
}
