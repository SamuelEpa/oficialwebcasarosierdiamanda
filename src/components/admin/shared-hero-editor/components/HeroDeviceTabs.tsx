"use client";

import { HERO_DEVICES } from "../constants";
import type { SharedHeroEditorState } from "../types";

export function HeroDeviceTabs({ editor }: { editor: SharedHeroEditorState }) {
  return (
    <div className="cms-hero-device-tabs" role="tablist" aria-label="Dispositivo para vista previa del hero">
      {HERO_DEVICES.map((item) => (
        <button
          type="button"
          key={item.key}
          onClick={() => editor.setDevice(item.key)}
          className={editor.device === item.key ? "is-active" : ""}
          role="tab"
          aria-selected={editor.device === item.key}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
