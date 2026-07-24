"use client";

import { memo, type ReactNode } from "react";
import type { Form } from "@/lib/cms/types";
import type { FooterEditorSectionTab } from "../footerEditorSections";
import type { FooterContactFormEditor } from "../hooks/useFooterContactFormEditor";
import type { FooterEditorFormState } from "../hooks/useFooterEditorForm";
import type { FooterEditorSectionsState } from "../hooks/useFooterEditorSections";
import { FooterColorsSection } from "./FooterColorsSection";
import { FooterContactFormTab } from "./FooterContactFormTab";
import { FooterContactSection } from "./FooterContactSection";
import { FooterEditorSectionIntro } from "./FooterEditorSectionIntro";
import { FooterFixedLinksNotice } from "./FooterFixedLinksNotice";
import { FooterGeneralSection } from "./FooterGeneralSection";
import { FooterSocialLinksSection } from "./FooterSocialLinksSection";

function FooterEditorSectionPanel({
  tab,
  active,
  children,
}: {
  tab: FooterEditorSectionTab;
  active: boolean;
  children: ReactNode;
}) {
  if (!active) return null;

  return (
    <section
      id={`footer-editor-panel-${tab.key}`}
      role="tabpanel"
      aria-labelledby={`footer-editor-tab-${tab.key}`}
      className="cms-footer-editor-panel"
    >
      <FooterEditorSectionIntro meta={tab} />
      {children}
    </section>
  );
}

function FooterEditorMainContentComponent({
  sections,
  singleton,
  contactForm,
  form,
  contactEditor,
}: {
  sections: FooterEditorSectionsState;
  singleton: boolean;
  contactForm?: Form;
  form: FooterEditorFormState;
  contactEditor: FooterContactFormEditor;
}) {
  const { tabs, activeTab } = sections;
  const tabMeta = (key: FooterEditorSectionTab["key"]) =>
    tabs.find((tab) => tab.key === key) ?? tabs[0];

  return (
    <div className="cms-footer-editor-main">
      {!singleton ? (
        <FooterEditorSectionPanel tab={tabMeta("general")} active={activeTab === "general"}>
          <FooterGeneralSection form={form} embedded />
        </FooterEditorSectionPanel>
      ) : null}

      {contactForm ? (
        <FooterEditorSectionPanel tab={tabMeta("form")} active={activeTab === "form"}>
          <FooterContactFormTab contact={contactEditor} />
        </FooterEditorSectionPanel>
      ) : null}

      <FooterEditorSectionPanel tab={tabMeta("contact")} active={activeTab === "contact"}>
        <FooterContactSection form={form} embedded />
      </FooterEditorSectionPanel>

      <FooterEditorSectionPanel tab={tabMeta("appearance")} active={activeTab === "appearance"}>
        <FooterColorsSection form={form} embedded />
      </FooterEditorSectionPanel>

      <FooterEditorSectionPanel tab={tabMeta("social")} active={activeTab === "social"}>
        <div className="cms-footer-editor-social-stack">
          <FooterSocialLinksSection form={form} embedded />
          <FooterFixedLinksNotice />
        </div>
      </FooterEditorSectionPanel>
    </div>
  );
}

export const FooterEditorMainContent = memo(FooterEditorMainContentComponent);
