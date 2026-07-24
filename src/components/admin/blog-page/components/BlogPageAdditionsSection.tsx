"use client";

import { memo } from "react";
import Card from "@/components/ui/Card";
import Switch from "@/components/ui/Switch";
import PublicFaqSection from "@/features/shared/contextual-sections/PublicFaqSection";
import { SocialGallery } from "@/components/home/SocialGallery";
import type { BlogPageEditorState } from "../hooks/useBlogPageEditor";

function BlogPageAdditionsSectionComponent({
  showFaqSection,
  setShowFaqSection,
  faqGroupId,
  setFaqGroupId,
  showIdeaPromptSection,
  setShowIdeaPromptSection,
  publishedFaqGroups,
  selectedFaqBlock,
  socialGalleryProps,
}: Pick<
  BlogPageEditorState,
  | "showFaqSection"
  | "setShowFaqSection"
  | "faqGroupId"
  | "setFaqGroupId"
  | "showIdeaPromptSection"
  | "setShowIdeaPromptSection"
  | "publishedFaqGroups"
  | "selectedFaqBlock"
  | "socialGalleryProps"
>) {
  return (
    <div className="cms-studio-additions space-y-6">
      <Card padding="lg" className="cms-editor-card cms-studio-additions__card rounded-2xl space-y-6">
        <div className="cms-studio-additions__head">
          <h3 className="text-headline-sm text-on-surface">Adiciones</h3>
          <p className="mt-1 text-body-md text-on-surface-variant">
            Activa bloques complementarios que se muestran al final de la página, antes del footer.
          </p>
        </div>
        <div className="cms-studio-additions__toggle-row space-y-5">
          <Switch
            checked={showFaqSection}
            onCheckedChange={setShowFaqSection}
            label="Incluir FAQ al final de la página"
            description="Muestra preguntas frecuentes publicadas antes de la galería social y del footer."
          />
          <label className="field cms-studio-additions__select block">
            <span className="text-label-md font-semibold text-on-surface">FAQ a mostrar</span>
            <select
              className="mt-2 w-full max-w-md rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md"
              value={faqGroupId}
              onChange={(event) => setFaqGroupId(event.target.value)}
              disabled={!showFaqSection}
            >
              <option value="">Seleccionar FAQ</option>
              {publishedFaqGroups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.title}
                </option>
              ))}
            </select>
          </label>
        </div>
        <Switch
          checked={showIdeaPromptSection}
          onCheckedChange={setShowIdeaPromptSection}
          label="Incluir galería social al final de la página"
          description="Muestra la sección de galería social pública antes del footer."
        />
      </Card>

      <Card padding="lg" className="cms-editor-card cms-studio-additions__card rounded-2xl">
        <div className="cms-studio-additions__head mb-4">
          <h3 className="text-headline-sm text-on-surface">Vista del componente</h3>
          <p className="mt-1 text-body-md text-on-surface-variant">
            Referencia real de las adiciones que se insertarán al final de la página pública.
          </p>
        </div>
        <div
          className="cms-studio-additions__preview overflow-hidden rounded-2xl border border-outline-variant bg-white"
          aria-label="Vista previa de adiciones públicas"
        >
          {showFaqSection ? (
            selectedFaqBlock ? (
              <PublicFaqSection block={selectedFaqBlock} />
            ) : (
              <div className="empty-inline p-8 text-center">
                <strong>No hay una FAQ publicada seleccionada.</strong>
                <span className="mt-1 block text-on-surface-variant">
                  Selecciona un grupo FAQ publicado para mostrarlo en el frontend.
                </span>
              </div>
            )
          ) : null}
          {showIdeaPromptSection ? <SocialGallery {...socialGalleryProps} /> : null}
          {!showFaqSection && !showIdeaPromptSection ? (
            <div className="empty-inline p-8 text-center">
              <strong>Adiciones desactivadas.</strong>
              <span className="mt-1 block text-on-surface-variant">Activa al menos una adición para ver el componente público.</span>
            </div>
          ) : null}
        </div>
      </Card>
    </div>
  );
}

export const BlogPageAdditionsSection = memo(BlogPageAdditionsSectionComponent);
