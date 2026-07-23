import type { ReactNode } from "react";

export function FormField({
  label,
  htmlFor,
  required,
  help,
  error,
  validationKey,
  children,
  className = "",
}: {
  label?: string;
  htmlFor?: string;
  required?: boolean;
  help?: string;
  error?: string;
  validationKey?: string;
  children: ReactNode;
  className?: string;
}) {
  const descriptionId = help || error ? `${htmlFor || validationKey || "field"}-description` : undefined;

  return (
    <div
      className={`space-y-1.5 rounded-xl ${error ? "ring-2 ring-error/30 ring-offset-2 ring-offset-surface-container-lowest" : ""} ${className}`}
      data-validation-key={validationKey}
    >
      {label ? (
        <label htmlFor={htmlFor} className="text-label-md font-bold uppercase tracking-wide text-on-surface-variant">
          {label}{required ? " *" : ""}
        </label>
      ) : null}
      {children}
      {help && !error ? <p id={descriptionId} className="text-label-md text-on-surface-variant/70">{help}</p> : null}
      {error ? <p id={descriptionId} className="text-label-md text-error">{error}</p> : null}
    </div>
  );
}
