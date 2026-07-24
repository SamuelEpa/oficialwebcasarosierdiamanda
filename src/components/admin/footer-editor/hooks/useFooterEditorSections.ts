"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  defaultFooterEditorSection,
  footerEditorSectionFromHash,
  footerEditorTabs,
  FOOTER_EDITOR_SECTION_HASH,
  type FooterEditorSectionKey,
} from "../footerEditorSections";

export function useFooterEditorSections(options: { singleton: boolean; hasContactForm: boolean }) {
  const tabs = useMemo(() => footerEditorTabs(options), [options.hasContactForm, options.singleton]);

  const [activeTab, setActiveTab] = useState<FooterEditorSectionKey>(() =>
    defaultFooterEditorSection(options),
  );

  useEffect(() => {
    const fromHash = footerEditorSectionFromHash(window.location.hash, {
      hasContactForm: options.hasContactForm,
    });
    if (fromHash) setActiveTab(fromHash);
  }, [options.hasContactForm]);

  const selectTab = useCallback((key: FooterEditorSectionKey) => {
    setActiveTab(key);
    const hash = FOOTER_EDITOR_SECTION_HASH[key];
    const nextUrl = hash
      ? `${window.location.pathname}${window.location.search}#${hash}`
      : `${window.location.pathname}${window.location.search}`;
    window.history.replaceState(null, "", nextUrl);
  }, []);

  return {
    tabs,
    activeTab,
    selectTab,
  };
}

export type FooterEditorSectionsState = ReturnType<typeof useFooterEditorSections>;
