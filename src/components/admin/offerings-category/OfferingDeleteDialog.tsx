"use client";

import AlertDialog from "@/components/ui/AlertDialog";
import type { OfferingDeleteDialogState } from "./hooks/useOfferingTableActions";

type OfferingDeleteDialogProps = {
  state: OfferingDeleteDialogState;
  typeLabel: string;
  onConfirm: () => void | Promise<void>;
  onClose: () => void;
};

export function OfferingDeleteDialog({
  state,
  typeLabel,
  onConfirm,
  onClose,
}: OfferingDeleteDialogProps) {
  if (!state) return null;

  const isPermanent = state.mode === "delete";
  const isLoading = state.status === "loading";
  const isError = state.status === "error";

  return (
    <AlertDialog
      open
      variant={isPermanent || state.mode === "trash" ? "destructive" : "default"}
      icon={isLoading ? "progress_activity" : isError ? "error" : "warning"}
      title={
        isLoading
          ? isPermanent
            ? "Eliminando permanentemente"
            : "Enviando a la papelera"
          : isError
            ? "No se pudo completar"
            : isPermanent
              ? "Eliminar permanentemente"
              : `Eliminar ${typeLabel.toLowerCase()}`
      }
      description={
        isLoading
          ? "Espera un momento mientras procesamos la solicitud."
          : isError
            ? state.errorMessage
            : isPermanent
              ? `Se eliminará "${state.offering.title}" de forma permanente junto con sus imágenes en el bucket de almacenamiento.`
              : `Se moverá "${state.offering.title}" a la papelera. Podrás restaurarlo después desde Papelera.`
      }
      details={
        isLoading || isError
          ? undefined
          : isPermanent
            ? [
                "Esta acción no se puede deshacer.",
                "Se borrarán imágenes y archivos asociados en Supabase Storage.",
                "También se eliminarán ajustes de hero, tarjeta Home y textos vinculados.",
              ]
            : [
                "El contenido dejará de mostrarse en el listado actual.",
                "Las imágenes se conservan hasta una eliminación definitiva desde Papelera.",
              ]
      }
      confirmLabel={
        isLoading
          ? "Procesando..."
          : isError
            ? "Reintentar"
            : isPermanent
              ? "Eliminar definitivamente"
              : "Mover a papelera"
      }
      cancelLabel="Cancelar"
      loading={isLoading}
      hideCancel={isLoading}
      onConfirm={onConfirm}
      onClose={onClose}
    />
  );
}
