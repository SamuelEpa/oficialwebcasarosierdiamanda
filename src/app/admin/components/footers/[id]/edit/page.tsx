import AdminShell from "@/components/admin/AdminShell";
import FooterEditor from "@/components/admin/footer-editor/FooterEditor";
import SectionEmptyState from "@/components/admin/SectionEmptyState";
import { getFooterById } from "@/lib/cms/footers";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const item = await getFooterById((await params).id);

  if (!item) {
    return (
      <AdminShell>
        <SectionEmptyState
          title="No encontrado"
          description="El footer no existe."
          actionHref="/admin/components/footers"
          actionLabel="Volver"
        />
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="cms-editor-shell cms-footer-editor-page">
        <header className="cms-page-editor-head">
          <div className="cms-page-editor-head__main">
            <p className="auth-kicker">CMS · Componentes</p>
            <h1>Editar footer</h1>
            <p>{item.name}</p>
          </div>
        </header>
        <FooterEditor mode="edit" item={item} showPreview />
      </div>
    </AdminShell>
  );
}
