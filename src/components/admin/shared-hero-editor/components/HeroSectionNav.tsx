"use client";

import { HERO_EDITOR_SECTIONS } from "../constants";
import type { HeroEditorSectionKey } from "../types";

type HeroSectionNavProps = {
  activeSection: HeroEditorSectionKey;
  onSectionChange: (section: HeroEditorSectionKey) => void;
};

export function HeroSectionNav({ activeSection, onSectionChange }: HeroSectionNavProps) {
  return (
    <nav className="class-edit-detail-nav" aria-label="Secciones del hero">
      <div className="class-edit-detail-nav__list" role="list">
        {HERO_EDITOR_SECTIONS.map((section, index) => {
          const isActive = activeSection === section.key;

          return (
            <button
              key={section.key}
              type="button"
              role="listitem"
              className={`class-edit-detail-nav__item${isActive ? " is-active" : ""}`}
              aria-current={isActive ? "step" : undefined}
              onClick={() => onSectionChange(section.key)}
            >
              <span className="class-edit-detail-nav__icon" aria-hidden="true">
                <span className="material-symbols-outlined">{section.icon}</span>
              </span>
              <span className="class-edit-detail-nav__copy">
                <strong>{section.label}</strong>
                <small>{section.description}</small>
              </span>
              <span className="class-edit-detail-nav__index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
