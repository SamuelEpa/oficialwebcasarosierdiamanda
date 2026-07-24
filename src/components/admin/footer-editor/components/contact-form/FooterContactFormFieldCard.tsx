"use client";

import { memo, useCallback, useId } from "react";
import type { FormField, FormFieldType } from "@/lib/cms/types";
import {
  CONTACT_FORM_FIELD_TYPE_ICONS,
  CONTACT_FORM_FIELD_TYPE_LABELS,
  CONTACT_FORM_FIELD_TYPES,
} from "../../contactFormLabels";

function FooterContactFormFieldCardComponent({
  field,
  index,
  total,
  onUpdate,
  onRemove,
  onMove,
}: {
  field: FormField;
  index: number;
  total: number;
  onUpdate: (index: number, key: keyof FormField, value: unknown) => void;
  onRemove: (index: number) => void;
  onMove: (index: number, direction: "up" | "down") => void;
}) {
  const baseId = useId();
  const displayTitle = field.label.trim() || `Campo ${index + 1}`;
  const typeLabel = CONTACT_FORM_FIELD_TYPE_LABELS[field.type] ?? field.type;
  const typeIcon = CONTACT_FORM_FIELD_TYPE_ICONS[field.type] ?? "input";

  const setLabel = useCallback(
    (value: string) => onUpdate(index, "label", value),
    [index, onUpdate],
  );
  const setName = useCallback((value: string) => onUpdate(index, "name", value), [index, onUpdate]);
  const setType = useCallback(
    (value: FormFieldType) => onUpdate(index, "type", value),
    [index, onUpdate],
  );
  const setPlaceholder = useCallback(
    (value: string) => onUpdate(index, "placeholder", value),
    [index, onUpdate],
  );
  const setRequired = useCallback(
    (value: boolean) => onUpdate(index, "required", value),
    [index, onUpdate],
  );
  const setVisible = useCallback(
    (value: boolean) => onUpdate(index, "is_visible", value),
    [index, onUpdate],
  );
  const setOptions = useCallback(
    (value: string) => onUpdate(index, "options", value.split("\n").filter(Boolean)),
    [index, onUpdate],
  );

  const showOptions = field.type === "select" || field.type === "radio" || field.type === "checkbox";

  return (
    <article
      className={`cms-footer-contact-field-card${field.is_visible ? "" : " cms-footer-contact-field-card--muted"}`}
      aria-labelledby={`${baseId}-title`}
    >
      <div className="cms-footer-contact-field-card__rail" aria-hidden="true">
        <span className="cms-footer-contact-field-card__order">{index + 1}</span>
      </div>

      <div className="cms-footer-contact-field-card__main">
        <header className="cms-footer-contact-field-card__head">
          <div className="cms-footer-contact-field-card__identity">
            <span className="cms-footer-contact-field-card__type-icon" aria-hidden="true">
              <span className="material-symbols-outlined">{typeIcon}</span>
            </span>
            <div className="cms-footer-contact-field-card__titles">
              <h3 className="cms-footer-contact-field-card__title" id={`${baseId}-title`}>
                {displayTitle}
              </h3>
              <p className="cms-footer-contact-field-card__subtitle">{typeLabel}</p>
            </div>
          </div>

          <div className="cms-footer-contact-field-card__chips" aria-label="Estado del campo">
            {field.required ? (
              <span className="cms-footer-contact-field-card__chip cms-footer-contact-field-card__chip--required">
                Obligatorio
              </span>
            ) : null}
            {!field.is_visible ? (
              <span className="cms-footer-contact-field-card__chip cms-footer-contact-field-card__chip--hidden">
                Oculto
              </span>
            ) : null}
          </div>

          <div className="cms-footer-contact-field-card__actions">
            <button
              type="button"
              className="cms-footer-contact-field-card__icon-btn"
              disabled={index === 0}
              aria-label={`Subir ${displayTitle}`}
              onClick={() => onMove(index, "up")}
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                arrow_upward
              </span>
            </button>
            <button
              type="button"
              className="cms-footer-contact-field-card__icon-btn"
              disabled={index >= total - 1}
              aria-label={`Bajar ${displayTitle}`}
              onClick={() => onMove(index, "down")}
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                arrow_downward
              </span>
            </button>
            <button
              type="button"
              className="cms-footer-contact-field-card__icon-btn cms-footer-contact-field-card__icon-btn--danger"
              aria-label={`Eliminar ${displayTitle}`}
              onClick={() => onRemove(index)}
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                delete
              </span>
            </button>
          </div>
        </header>

        <div className="cms-footer-contact-field-card__body cms-footer-editor-fields">
          <div className="cms-footer-contact-field-card__grid">
            <label className="field">
              <span>Etiqueta</span>
              <input value={field.label} onChange={(event) => setLabel(event.target.value)} />
            </label>
            <label className="field">
              <span>Nombre (name)</span>
              <input
                value={field.name}
                onChange={(event) => setName(event.target.value)}
                placeholder="ej. email"
                spellCheck={false}
              />
            </label>
            <label className="field">
              <span>Tipo</span>
              <select value={field.type} onChange={(event) => setType(event.target.value as FormFieldType)}>
                {CONTACT_FORM_FIELD_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {CONTACT_FORM_FIELD_TYPE_LABELS[type]}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Placeholder</span>
              <input value={field.placeholder} onChange={(event) => setPlaceholder(event.target.value)} />
            </label>
          </div>

          <div className="cms-footer-contact-field-card__toggles">
            <label className="cms-footer-contact-field-card__toggle">
              <input
                type="checkbox"
                checked={field.required}
                onChange={(event) => setRequired(event.target.checked)}
              />
              <span className="cms-footer-contact-field-card__toggle-copy">
                <strong>Requerido</strong>
                <small>El visitante debe completarlo</small>
              </span>
            </label>
            <label className="cms-footer-contact-field-card__toggle">
              <input
                type="checkbox"
                checked={field.is_visible}
                onChange={(event) => setVisible(event.target.checked)}
              />
              <span className="cms-footer-contact-field-card__toggle-copy">
                <strong>Visible en el footer</strong>
                <small>Desactiva para ocultar sin borrar</small>
              </span>
            </label>
          </div>

          {showOptions ? (
            <label className="field cms-footer-contact-field-card__options">
              <span>Opciones (una por línea)</span>
              <textarea
                rows={3}
                value={field.options.join("\n")}
                onChange={(event) => setOptions(event.target.value)}
                className="min-h-[88px] resize-y"
              />
            </label>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export const FooterContactFormFieldCard = memo(FooterContactFormFieldCardComponent);
