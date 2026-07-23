import Switch from "@/components/ui/Switch";
import type { ReactNode } from "react";

type CtaTogglePanelProps = {
  checked: boolean;
  label: string;
  description: string;
  onCheckedChange: (checked: boolean) => void;
  children?: ReactNode;
};

export function CtaTogglePanel({
  checked,
  label,
  description,
  onCheckedChange,
  children,
}: CtaTogglePanelProps) {
  return (
    <div className="space-y-3 rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
      <Switch
        checked={checked}
        label={label}
        description={description}
        onCheckedChange={onCheckedChange}
      />
      {checked ? children : null}
    </div>
  );
}
