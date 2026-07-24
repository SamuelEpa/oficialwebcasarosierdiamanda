import AdminShell from "@/components/admin/AdminShell";
import { TestimonialForm } from "@/components/admin/testimonials";

export default function Page() {
  return (
    <AdminShell>
      <div className="section-head testimonials-form-page-head">
        <div>
          <p className="auth-kicker">CMS</p>
          <h2>Nuevo testimonio</h2>
          <p className="muted">Completa los datos y guarda como borrador o publica al instante.</p>
        </div>
      </div>
      <TestimonialForm mode="create" />
    </AdminShell>
  );
}
