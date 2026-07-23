"use client";

import Button from "@/components/ui/Button";
import type { ClassEditFormState } from "./hooks/useClassEditForm";

export function ClassEditStickyBar({ form }: { form: ClassEditFormState }) {
  const { isDirty, isSaving, savingIntent, setActiveTab } = form;

  return (
    <div className="admin-sticky-actionbar">
      <span className="admin-sticky-actionbar__meta">{isDirty ? "Cambios sin guardar" : "Cambios al día"}</span>
      <Button type="button" variant="outlined" onClick={() => setActiveTab("preview")}>
        Vista previa
      </Button>
      <Button type="submit" name="intent" value="draft" variant="outlined" disabled={isSaving} aria-busy={isSaving && savingIntent === "draft"}>
        {isSaving && savingIntent === "draft" ? "Guardando..." : "Borrador"}
      </Button>
      <Button type="submit" name="intent" value="publish" disabled={isSaving} aria-busy={isSaving && savingIntent === "publish"}>
        {isSaving && savingIntent === "publish" ? "Publicando..." : "Publicar"}
      </Button>
    </div>
  );
}
