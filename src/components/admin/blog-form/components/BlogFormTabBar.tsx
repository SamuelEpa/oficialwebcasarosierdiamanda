"use client";

import { memo } from "react";
import { BLOG_FORM_TABS, type BlogFormTabKey } from "../constants";

function BlogFormTabBarComponent({
  activeTab,
  onTabChange,
}: {
  activeTab: BlogFormTabKey;
  onTabChange: (tab: BlogFormTabKey) => void;
}) {
  return (
    <nav className="cms-editor-tabs" aria-label="Secciones del editor">
      {BLOG_FORM_TABS.map((item) => (
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

export const BlogFormTabBar = memo(BlogFormTabBarComponent);
