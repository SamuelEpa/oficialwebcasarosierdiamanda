import type { InputHTMLAttributes } from "react";

export function ClassContentFieldLabel({ children }: { children: string }) {
  return (
    <label className="text-label-md font-bold uppercase tracking-wide text-on-surface-variant">
      {children}
    </label>
  );
}

export function ClassContentTextField({
  label,
  help,
  error,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; help?: string; error?: string }) {
  return (
    <div className="space-y-1.5">
      <ClassContentFieldLabel>{label}</ClassContentFieldLabel>
      <input
        {...props}
        className={`block w-full rounded-xl border bg-surface-container-lowest px-4 py-3 text-body-md text-on-surface transition-colors placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-secondary-container ${
          error ? "border-error" : "border-outline-variant"
        }`}
      />
      {help && !error ? <p className="text-label-md text-on-surface-variant/70">{help}</p> : null}
      {error ? <p className="text-label-md text-error">{error}</p> : null}
    </div>
  );
}
