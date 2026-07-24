"use client";

import type { FormField } from "@/lib/cms/types";
import { footerFieldHtmlInputType } from "@/lib/layout/footer-contact-form/fields";

export function FooterContactFormField({
  field,
  preview,
}: {
  field: FormField;
  preview: boolean;
}) {
  const required = !preview && field.required;
  const disabled = preview;
  const id = `footer-field-${field.name || field.id}`;
  const label = field.label || field.name;

  if (field.type === "select") {
    return (
      <div>
        <label htmlFor={id}>{label}</label>
        <select
          id={id}
          className="contact-form__input"
          name={preview ? undefined : field.name}
          disabled={disabled}
          required={required}
        >
          <option value="">{field.placeholder || "Seleccionar"}</option>
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (field.type === "radio" && field.options.length > 0) {
    return (
      <fieldset>
        <legend>{label}</legend>
        {field.options.map((option) => (
          <label key={option} className="contact-form__radio">
            <input
              type="radio"
              name={preview ? undefined : field.name}
              value={option}
              disabled={preview}
              required={required}
            />
            {option}
          </label>
        ))}
      </fieldset>
    );
  }

  if (field.type === "checkbox") {
    if (field.options.length > 0) {
      return (
        <fieldset>
          <legend>{label}</legend>
          {field.options.map((option) => (
            <label key={option} className="contact-form__checkbox">
              <input type="checkbox" name={preview ? undefined : field.name} value={option} disabled={preview} />
              {option}
            </label>
          ))}
        </fieldset>
      );
    }
    return (
      <label className="contact-form__checkbox">
        <input
          type="checkbox"
          name={preview ? undefined : field.name}
          disabled={preview}
          required={required}
        />
        {label}
      </label>
    );
  }

  if (field.type === "textarea") {
    return (
      <div>
        <label htmlFor={id}>{label}</label>
        <textarea
          id={id}
          className="contact-form__textarea"
          name={preview ? undefined : field.name}
          placeholder={field.placeholder}
          disabled={disabled}
          required={required}
        />
      </div>
    );
  }

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className="contact-form__input"
        name={preview ? undefined : field.name}
        type={footerFieldHtmlInputType(field)}
        placeholder={field.placeholder}
        disabled={disabled}
        required={required}
      />
    </div>
  );
}
