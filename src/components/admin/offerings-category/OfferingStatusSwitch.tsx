"use client";

type OfferingStatusSwitchProps = {
  checked: boolean;
  disabled?: boolean;
  loading?: boolean;
  offeringTitle: string;
  onCheckedChange: (checked: boolean) => void;
};

export function OfferingStatusSwitch({
  checked,
  disabled = false,
  loading = false,
  offeringTitle,
  onCheckedChange,
}: OfferingStatusSwitchProps) {
  const isDisabled = disabled || loading;

  return (
    <div className="offerings-category-status-switch">
      <p className={`offerings-category-status-switch__title${checked ? " is-active" : ""}`}>
        {checked ? "Activo" : "Inactivo"}
      </p>
      <button
        type="button"
        role="switch"
        className={`offerings-category-status-switch__control${checked ? " is-active" : ""}${loading ? " is-loading" : ""}`}
        aria-checked={checked}
        aria-label={`${checked ? "Desactivar" : "Activar"} ${offeringTitle}`}
        disabled={isDisabled}
        onClick={() => onCheckedChange(!checked)}
      >
        <span className="offerings-category-status-switch__track" aria-hidden="true">
          <span className="offerings-category-status-switch__thumb" />
        </span>
      </button>
      <p className="offerings-category-status-switch__hint">
        {checked ? "Visible en el sitio" : "Solo en admin"}
      </p>
    </div>
  );
}
