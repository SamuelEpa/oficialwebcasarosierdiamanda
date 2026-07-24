import FormsTable from "@/components/admin/FormsTable";
import { FOOTER_CONTACT_FORM_SLUG } from "@/lib/cms/footer-contact-form-defaults";
import { FOOTER_CONTACT_FORM_ADMIN_PATH } from "@/lib/cms/form-slug-guards";
import { getForms } from "@/lib/cms/forms";
import Link from "next/link";

export default async function FormulariosPage() {
  const items = await getForms();
  const active = items.filter((f) => f.status !== "deleted");
  const other = active.filter((f) => f.slug !== FOOTER_CONTACT_FORM_SLUG);
  const footerForm = active.find((f) => f.slug === FOOTER_CONTACT_FORM_SLUG);

  return (
    <div className="page-card">
      <div className="page-header">
        <h2>Formularios</h2>
        <a className="primary-btn" href="/admin/formularios/new">
          Nuevo formulario
        </a>
      </div>
      {footerForm ? (
        <aside className="cms-formularios-footer-notice mb-4 rounded-xl border border-outline-variant/40 bg-surface-container-low p-4">
          <p className="text-body-md font-medium text-on-surface">Contacto del footer</p>
          <p className="text-body-md text-on-surface-variant mt-1">
            Slug <code className="text-label-md">{FOOTER_CONTACT_FORM_SLUG}</code> · {footerForm.fields.length}{" "}
            campos. Los inputs visibles se editan en el footer; el envío y las notificaciones, aquí.
          </p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
            <Link className="text-primary underline text-body-md" href={FOOTER_CONTACT_FORM_ADMIN_PATH}>
              Campos en el footer
            </Link>
            <Link
              className="text-primary underline text-body-md"
              href={`/admin/formularios/${footerForm.id}/edit`}
            >
              Envío y notificaciones
            </Link>
          </div>
        </aside>
      ) : null}
      {other.length === 0 ? (
        <p className="muted">No hay otros formularios aún.</p>
      ) : (
        <FormsTable items={other} />
      )}
    </div>
  );
}
