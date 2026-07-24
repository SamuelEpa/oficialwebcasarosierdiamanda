"use client";

import { memo, useCallback, type CSSProperties } from "react";
import MediaSelectField from "@/components/admin/MediaSelectField";
import Button from "@/components/ui/Button";
import type { SocialLink } from "@/lib/cms/types";
import { footerIconCssUrl } from "../utils";

function FooterSocialLinkCardComponent({
  index,
  social,
  buttonBackgroundColor,
  buttonContentColor,
  onUpdate,
  onRemove,
}: {
  index: number;
  social: SocialLink;
  buttonBackgroundColor: string;
  buttonContentColor: string;
  onUpdate: (index: number, field: keyof SocialLink, value: string) => void;
  onRemove: (index: number) => void;
}) {
  const handlePlatform = useCallback(
    (value: string) => onUpdate(index, "platform", value),
    [index, onUpdate],
  );
  const handleLabel = useCallback((value: string) => onUpdate(index, "label", value), [index, onUpdate]);
  const handleUrl = useCallback((value: string) => onUpdate(index, "url", value), [index, onUpdate]);
  const handleIcon = useCallback((url: string) => onUpdate(index, "icon_url", url), [index, onUpdate]);
  const handleRemove = useCallback(() => onRemove(index), [index, onRemove]);

  const iconStyle = {
    "--cms-footer-icon-bg": buttonBackgroundColor,
    "--cms-footer-icon-fg": buttonContentColor,
    "--cms-footer-icon-url": footerIconCssUrl(social.icon_url ?? ""),
  } as CSSProperties;

  return (
    <article className="cms-footer-social-card">
      <div className="cms-footer-editor-fields grid gap-4 md:grid-cols-2">
        <label className="field">
          <span>Plataforma</span>
          <input value={social.platform} onChange={(event) => handlePlatform(event.target.value)} placeholder="Instagram" />
        </label>
        <label className="field">
          <span>Etiqueta accesible</span>
          <input
            value={social.label}
            onChange={(event) => handleLabel(event.target.value)}
            placeholder="Instagram Casa Rosier"
          />
        </label>
        <label className="field md:col-span-2">
          <span>Enlace</span>
          <input value={social.url} onChange={(event) => handleUrl(event.target.value)} placeholder="https://..." />
        </label>
        <div className="cms-footer-icon-field md:col-span-2" style={iconStyle}>
          <MediaSelectField
            label="Icono"
            value={social.icon_url ?? ""}
            onChange={handleIcon}
            previewClassName="cms-footer-icon-preview"
          />
        </div>
      </div>
      <div className="cms-footer-social-card__actions">
        <Button type="button" variant="ghost" size="sm" onClick={handleRemove}>
          Eliminar red
        </Button>
      </div>
    </article>
  );
}

export const FooterSocialLinkCard = memo(FooterSocialLinkCardComponent);
