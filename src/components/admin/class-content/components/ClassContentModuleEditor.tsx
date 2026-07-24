"use client";

import { memo } from "react";
import type { ClassOfferingModule } from "@/lib/cms/types";
import type { ClassContentEditor } from "../hooks/useClassContentEditor";
import { ClassContentRichTextField } from "./ClassContentRichTextField";
import { ClassContentTextField } from "./ClassContentTextField";

type ClassContentModuleEditorProps = {
  module: ClassOfferingModule;
  index: number;
  updateModule: ClassContentEditor["updateModule"];
  duplicateModule: ClassContentEditor["duplicateModule"];
  removeModule: ClassContentEditor["removeModule"];
  resolveModuleTypography: ClassContentEditor["resolveModuleTypography"];
};

function ClassContentModuleEditorComponent({
  module,
  index,
  updateModule,
  duplicateModule,
  removeModule,
  resolveModuleTypography,
}: ClassContentModuleEditorProps) {
  return (
    <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-label-md font-bold uppercase tracking-wide text-on-surface-variant">
          Módulo {index + 1}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => duplicateModule(index)}
            className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-label-md font-semibold text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary"
          >
            <span className="material-symbols-outlined text-lg">content_copy</span>
            Duplicar
          </button>
          <button
            type="button"
            onClick={() => removeModule(index)}
            className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-label-md font-semibold text-error transition-colors hover:bg-error-container"
          >
            <span className="material-symbols-outlined text-lg">delete</span>
            Eliminar
          </button>
        </div>
      </div>
      <div className="space-y-3">
        <ClassContentTextField
          label="Título del módulo"
          value={module.title}
          placeholder={`MÓDULO ${index + 1}. TÍTULO DEL MÓDULO`}
          onChange={(event) => updateModule(index, { title: event.target.value })}
        />
        <ClassContentRichTextField
          label="Descripción del módulo"
          value={module.description}
          typography={resolveModuleTypography(module.descriptionTypography)}
          placeholder="Objetivo: comprender la naturaleza técnica de las arcillas..."
          minHeight="140px"
          onChange={(value) => updateModule(index, { description: value })}
          onTypographyChange={(descriptionTypography) => updateModule(index, { descriptionTypography })}
        />
      </div>
    </div>
  );
}

export const ClassContentModuleEditor = memo(ClassContentModuleEditorComponent);
