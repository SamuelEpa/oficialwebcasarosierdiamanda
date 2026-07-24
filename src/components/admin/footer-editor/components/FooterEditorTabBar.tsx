"use client";

import { memo } from "react";
import type { FooterEditorSectionKey, FooterEditorSectionTab } from "../footerEditorSections";

function FooterEditorTabBarComponent({
  tabs,
  activeTab,
  onTabChange,
}: {
  tabs: FooterEditorSectionTab[];
  activeTab: FooterEditorSectionKey;
  onTabChange: (tab: FooterEditorSectionKey) => void;
}) {
  return (
    <nav className="cms-footer-editor-tabs" aria-label="Secciones del editor de footer">
      <div className="cms-footer-editor-tabs__list" role="tablist">
        {tabs.map((tab) => {
          const selected = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              id={`footer-editor-tab-${tab.key}`}
              aria-selected={selected}
              aria-controls={`footer-editor-panel-${tab.key}`}
              tabIndex={selected ? 0 : -1}
              className="cms-footer-editor-tabs__btn"
              onClick={() => onTabChange(tab.key)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export const FooterEditorTabBar = memo(FooterEditorTabBarComponent);
