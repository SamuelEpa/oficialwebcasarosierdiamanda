"use client";

import { useId } from "react";
import { FormField } from "@/components/ui/FormField";

export function ScaleField({
  label,
  value,
  min = 0.5,
  max = 2,
  step = 0.05,
  help,
  onChange,
}: {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  help?: string;
  onChange: (value: number) => void;
}) {
  const inputId = useId();

  return (
    <FormField label={label} htmlFor={inputId} help={help}>
      <div className="cms-hero-menu-scale">
        <div className="cms-hero-menu-scale__head">
          <span aria-hidden="true">{value.toFixed(2)}x</span>
        </div>
        <input
          id={inputId}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          aria-valuetext={`${value.toFixed(2)}x`}
          onChange={(event) => onChange(Number(event.target.value))}
        />
      </div>
    </FormField>
  );
}
