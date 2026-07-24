"use client";

import { memo } from "react";
import Card from "@/components/ui/Card";
import Switch from "@/components/ui/Switch";
import type { ClassEditorPreviewChrome } from "@/lib/cms/class-editor-preview";
import type { ClassEditFormState } from "../hooks/useClassEditForm";
import { useAdditionsTabHandlers } from "../hooks/useAdditionsTabHandlers";
import { PublicSocialGalleryPreview } from "../preview/PublicSocialGalleryPreview";

function ClassEditAdditionsTabComponent({
  previewChrome,
  form,
}: {
  form: ClassEditFormState;
  previewChrome: ClassEditorPreviewChrome;
}) {
  const { showIdeaPromptSection, setShowIdeaPromptSection } = useAdditionsTabHandlers(form);

  return (
    <>
      <Card padding="lg" className="space-y-5 rounded-2xl">
        <div>
          <h2 className="text-headline-sm text-on-surface">Adiciones</h2>
          <p className="mt-1 text-body-md text-on-surface-variant">
            Activa bloques complementarios que se muestran al final de la página, antes del footer.
          </p>
        </div>
        <Switch
          checked={showIdeaPromptSection}
          label="Incluir galería social al final de la página"
          description='Muestra la sección “Y tu, cuando tuviste tu ultima idea?” con la galería social pública antes del footer.'
          onCheckedChange={setShowIdeaPromptSection}
        />
      </Card>

      <Card padding="lg" className="space-y-5 rounded-2xl">
        <div>
          <h2 className="text-headline-sm text-on-surface">Vista del componente</h2>
          <p className="mt-1 text-body-md text-on-surface-variant">
            Referencia real de la sección que se insertará al final de la página pública.
          </p>
        </div>
        {showIdeaPromptSection ? (
          <div className="overflow-hidden rounded-2xl border border-outline-variant bg-white">
            <PublicSocialGalleryPreview previewChrome={previewChrome} />
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-outline-variant bg-surface-container-low p-8 text-center">
            <p className="text-body-md font-semibold text-on-surface">La galería social está deshabilitada para esta página.</p>
            <p className="mt-1 text-label-md text-on-surface-variant">Activa el switch superior para incluirla antes del footer.</p>
          </div>
        )}
      </Card>
    </>
  );
}

export const ClassEditAdditionsTab = memo(ClassEditAdditionsTabComponent);
