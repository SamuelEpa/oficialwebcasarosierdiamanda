"use client";

import AlertDialog from "@/components/ui/AlertDialog";
import type { TeacherTrashDialogState } from "../hooks/useTeachersTableActions";

type TeacherTrashDialogProps = {
  state: TeacherTrashDialogState;
  onConfirm: () => void | Promise<void>;
  onClose: () => void;
};

export function TeacherTrashDialog({ state, onConfirm, onClose }: TeacherTrashDialogProps) {
  if (!state) return null;

  const isLoading = state.status === "loading";
  const isError = state.status === "error";

  return (
    <AlertDialog
      open
      variant="destructive"
      icon={isLoading ? "progress_activity" : isError ? "error" : "delete"}
      title={
        isLoading ? "Enviando a la papelera" : isError ? "No se pudo eliminar" : "¿Eliminar este especialista?"
      }
      description={
        isLoading
          ? "Espera un momento mientras movemos el perfil a la papelera."
          : isError
            ? state.errorMessage
            : `Se moverá «${state.teacher.name}» a la papelera. Dejará de aparecer en El Estudio hasta que lo restaures.`
      }
      details={
        isLoading || isError
          ? undefined
          : [
              "No se borra la imagen todavía.",
              "Puedes restaurarlo desde Admin → Papelera.",
              "Para borrarlo definitivamente, usa la papelera del CMS.",
            ]
      }
      confirmLabel={isLoading ? "Procesando…" : isError ? "Reintentar" : "Mover a papelera"}
      cancelLabel="Cancelar"
      loading={isLoading}
      hideCancel={isLoading}
      onConfirm={onConfirm}
      onClose={onClose}
    />
  );
}
