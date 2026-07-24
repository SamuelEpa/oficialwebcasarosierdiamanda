"use client";

import { memo } from "react";
import Button from "@/components/ui/Button";
import { SectionCard } from "@/components/admin/class-edit/components/SectionCard";
import type { FooterEditorFormState } from "../hooks/useFooterEditorForm";
import { FooterSocialLinkCard } from "./FooterSocialLinkCard";

function FooterSocialLinksSectionComponent({
  form,
  embedded = false,
}: {
  form: FooterEditorFormState;
  embedded?: boolean;
}) {
  const {
    socialLinks,
    addSocialLink,
    updateSocialLink,
    removeSocialLink,
    buttonBackgroundColor,
    buttonContentColor,
  } = form;

  return (
    <SectionCard
      compact={embedded}
      title={embedded ? undefined : "Redes sociales"}
      description={
        embedded
          ? undefined
          : "Usa iconos monocromáticos (blanco) para que el tinte del botón se aplique correctamente."
      }
      action={
        <Button type="button" size="sm" onClick={addSocialLink}>
          Añadir red
        </Button>
      }
    >
      <div className="cms-footer-social-list">
        {socialLinks.length === 0 ? (
          <div className="cms-footer-social-empty">
            <p className="text-body-md text-on-surface-variant">Aún no hay redes configuradas.</p>
            <Button type="button" variant="outlined" size="sm" onClick={addSocialLink}>
              Añadir primera red
            </Button>
          </div>
        ) : (
          socialLinks.map((social, index) => (
            <FooterSocialLinkCard
              key={`social-${index}-${social.url || social.platform || "new"}`}
              index={index}
              social={social}
              buttonBackgroundColor={buttonBackgroundColor}
              buttonContentColor={buttonContentColor}
              onUpdate={updateSocialLink}
              onRemove={removeSocialLink}
            />
          ))
        )}
      </div>
    </SectionCard>
  );
}

export const FooterSocialLinksSection = memo(FooterSocialLinksSectionComponent);
