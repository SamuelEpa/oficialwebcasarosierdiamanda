import AdminShell from "@/components/admin/AdminShell";
import SectionEmptyState from "@/components/admin/SectionEmptyState";
import { TestimonialForm } from "@/components/admin/testimonials";
import { getTestimonialById } from "@/lib/cms/testimonials";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const item = await getTestimonialById((await params).id);

  if (!item) {
    return (
      <AdminShell>
        <SectionEmptyState
          title="No encontrado"
          description="El testimonio no existe."
          actionHref="/admin/components/testimonials"
          actionLabel="Volver"
        />
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="section-head testimonials-form-page-head">
        <div>
          <p className="auth-kicker">CMS</p>
          <h2>Editar testimonio</h2>
          <p className="muted">Actualiza el contenido y el estado de publicación.</p>
        </div>
      </div>
      <TestimonialForm mode="edit" item={item} />
    </AdminShell>
  );
}
