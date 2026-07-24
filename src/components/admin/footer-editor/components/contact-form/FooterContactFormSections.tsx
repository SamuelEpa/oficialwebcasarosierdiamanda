"use client";

import { memo } from "react";
import Button from "@/components/ui/Button";
import { SectionCard } from "@/components/admin/class-edit/components/SectionCard";
import type { FooterContactFormEditor } from "../../hooks/useFooterContactFormEditor";
import { FooterContactFormFieldCard } from "./FooterContactFormFieldCard";

function FooterContactFormFieldsSectionComponent({
  contact,
  embedded = false,
}: {
  contact: FooterContactFormEditor;
  embedded?: boolean;
}) {
  const count = contact.fields.length;
  const visibleCount = contact.fields.filter((field) => field.is_visible).length;

  return (
    <SectionCard
      compact={embedded}
      title={embedded ? undefined : "Campos del formulario"}
      description={
        embedded
          ? undefined
          : "Etiquetas y tipos de los inputs de la columna izquierda del footer."
      }
      action={
        <Button type="button" size="sm" onClick={contact.addField}>
          <span className="material-symbols-outlined cms-footer-form-fields-add-icon" aria-hidden="true">
            add
          </span>
          Añadir campo
        </Button>
      }
    >
      {count > 0 ? (
        <p className="cms-footer-form-fields-summary" aria-live="polite">
          <span className="cms-footer-form-fields-summary__count">
            {count} {count === 1 ? "campo" : "campos"}
          </span>
          <span className="cms-footer-form-fields-summary__dot" aria-hidden="true">
            ·
          </span>
          <span className="cms-footer-form-fields-summary__visible">
            {visibleCount} visibles en la preview
          </span>
        </p>
      ) : null}

      <div className="cms-footer-form-fields-list">
        {count === 0 ? (
          <div className="cms-footer-form-fields-empty">
            <span className="cms-footer-form-fields-empty__icon material-symbols-outlined" aria-hidden="true">
              edit_note
            </span>
            <p className="cms-footer-form-fields-empty__title">Sin campos todavía</p>
            <p className="cms-footer-form-fields-empty__text">
              Añade nombre, email, teléfono o un comentario. Lo verás al instante en la vista previa del footer.
            </p>
            <Button type="button" variant="outlined" size="sm" onClick={contact.addField}>
              Crear primer campo
            </Button>
          </div>
        ) : (
          contact.fields.map((field, index) => (
            <FooterContactFormFieldCard
              key={field.id || `field-${index}`}
              field={field}
              index={index}
              total={count}
              onUpdate={contact.updateField}
              onRemove={contact.removeField}
              onMove={contact.moveField}
            />
          ))
        )}
      </div>
    </SectionCard>
  );
}

export const FooterContactFormFieldsSection = memo(FooterContactFormFieldsSectionComponent);
