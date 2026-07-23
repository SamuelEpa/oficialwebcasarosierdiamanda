"use client";

import { useId } from "react";
import { FieldLabel } from "./FieldLabel";

export function SelectField({
  label,
  value,
  children,
  onChange,
  help,
}: {
  label: string;
  value: string | number;
  children: React.ReactNode;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  help?: string;
}) {
  const generatedId = useId();

  return (
    <div className="space-y-1.5">
      <FieldLabel htmlFor={generatedId}>{label}</FieldLabel>
      <select
        id={generatedId}
        value={value}
        onChange={onChange}
        className="block w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 text-body-md text-on-surface transition-colors focus:outline-none focus:ring-2 focus:ring-secondary-container"
      >
        {children}
      </select>
      {help ? <p className="text-label-md text-on-surface-variant/70">{help}</p> : null}
    </div>
  );
}
