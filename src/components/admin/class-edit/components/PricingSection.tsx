"use client";

import Button from "@/components/ui/Button";
import { AdminInput } from "@/components/ui/AdminField";
import type { ClassEditFormState } from "../hooks/useClassEditForm";
import { ListItemActions } from "./ListItemActions";
import { SectionCard } from "./SectionCard";

type PricingSectionProps = {
  form: ClassEditFormState;
};

export function PricingSection({ form }: PricingSectionProps) {
  const { details, errors, addPricing, updatePricing, removePricing } = form;

  return (
    <SectionCard
      compact
      action={(
        <Button type="button" onClick={addPricing} size="sm">
          Agregar opción
        </Button>
      )}
    >
      <div className="space-y-3">
        {details.pricing.length ? details.pricing.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-1 gap-3 rounded-xl border border-outline-variant p-4 md:grid-cols-[1fr_140px_auto] md:items-start"
          >
            <AdminInput
              label="Descripción"
              placeholder="Bono 4 clases"
              value={item.description}
              onChange={(event) => updatePricing(index, { description: event.target.value })}
            />
            <AdminInput
              label="Precio (€)"
              type="number"
              min={0}
              value={item.price ?? ""}
              error={errors[`pricing-${index}`]}
              validationKey={`pricing-${index}`}
              onChange={(event) => updatePricing(index, {
                price: event.target.value === "" ? null : Number(event.target.value),
              })}
            />
            <div className="mt-7">
              <ListItemActions
                onRemove={() => removePricing(index)}
                removeLabel="Eliminar precio"
              />
            </div>
          </div>
        )) : (
          <p className="text-body-md text-on-surface-variant">No hay opciones de precio cargadas.</p>
        )}
      </div>
    </SectionCard>
  );
}
