"use client";

import { HeroEditorPanel } from "./components/HeroEditorPanel";
import { useHeroEditorPreview } from "./hooks/useHeroEditorPreview";
import { useSharedHeroEditor } from "./hooks/useSharedHeroEditor";
import type { SharedHeroEditorProps } from "./types";

export default function SharedHeroEditor(props: SharedHeroEditorProps) {
  const editor = useSharedHeroEditor(props);
  const previewHero = useHeroEditorPreview(props);

  return <HeroEditorPanel {...props} editor={editor} previewHero={previewHero} />;
}
