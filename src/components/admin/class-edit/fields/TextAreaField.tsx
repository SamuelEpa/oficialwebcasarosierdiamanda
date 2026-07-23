"use client";

import { useId } from "react";
import { FieldLabel } from "./FieldLabel";

export function TextAreaField({
  label,
  error,
  help,
  validationKey,
  value,
  id,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  help?: string;
  validationKey?: string;
}) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const descriptionId = error || help ? `${inputId}-description` : undefined;

  return (
    <div
      className={`space-y-1.5 rounded-xl ${error ? "ring-2 ring-error/30 ring-offset-2 ring-offset-surface-container-lowest" : ""}`}
      data-validation-key={validationKey}
    >
      <FieldLabel htmlFor={inputId}>{label}</FieldLabel>
      <textarea
        {...props}
        id={inputId}
        aria-describedby={descriptionId}
        aria-invalid={Boolean(error) || undefined}
        value={value ?? ""}
        className={`block min-h-[110px] w-full rounded-xl border bg-surface-container-lowest px-4 py-3 text-body-md text-on-surface transition-colors placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-secondary-container ${
          error ? "border-error" : "border-outline-variant"
        } ${props.className ?? ""}`}
      />
      {help && !error ? <p id={descriptionId} className="text-label-md text-on-surface-variant/70">{help}</p> : null}
      {error ? <p id={descriptionId} className="text-label-md text-error">{error}</p> : null}
    </div>
  );
}
