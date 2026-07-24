"use client";

import { memo } from "react";
import { PublicFooterContent } from "@/components/layout/PublicFooterContent";
import Card from "@/components/ui/Card";
import type { SiteSettings } from "@/lib/cms/settings";
import type { FooterComponent, Form } from "@/lib/cms/types";

function FooterEditorPreviewComponent({
  footer,
  contactForm,
  siteContact,
}: {
  footer: FooterComponent;
  contactForm?: Form | null;
  siteContact?: SiteSettings["contact"];
}) {
  return (
    <Card padding="none" className="cms-footer-editor-preview overflow-hidden rounded-2xl">
      <div className="cms-footer-editor-preview__head">
        <p className="text-label-md font-semibold text-on-surface">Vista previa en vivo</p>
        <p className="text-label-md text-on-surface-variant">Así se verá el footer en el sitio.</p>
      </div>
      <div className="cms-footer-editor-preview__frame">
        <PublicFooterContent footer={footer} contactForm={contactForm} siteContact={siteContact} preview />
      </div>
    </Card>
  );
}

export const FooterEditorPreview = memo(FooterEditorPreviewComponent);
