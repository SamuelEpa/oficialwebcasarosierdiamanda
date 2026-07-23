import type { CmsHeroSettings } from "@/lib/cms/types";
import { HERO_VARIANT_OPTIONS } from "../constants";
import type { SharedHeroEditorState } from "../types";

export function HeroVariantPicker({
  details,
  editor,
}: {
  details: CmsHeroSettings;
  editor: SharedHeroEditorState;
}) {
  return (
    <div className="class-edit-hero-variant-grid" role="radiogroup" aria-label="Tipo de hero">
      {HERO_VARIANT_OPTIONS.map(({ value, label, description, icon }) => {
        const isActive = details.heroVariant === value;

        return (
          <button
            type="button"
            key={value}
            role="radio"
            aria-checked={isActive}
            className={`class-edit-hero-variant-card${isActive ? " is-active" : ""}`}
            onClick={() => editor.setVariant(value)}
          >
            <span className="class-edit-hero-variant-card__icon" aria-hidden="true">
              <span className="material-symbols-outlined">{icon}</span>
            </span>
            <span className="class-edit-hero-variant-card__copy">
              <strong>{label}</strong>
              <small>{description}</small>
            </span>
          </button>
        );
      })}
    </div>
  );
}
