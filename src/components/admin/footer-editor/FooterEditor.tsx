"use client";

import AdminActionModal from "@/components/admin/AdminActionModal";
import type { FooterComponent, Form } from "@/lib/cms/types";
import type { SiteSettings } from "@/lib/cms/settings";
import { FOOTER_CONTACT_FORM_EDITOR_STUB } from "@/lib/cms/footer-contact-form-defaults";
import { FooterEditorMainContent } from "./components/FooterEditorMainContent";
import { FooterEditorPreview } from "./components/FooterEditorPreview";
import { FooterEditorStickyBar } from "./components/FooterEditorStickyBar";
import { FooterEditorTabBar } from "./components/FooterEditorTabBar";
import { useFooterContactFormEditor } from "./hooks/useFooterContactFormEditor";
import { useFooterEditorForm, type FooterEditorMode } from "./hooks/useFooterEditorForm";
import { useFooterEditorSections } from "./hooks/useFooterEditorSections";

export function FooterEditor({
  mode,
  item,
  contactForm,
  siteContact,
  siteSettingsUpdatedAt,
  singleton = false,
  showPreview = true,
}: {
  mode: FooterEditorMode;
  item?: FooterComponent;
  contactForm?: Form;
  siteContact?: SiteSettings["contact"];
  siteSettingsUpdatedAt?: string;
  singleton?: boolean;
  showPreview?: boolean;
}) {
  const contactEditor = useFooterContactFormEditor(contactForm ?? FOOTER_CONTACT_FORM_EDITOR_STUB);
  const form = useFooterEditorForm({
    mode,
    item,
    contactForm,
    siteContact,
    siteSettingsUpdatedAt,
    singleton,
    contactFormEditor: contactForm ? contactEditor : undefined,
  });
  const sections = useFooterEditorSections({
    singleton,
    hasContactForm: Boolean(contactForm),
  });

  return (
    <form className="cms-footer-editor-layout" onSubmit={form.handleSubmit}>
      <AdminActionModal
        open={Boolean(form.modal)}
        type={form.modal?.type}
        title={form.modal?.title ?? ""}
        message={form.modal?.message}
        confirmLabel="Entendido"
        onClose={form.closeModal}
      />

      <div className="cms-footer-editor-layout__main">
        <FooterEditorTabBar
          tabs={sections.tabs}
          activeTab={sections.activeTab}
          onTabChange={sections.selectTab}
        />
        <FooterEditorMainContent
          sections={sections}
          singleton={singleton}
          contactForm={contactForm}
          form={form}
          contactEditor={contactEditor}
        />
      </div>

      {showPreview ? (
        <aside className="cms-footer-editor-layout__aside" aria-label="Vista previa del footer">
          <FooterEditorPreview
            footer={form.previewFooter}
            contactForm={contactForm ? contactEditor.previewForm : null}
            siteContact={siteContact}
          />
        </aside>
      ) : null}

      <FooterEditorStickyBar form={form} />
    </form>
  );
}

export default FooterEditor;
