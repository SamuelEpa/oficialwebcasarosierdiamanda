"use client";

import { memo, type ReactNode } from "react";
import { SocialGallery } from "@/components/home/SocialGallery";
import Card from "@/components/ui/Card";
import Switch from "@/components/ui/Switch";
import PublicFaqSection from "@/features/shared/contextual-sections/PublicFaqSection";
import type { FaqGroup } from "@/lib/cms/types";
import type { buildSocialGalleryProps } from "@/components/admin/page-editor/utils/socialGalleryProps";
import type { getSelectedFaqBlock } from "@/lib/cms/faq-selection";

export type PageAdditionsSectionProps = {
  showFaqSection: boolean;
  setShowFaqSection: (value: boolean) => void;
  faqGroupId: string;
  setFaqGroupId: (value: string) => void;
  showIdeaPromptSection: boolean;
  setShowIdeaPromptSection: (value: boolean) => void;
  publishedFaqGroups: FaqGroup[];
  selectedFaqBlock: ReturnType<typeof getSelectedFaqBlock>;
  socialGalleryProps: ReturnType<typeof buildSocialGalleryProps>;
};

function PreviewEmpty({ title, description }: { title: string; description: string }) {
  return (
    <div className="cms-studio-additions__empty">
      <span className="cms-studio-additions__empty-kicker" aria-hidden="true">
        Preview
      </span>
      <strong>{title}</strong>
      <span>{description}</span>
    </div>
  );
}

function PreviewStage({ children }: { children: ReactNode }) {
  return (
    <div
      className="cms-studio-additions__preview"
      aria-label="Vista previa de adiciones públicas"
    >
      <div className="cms-studio-additions__preview-toolbar">
        Vista previa · Adiciones al final de la página
      </div>
      <div className="cms-studio-additions__preview-stage">{children}</div>
    </div>
  );
}

function PageAdditionsSectionComponent({
  showFaqSection,
  setShowFaqSection,
  faqGroupId,
  setFaqGroupId,
  showIdeaPromptSection,
  setShowIdeaPromptSection,
  publishedFaqGroups,
  selectedFaqBlock,
  socialGalleryProps,
}: PageAdditionsSectionProps) {
  let previewBody: ReactNode = null;

  if (!showFaqSection && !showIdeaPromptSection) {
    previewBody = (
      <PreviewEmpty
        title="Adiciones desactivadas."
        description="Activa al menos una adición para ver el componente público."
      />
    );
  } else {
    previewBody = (
      <>
        {showFaqSection ? (
          selectedFaqBlock ? (
            <PublicFaqSection block={selectedFaqBlock} className="public-faq--embed" />
          ) : (
            <PreviewEmpty
              title="No hay una FAQ publicada seleccionada."
              description="Selecciona un grupo FAQ publicado para mostrarlo en el frontend."
            />
          )
        ) : null}
        {showIdeaPromptSection ? (
          <div className="cms-studio-additions__social-wrap">
            <SocialGallery {...socialGalleryProps} />
          </div>
        ) : null}
      </>
    );
  }

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
        <PreviewStage>{previewBody}</PreviewStage>
      </Card>
    </div>
  );
}

export const PageAdditionsSection = memo(PageAdditionsSectionComponent);
