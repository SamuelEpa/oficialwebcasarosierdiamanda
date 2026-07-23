"use client";

import Button from "@/components/ui/Button";
import Switch from "@/components/ui/Switch";
import { AdminInput, AdminTextarea } from "@/components/ui/AdminField";
import {
  DEFAULT_CALENDAR_LABELS_DESCRIPTION,
  DEFAULT_CALENDAR_LABELS_TITLE,
  MAX_CALENDAR_LABELS,
} from "../constants";
import type { ClassEditFormState } from "../hooks/useClassEditForm";
import { CalendarLabelItem } from "./CalendarLabelItem";
import { SectionCard } from "./SectionCard";

type CalendarLabelsSectionProps = {
  form: ClassEditFormState;
};

export function CalendarLabelsSection({ form }: CalendarLabelsSectionProps) {
  const {
    details,
    errors,
    addCalendarLabel,
    updateCalendarLabel,
    toggleCalendarDay,
    removeCalendarLabel,
    moveCalendarLabel,
    updateDetails,
  } = form;

  return (
    <SectionCard
      compact
      description="Crea hasta seis meses puntuales y marca solo los dias destacados para la pagina publica."
      action={(
        <Button
          type="button"
          onClick={addCalendarLabel}
          size="sm"
          disabled={details.calendarLabels.length >= MAX_CALENDAR_LABELS}
        >
          Agregar etiqueta
        </Button>
      )}
    >
      <Switch
        checked={details.showCalendarLabels}
        label="Mostrar etiquetas calendario"
        description="Si esta apagado, no se renderiza nada en el frontend publico."
        onCheckedChange={(checked) => updateDetails({ showCalendarLabels: checked })}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <AdminInput
          label="Título del encabezado"
          value={details.calendarLabelsTitle}
          placeholder={DEFAULT_CALENDAR_LABELS_TITLE}
          onChange={(event) => updateDetails({ calendarLabelsTitle: event.target.value })}
        />
        <AdminTextarea
          label="Texto del encabezado"
          value={details.calendarLabelsDescription}
          placeholder={DEFAULT_CALENDAR_LABELS_DESCRIPTION}
          onChange={(event) => updateDetails({ calendarLabelsDescription: event.target.value })}
          className="min-h-[120px]"
        />
      </div>

      {errors.calendarLabels ? (
        <p className="text-label-md text-error">{errors.calendarLabels}</p>
      ) : null}

      <div className="space-y-4">
        {details.calendarLabels.length ? details.calendarLabels.map((label, index) => (
          <CalendarLabelItem
            key={label.id}
            label={label}
            index={index}
            error={errors[`calendar-label-${index}`]}
            onUpdate={(next) => updateCalendarLabel(index, next)}
            onToggleDay={(day) => toggleCalendarDay(index, day)}
            onMoveUp={() => moveCalendarLabel(index, index - 1)}
            onMoveDown={() => moveCalendarLabel(index, index + 1)}
            onRemove={() => removeCalendarLabel(index)}
          />
        )) : (
          <p className="text-body-md text-on-surface-variant">No hay etiquetas calendario cargadas.</p>
        )}
      </div>
    </SectionCard>
  );
}
