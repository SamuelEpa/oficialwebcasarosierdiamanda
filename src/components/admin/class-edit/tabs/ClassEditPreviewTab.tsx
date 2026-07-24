"use client";

import { memo } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import type { ClassEditorPreviewChrome } from "@/lib/cms/class-editor-preview";
import type { Offering } from "@/lib/cms/types";
import { useClassEditPreviewItem } from "../hooks/useClassEditPreviewItem";
import type { ClassEditFormState } from "../hooks/useClassEditForm";
import { PreviewPane } from "../preview/PreviewPane";

function ClassEditPreviewTabComponent({
  offering,
  form,
  previewChrome,
}: {
  offering: Offering;
  form: ClassEditFormState;
  previewChrome: ClassEditorPreviewChrome;
}) {
  const { title, slug, subtitle, description, seoTitle, seoDescription, status, details, isSaving, savingIntent } = form;
  const previewItem = useClassEditPreviewItem({
    offeringType: offering.type,
    title,
    slug,
    subtitle,
    description,
    seoTitle,
    seoDescription,
    details,
  });

  return (
    <>
      <PreviewPane
        previewItem={previewItem}
        status={status}
        details={details}
        previewChrome={previewChrome}
        seoTitle={seoTitle}
        seoDescription={seoDescription}
        title={title}
        slug={slug}
        description={description}
      />
      <Card padding="lg" className="space-y-5 rounded-2xl">
        <h2 className="text-headline-sm text-on-surface">Publicación</h2>
        <p className="text-body-md text-on-surface-variant">
          Guarda como borrador o publica esta página. Al publicar, este producto queda listo para mostrarse en su categoría correspondiente.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button
            type="submit"
            name="intent"
            value="draft"
            variant="outlined"
            disabled={isSaving}
            aria-busy={isSaving && savingIntent === "draft"}
          >
            {isSaving && savingIntent === "draft" ? "Guardando..." : "Borrador"}
          </Button>
          <Button type="submit" name="intent" value="publish" disabled={isSaving} aria-busy={isSaving && savingIntent === "publish"}>
            {isSaving && savingIntent === "publish" ? "Publicando..." : "Publicar"}
          </Button>
        </div>
      </Card>
    </>
  );
}

export const ClassEditPreviewTab = memo(ClassEditPreviewTabComponent);
