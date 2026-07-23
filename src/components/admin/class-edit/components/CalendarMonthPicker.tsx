"use client";

import { WEEKDAY_LABELS } from "../constants";

type CalendarMonthPickerProps = {
  selectedDays: number[];
  monthDays: Array<number | null>;
  onToggleDay: (day: number) => void;
};

export function CalendarMonthPicker({ selectedDays, monthDays, onToggleDay }: CalendarMonthPickerProps) {
  return (
    <div className="max-w-[520px] rounded-2xl border border-outline-variant bg-surface p-3">
      <div className="mb-2 grid grid-cols-7 gap-1 text-center text-label-sm uppercase text-on-surface-variant">
        {WEEKDAY_LABELS.map((day) => <span key={day}>{day}</span>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {monthDays.map((day, dayIndex) => day ? (
          <button
            key={day}
            type="button"
            onClick={() => onToggleDay(day)}
            className={`aspect-square rounded-full text-label-lg font-bold transition-colors ${
              selectedDays.includes(day)
                ? "bg-[#ff5a1f] text-white shadow-[0_8px_18px_rgba(255,90,31,0.35)]"
                : "text-on-surface hover:bg-surface-container-high"
            }`}
            aria-pressed={selectedDays.includes(day)}
          >
            {day}
          </button>
        ) : (
          <span key={`empty-${dayIndex}`} aria-hidden="true" />
        ))}
      </div>
    </div>
  );
}
