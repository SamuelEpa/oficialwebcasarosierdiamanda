"use client";

import { useMemo } from "react";
import type { Offering } from "@/lib/cms/types";
import { defaultConsultLabel, defaultCtaHref, defaultEnrollLabel } from "../utils";
import type { ClassEditFormState } from "./useClassEditForm";
import { useBasicInfoFields } from "./useBasicInfoFields";

/** CTA placeholders derived from offering type + WhatsApp in details. */
export function useCtaFieldPlaceholders(form: ClassEditFormState, offering: Pick<Offering, "type">) {
  return useMemo(
    () => ({
      consultLabelPlaceholder: defaultConsultLabel(offering.type),
      enrollLabelPlaceholder: defaultEnrollLabel(offering.type),
      ctaHrefPlaceholder: defaultCtaHref(form.details),
    }),
    [form.details, offering.type],
  );
}

/** @deprecated Use useBasicInfoFields + useCtaFieldPlaceholders */
export function useBasicTabFields(form: ClassEditFormState, offering: Offering) {
  const basic = useBasicInfoFields(form);
  const placeholders = useCtaFieldPlaceholders(form, offering);

  return {
    ...placeholders,
    ...basic,
  };
}
