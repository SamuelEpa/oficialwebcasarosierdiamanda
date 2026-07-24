import { formatAdminDateTime } from "@/lib/admin/date-format";
import type { FooterComponent, Form } from "@/lib/cms/types";

export function FooterEditorPageHeader({
  footer,
  contactForm,
}: {
  footer: FooterComponent;
  contactForm?: Form | null;
}) {
  const socialCount = footer.social_links?.length ?? 0;
  const fieldCount = contactForm?.fields?.length ?? 0;

  return (
    <header className="cms-page-editor-head cms-footer-editor-page-head">
      <div className="cms-page-editor-head__main">
        <p className="auth-kicker">Componentes · Sitio global</p>
        <h1>Footer</h1>
        <p className="cms-footer-editor-page-head__lede">
          Edición del footer y del formulario de contacto del sitio. Al publicar, footer y formulario (slug{" "}
          <code className="text-label-md">footer-contact</code>) se sincronizan con Supabase.
        </p>
        <div className="cms-page-editor-meta cms-footer-editor-page-head__meta">
          <span className="cms-footer-editor-badge cms-footer-editor-badge--published">Publicado</span>
          <span>
            {socialCount} {socialCount === 1 ? "red social" : "redes sociales"}
          </span>
          {contactForm ? (
            <span>
              {fieldCount} {fieldCount === 1 ? "campo" : "campos"} del formulario
            </span>
          ) : null}
          <span>Enlaces legales fijos</span>
          {footer.updated_at ? <span>Footer · {formatAdminDateTime(footer.updated_at)}</span> : null}
          {contactForm?.updated_at ? (
            <span>Formulario · {formatAdminDateTime(contactForm.updated_at)}</span>
          ) : null}
        </div>
      </div>
    </header>
  );
}
