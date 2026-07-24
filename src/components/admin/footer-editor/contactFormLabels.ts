export const CONTACT_FORM_FIELD_TYPE_LABELS: Record<string, string> = {
  text: "Texto",
  email: "Email",
  phone: "Teléfono",
  textarea: "Área de texto",
  select: "Select",
  checkbox: "Checkbox",
  radio: "Radio",
  date: "Fecha",
  number: "Número",
  hidden: "Oculto",
};

/** Material Symbols para la UI del editor (no emoji). */
export const CONTACT_FORM_FIELD_TYPE_ICONS: Record<string, string> = {
  text: "short_text",
  email: "mail",
  phone: "call",
  textarea: "notes",
  select: "arrow_drop_down_circle",
  checkbox: "check_box",
  radio: "radio_button_checked",
  date: "calendar_today",
  number: "numbers",
  hidden: "visibility_off",
};

export const CONTACT_FORM_FIELD_TYPES = [
  "text",
  "email",
  "phone",
  "textarea",
  "select",
  "checkbox",
  "radio",
  "date",
  "number",
  "hidden",
] as const;
