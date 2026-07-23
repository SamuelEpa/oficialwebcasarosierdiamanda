"use client";

import { useId } from "react";
import { FormField } from "./FormField";

const inputBase =
  "block w-full rounded-xl border bg-surface-container-lowest px-4 py-3 text-body-md text-on-surface transition-colors placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-secondary-container";

export function AdminInput({
  label,
  required,
  error,
  help,
  validationKey,
  id,
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  required?: boolean;
  error?: string;
  help?: string;
  validationKey?: string;
}) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const descriptionId = error || help ? `${inputId}-description` : undefined;

  return (
    <FormField label={label} htmlFor={inputId} required={required} help={help} error={error} validationKey={validationKey}>
      <input
        {...props}
        id={inputId}
        aria-describedby={descriptionId}
        aria-invalid={Boolean(error) || undefined}
        value={props.value ?? ""}
        className={`${inputBase} ${error ? "border-error" : "border-outline-variant"} ${className}`}
      />
    </FormField>
  );
}

export function AdminTextarea({
  label,
  error,
  help,
  validationKey,
  id,
  className = "",
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
    <FormField label={label} htmlFor={inputId} help={help} error={error} validationKey={validationKey}>
      <textarea
        {...props}
        id={inputId}
        aria-describedby={descriptionId}
        aria-invalid={Boolean(error) || undefined}
        value={props.value ?? ""}
        className={`${inputBase} min-h-[110px] resize-y ${error ? "border-error" : "border-outline-variant"} ${className}`}
      />
    </FormField>
  );
}

export function AdminSelect({
  label,
  help,
  id,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  help?: string;
}) {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <FormField label={label} htmlFor={inputId} help={help}>
      <select
        {...props}
        id={inputId}
        className={`${inputBase} border-outline-variant ${props.className ?? ""}`}
      >
        {children}
      </select>
    </FormField>
  );
}
