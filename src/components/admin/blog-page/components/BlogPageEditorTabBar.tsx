"use client";

import { memo } from "react";
import { BLOG_PAGE_EDITOR_TABS, type BlogPageEditorTabKey } from "../constants";

function BlogPageEditorTabBarComponent({
  activeTab,
  onTabChange,
}: {
  activeTab: BlogPageEditorTabKey;
  onTabChange: (tab: BlogPageEditorTabKey) => void;
}) {
  return (
    <nav className="cms-editor-tabs" aria-label="Secciones del editor de Bitácora">
      {BLOG_PAGE_EDITOR_TABS.map((item) => (
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

export const BlogPageEditorTabBar = memo(BlogPageEditorTabBarComponent);
