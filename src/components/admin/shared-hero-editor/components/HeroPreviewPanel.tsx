"use client";

import { SectionCard } from "@/components/admin/class-edit/components/SectionCard";
import type { CmsHeroSettings } from "@/lib/cms/types";
import type { SharedHeroEditorState } from "../types";
import { HeroDeviceTabs } from "./HeroDeviceTabs";
import { HeroPositionPreview } from "./HeroPositionPreview";

type HeroPreviewPanelProps = {
  details: CmsHeroSettings;
  titleFallback: string;
  subtitleFallback?: string;
  editor: SharedHeroEditorState;
};

export function HeroPreviewPanel({
  details,
  titleFallback,
  subtitleFallback,
  editor,
}: HeroPreviewPanelProps) {
  return (
    <SectionCard
      compact
      title="Vista previa"
      description="Vista previa a ancho completo. Cambia dispositivo para comprobar posiciones y composición del hero."
      className="class-edit-hero-preview-card"
      action={<HeroDeviceTabs editor={editor} />}
    >
      <HeroPositionPreview
        details={details}
        titleFallback={titleFallback}
        subtitleFallback={subtitleFallback}
        editor={editor}
      />
    </SectionCard>
  );
}
