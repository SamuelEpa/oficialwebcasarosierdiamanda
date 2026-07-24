"use client";

import { memo } from "react";
import type { FooterEditorSectionTab } from "../footerEditorSections";

function FooterEditorSectionIntroComponent({ meta }: { meta: FooterEditorSectionTab }) {
  return (
    <header className="cms-footer-editor-section-intro">
      <h2 className="cms-footer-editor-section-intro__title">{meta.label}</h2>
      <p className="cms-footer-editor-section-intro__description">{meta.description}</p>
    </header>
  );
}

export const FooterEditorSectionIntro = memo(FooterEditorSectionIntroComponent);
