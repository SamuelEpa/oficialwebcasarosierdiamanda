"use client";

import AlertDialog from "@/components/ui/AlertDialog";
import type { BlogPostTrashDialogState } from "../hooks/useBlogTableActions";

type BlogPostTrashDialogProps = {
  state: BlogPostTrashDialogState;
  onConfirm: () => void | Promise<void>;
  onClose: () => void;
};

export function BlogPostTrashDialog({ state, onConfirm, onClose }: BlogPostTrashDialogProps) {
  if (!state) return null;

  const isLoading = state.status === "loading";
  const isError = state.status === "error";

  return (
    <AlertDialog
      open
      variant="destructive"
      icon={isLoading ? "progress_activity" : isError ? "error" : "delete"}
      title={
        isLoading ? "Enviando a la papelera" : isError ? "No se pudo eliminar" : "¿Eliminar esta bitácora?"
      }
      description={
        isLoading
          ? "Espera un momento mientras movemos la entrada a la papelera."
          : isError
            ? state.errorMessage
            : `Se moverá «${state.post.title}» a la papelera. Dejará de aparecer en el listado y en el sitio hasta que la restaures.`
      }
      details={
        isLoading || isError
          ? undefined
          : [
              "No se borran imágenes ni bloques todavía.",
              "Puedes restaurar la entrada desde Admin → Papelera.",
              "Para borrarla definitivamente, usa la papelera del CMS.",
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
