"use client";

import { memo } from "react";
import MediaSelectField from "@/components/admin/MediaSelectField";
import { AdminInput, AdminTextarea } from "@/components/ui/AdminField";
import Switch from "@/components/ui/Switch";
import { TESTIMONIAL_FIELD_DEFS, type TestimonialFieldKey } from "../formFields";
import type { TestimonialFormErrors, TestimonialFormFields as FormValues } from "../types";

type TestimonialFormFieldsProps = {
  fields: FormValues;
  errors?: TestimonialFormErrors;
  disabled?: boolean;
  onFieldChange: <K extends TestimonialFieldKey>(key: K, value: FormValues[K]) => void;
};

function TestimonialFormFieldsComponent({
  fields,
  errors,
  disabled,
  onFieldChange,
}: TestimonialFormFieldsProps) {
  return (
    <section className="form-block testimonials-form-fields">
      <div className="testimonials-form-section-intro">
        <h3>Información del testimonio</h3>
        <p className="muted">Los cambios se reflejan al instante en la vista previa.</p>
      </div>

      <div className="grid-2 testimonials-form-fields__grid">
        {TESTIMONIAL_FIELD_DEFS.map((def) => {
          const spanClass = def.span === 2 ? "span-2" : "";
          const error = errors?.[def.key];

          if (def.type === "media") {
            return (
              <div key={def.key} className={spanClass}>
                <MediaSelectField
                  label={def.label}
                  value={String(fields[def.key] ?? "")}
                  onChange={(value) => onFieldChange(def.key, value as FormValues[typeof def.key])}
                  className="testimonial-avatar-field"
                />
                {def.help ? <p className="testimonials-form-fields__help">{def.help}</p> : null}
              </div>
            );
          }

          if (def.type === "switch") {
            return (
              <div key={def.key} className={spanClass}>
                <Switch
                  checked={Boolean(fields[def.key])}
                  label={def.label}
                  description={def.description}
                  disabled={disabled}
                  onCheckedChange={(checked) =>
                    onFieldChange(def.key, checked as FormValues[typeof def.key])
                  }
                />
              </div>
            );
          }

          if (def.type === "textarea") {
            const textValue = String(fields[def.key] ?? "");
            const max = def.maxLength;
            return (
              <div key={def.key} className={spanClass}>
                <AdminTextarea
                  label={def.label}
                  value={textValue}
                  placeholder={def.placeholder}
                  rows={5}
                  maxLength={max}
                  disabled={disabled}
                  error={error}
                  help={def.help}
                  onChange={(event) =>
                    onFieldChange(def.key, event.target.value as FormValues[typeof def.key])
                  }
                />
                {max ? (
                  <small
                    className={`testimonials-form-fields__counter${
                      textValue.length >= max ? " is-limit" : ""
                    }`}
                  >
                    {textValue.length}/{max}
                  </small>
                ) : null}
              </div>
            );
          }

          return (
            <div key={def.key} className={spanClass}>
              <AdminInput
                label={def.label}
                type={def.type === "number" ? "number" : "text"}
                value={
                  def.type === "number"
                    ? Number(fields[def.key] ?? 0)
                    : String(fields[def.key] ?? "")
                }
                placeholder={def.placeholder}
                required={def.required}
                disabled={disabled}
                autoComplete={def.autoComplete}
                min={def.min}
                step={def.step}
                error={error}
                help={def.help}
                onChange={(event) => {
                  if (def.type === "number") {
                    onFieldChange(def.key, Number(event.target.value) as FormValues[typeof def.key]);
                    return;
                  }
                  onFieldChange(def.key, event.target.value as FormValues[typeof def.key]);
                }}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export const TestimonialFormFields = memo(TestimonialFormFieldsComponent);
