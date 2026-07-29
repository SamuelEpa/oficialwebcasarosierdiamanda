"use client";

import { memo } from "react";
import { STUDIO_PAGE_EDITOR_TABS, type StudioPageEditorTabKey } from "../constants";

function StudioPageEditorTabBarComponent({
  activeTab,
  onTabChange,
}: {
  activeTab: StudioPageEditorTabKey;
  onTabChange: (tab: StudioPageEditorTabKey) => void;
}) {
  return (
    <nav className="cms-editor-tabs" aria-label="Secciones del editor de Estudio">
      {STUDIO_PAGE_EDITOR_TABS.map((item) => (
        <button
          type="button"
          key={item.key}
          className={activeTab === item.key ? "is-active" : ""}
          onClick={() => onTabChange(item.key)}
          aria-current={activeTab === item.key ? "step" : undefined}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}

export const StudioPageEditorTabBar = memo(StudioPageEditorTabBarComponent);
