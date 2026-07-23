"use client";

import { useEffect, useId, type ReactNode } from "react";
import Button from "./Button";

type AlertDialogVariant = "default" | "destructive";

export type AlertDialogProps = {
  open: boolean;
  variant?: AlertDialogVariant;
  icon?: string;
  title: string;
  description?: string;
  details?: string[];
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  hideCancel?: boolean;
  onConfirm?: () => void | Promise<void>;
  onClose: () => void;
  children?: ReactNode;
};

export default function AlertDialog({
  open,
  variant = "default",
  icon = "info",
  title,
  description,
  details,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  loading = false,
  hideCancel = false,
  onConfirm,
  onClose,
  children,
}: AlertDialogProps) {
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !loading) onClose();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [loading, onClose, open]);

  if (!open) return null;

  return (
    <div className="alert-dialog" role="alertdialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={description ? descriptionId : undefined}>
      <button
        type="button"
        className="alert-dialog__backdrop"
        aria-label="Cerrar diálogo"
        disabled={loading}
        onClick={onClose}
      />
      <div className={`alert-dialog__panel alert-dialog__panel--${variant}`}>
        <div className={`alert-dialog__icon${loading ? " alert-dialog__icon--loading" : ""}`} aria-hidden="true">
          <span className="material-symbols-outlined">{icon}</span>
        </div>

        <div className="alert-dialog__body">
          <h2 id={titleId} className="alert-dialog__title">
            {title}
          </h2>
          {description ? (
            <p id={descriptionId} className="alert-dialog__description">
              {description}
            </p>
          ) : null}
          {details?.length ? (
            <ul className="alert-dialog__details">
              {details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          ) : null}
          {children}
        </div>

        <div className="alert-dialog__actions">
          {!hideCancel ? (
            <Button type="button" variant="ghost" size="sm" disabled={loading} onClick={onClose}>
              {cancelLabel}
            </Button>
          ) : null}
          <Button
            type="button"
            variant={variant === "destructive" ? "solid" : "outlined"}
            size="sm"
            disabled={loading}
            onClick={() => void onConfirm?.()}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
