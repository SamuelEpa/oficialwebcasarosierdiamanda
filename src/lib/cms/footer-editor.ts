import { DEFAULT_FOOTER_CREATE_INPUT } from "@/components/admin/footer-editor/constants";
import type { SiteSettings } from "./settings";
import { getSettings } from "./settings";
import { createFooter, getFooters, selectCanonicalFooter } from "./footers";
import { getOrCreateFooterContactForm } from "./footer-contact-form";
import { mergeFooterContactForEditor } from "./footer-contact-sync";

/** Singleton footer used by /admin/components/footers (global site footer). */
export async function getOrCreateSingletonFooter() {
  const existing = selectCanonicalFooter(await getFooters());
  if (existing) return existing;

  return createFooter(DEFAULT_FOOTER_CREATE_INPUT);
}

export type FooterEditorPageData = {
  footer: Awaited<ReturnType<typeof getOrCreateSingletonFooter>>;
  contactForm: Awaited<ReturnType<typeof getOrCreateFooterContactForm>>;
  siteSettings: SiteSettings;
  siteContactMerged: ReturnType<typeof mergeFooterContactForEditor>;
};

export async function getFooterEditorPageData(): Promise<FooterEditorPageData> {
  const [footer, contactForm, siteSettings] = await Promise.all([
    getOrCreateSingletonFooter(),
    getOrCreateFooterContactForm(),
    getSettings(),
  ]);

  return {
    footer,
    contactForm,
    siteSettings,
    siteContactMerged: mergeFooterContactForEditor(footer, siteSettings.contact),
  };
}

export function footerEditorPageSyncKey(data: FooterEditorPageData) {
  return `${data.footer.id}:${data.footer.updated_at}:${data.contactForm.updated_at}:${data.siteSettings.system.updated_at}`;
}
