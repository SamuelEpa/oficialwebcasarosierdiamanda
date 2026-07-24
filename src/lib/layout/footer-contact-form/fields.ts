import { DEFAULT_FOOTER_CONTACT_FIELDS } from "@/lib/cms/footer-contact-form-defaults";
import type { Form, FormField } from "@/lib/cms/types";

export function sortedVisibleFooterFormFields(form?: Form | null): FormField[] {
  const source = form?.fields?.length ? form.fields : DEFAULT_FOOTER_CONTACT_FIELDS;
  return [...source]
    .filter((field) => field.is_visible && field.type !== "hidden")
    .sort((a, b) => a.sort_order - b.sort_order);
}

export function footerFieldHtmlInputType(field: FormField): string {
  if (field.type === "phone") return "tel";
  if (field.type === "textarea") return "textarea";
  if (field.type === "email" || field.type === "number" || field.type === "date") return field.type;
  return "text";
}

export function isCompactFooterField(field: FormField) {
  return field.type === "text" || field.type === "email" || field.type === "phone";
}

export type FooterFieldNode = { key: string; kind: "single"; field: FormField } | { key: string; kind: "row"; fields: [FormField, FormField] };

export function layoutFooterFormFieldNodes(fields: FormField[]): FooterFieldNode[] {
  const nodes: FooterFieldNode[] = [];
  let index = 0;

  while (index < fields.length) {
    const field = fields[index];
    const next = fields[index + 1];

    if (next && isCompactFooterField(field) && isCompactFooterField(next)) {
      nodes.push({ key: `row-${field.id}-${next.id}`, kind: "row", fields: [field, next] });
      index += 2;
      continue;
    }

    nodes.push({ key: field.id || field.name || `field-${index}`, kind: "single", field });
    index += 1;
  }

  return nodes;
}
