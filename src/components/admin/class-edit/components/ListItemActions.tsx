type ListItemActionsProps = {
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onRemove: () => void;
  removeLabel?: string;
  size?: "sm" | "md";
};

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-9 w-9",
};

export function ListItemActions({
  onMoveUp,
  onMoveDown,
  onRemove,
  removeLabel = "Eliminar",
  size = "md",
}: ListItemActionsProps) {
  const buttonClass = `inline-flex ${sizeClasses[size]} items-center justify-center rounded-lg`;

  return (
    <div className="flex items-center gap-1">
      {onMoveUp ? (
        <button
          type="button"
          onClick={onMoveUp}
          className={`${buttonClass} hover:bg-surface-container-high`}
          aria-label="Subir"
        >
          <span className="material-symbols-outlined text-lg">arrow_upward</span>
        </button>
      ) : null}
      {onMoveDown ? (
        <button
          type="button"
          onClick={onMoveDown}
          className={`${buttonClass} hover:bg-surface-container-high`}
          aria-label="Bajar"
        >
          <span className="material-symbols-outlined text-lg">arrow_downward</span>
        </button>
      ) : null}
      <button
        type="button"
        onClick={onRemove}
        className={`${buttonClass} text-error hover:bg-error-container`}
        aria-label={removeLabel}
      >
        <span className="material-symbols-outlined text-lg">delete</span>
      </button>
    </div>
  );
}
