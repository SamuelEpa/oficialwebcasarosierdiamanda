import FormForm from "@/components/admin/FormForm";
import { FOOTER_CONTACT_FORM_ADMIN_PATH } from "@/lib/cms/form-slug-guards";
import Link from "next/link";

export default function NewFormulario() {
  return (
    <div className="page-card">
      <div className="page-header">
        <h2>Nuevo formulario</h2>
        <a className="secondary-btn" href="/admin/formularios">
          Volver
        </a>
      </div>
      <p className="text-body-md text-on-surface-variant mb-4">
        El slug <code className="text-label-md">footer-contact</code> está reservado. Para el contacto del sitio usa{" "}
        <Link className="text-primary underline" href={FOOTER_CONTACT_FORM_ADMIN_PATH}>
          Componentes → Footer
        </Link>
        .
      </p>
      <FormForm mode="create" />
    </div>
  );
}
