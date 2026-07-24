import AdminShell from "@/components/admin/AdminShell";
import FooterEditor from "@/components/admin/footer-editor/FooterEditor";
import { FooterEditorPageHeader } from "@/components/admin/footer-editor/components/FooterEditorPageHeader";
import { footerEditorPageSyncKey, getFooterEditorPageData } from "@/lib/cms/footer-editor";

export default async function Page() {
  const data = await getFooterEditorPageData();

  return (
    <AdminShell>
      <div className="cms-editor-shell cms-footer-editor-page">
        <FooterEditorPageHeader footer={data.footer} contactForm={data.contactForm} />
        <FooterEditor
          key={footerEditorPageSyncKey(data)}
          mode="edit"
          item={data.footer}
          contactForm={data.contactForm}
          siteContact={data.siteSettings.contact}
          siteSettingsUpdatedAt={data.siteSettings.system.updated_at}
          singleton
          showPreview
        />
      </div>
    </AdminShell>
  );
}
