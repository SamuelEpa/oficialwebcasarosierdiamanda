"use client";

import type { TabKey } from "../types";

export function ClassEditTabBar({
  tabs,
  activeTab,
  onTabChange,
}: {
  tabs: { key: TabKey; label: string }[];
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}) {
  return (
    <div className="mb-6 border-b border-outline-variant">
      <div className="flex gap-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => onTabChange(tab.key)}
            className={`whitespace-nowrap border-b-2 px-1 pb-3 text-label-md font-bold transition-colors ${
              activeTab === tab.key ? "border-secondary text-secondary" : "border-transparent text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
