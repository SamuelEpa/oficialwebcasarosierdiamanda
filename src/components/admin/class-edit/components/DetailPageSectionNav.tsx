"use client";

import { DETAIL_PAGE_SECTIONS } from "../constants";
import type { DetailPageSectionKey } from "../types";

type DetailPageSectionNavProps = {
  activeSection: DetailPageSectionKey;
  sectionsWithErrors: Set<DetailPageSectionKey>;
  onSectionChange: (section: DetailPageSectionKey) => void;
};

const groups = [
  { key: "general" as const, label: "General" },
  { key: "public" as const, label: "Contenido público" },
];

export function DetailPageSectionNav({
  activeSection,
  sectionsWithErrors,
  onSectionChange,
}: DetailPageSectionNavProps) {
  return (
    <nav className="class-edit-detail-nav" aria-label="Secciones de página detallada">
      {groups.map((group) => {
        const items = DETAIL_PAGE_SECTIONS.filter((section) => section.group === group.key);
        if (!items.length) return null;

        return (
          <div key={group.key} className="class-edit-detail-nav__group">
            <p className="class-edit-detail-nav__group-label">{group.label}</p>
            <ul className="class-edit-detail-nav__list">
              {items.map((section) => {
                const globalIndex = DETAIL_PAGE_SECTIONS.findIndex((item) => item.key === section.key);
                const isActive = activeSection === section.key;
                const hasError = sectionsWithErrors.has(section.key);

                return (
                  <li key={section.key}>
                    <button
                      type="button"
                      className={`class-edit-detail-nav__item${isActive ? " is-active" : ""}${hasError ? " has-error" : ""}`}
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
                        {String(globalIndex + 1).padStart(2, "0")}
                      </span>
                      {hasError ? (
                        <span className="class-edit-detail-nav__badge" aria-label="Requiere atención">
                          !
                        </span>
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}
