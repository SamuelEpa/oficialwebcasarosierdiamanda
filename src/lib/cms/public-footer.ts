import { getFooterContactForm } from "./footer-contact-form";
import { getPublicFooter } from "./footers";
import { buildPublicFooterViewModel, type PublicFooterViewModel } from "./public-footer-model";
import { getSettings } from "./settings";

export type PublicFooterLayoutData = {
  model: PublicFooterViewModel;
};

/** Datos del footer global para el layout público (misma fuente que el editor en /admin/components/footers). */
export async function getPublicFooterLayoutData(): Promise<PublicFooterLayoutData> {
  const [footer, contactForm, settings] = await Promise.all([
    getPublicFooter(),
    getFooterContactForm(),
    getSettings(),
  ]);

  return {
    model: buildPublicFooterViewModel({
      footer,
      contactForm,
      siteContact: settings.contact,
      siteName: settings.site.site_name,
      footerLegalText: settings.footer.footer_text,
    }),
  };
}
