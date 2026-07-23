"use client";

import { useSharedHeroEditor } from "./hooks/useSharedHeroEditor";
import { HeroEditorPanel } from "./components/HeroEditorPanel";
import type { SharedHeroEditorProps } from "./types";

export default function SharedHeroEditor({
  details,
  titleFallback,
  subtitleFallback,
  onChange,
}: SharedHeroEditorProps) {
  const editor = useSharedHeroEditor({ details, onChange });

  return (
    <HeroEditorPanel
      details={details}
      titleFallback={titleFallback}
      subtitleFallback={subtitleFallback}
      editor={editor}
      onChange={onChange}
    />
  );
}
