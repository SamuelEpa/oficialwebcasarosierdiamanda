"use client";

import { useCallback, useMemo } from "react";
import type { Offering } from "@/lib/cms/types";
import { useCtaFieldPlaceholders } from "./useBasicTabFields";
import type { ClassEditFormState } from "./useClassEditForm";

export function useCtaSectionHandlers(form: ClassEditFormState, offering: Pick<Offering, "type">) {
  const { details, updateDetails } = form;
  const placeholders = useCtaFieldPlaceholders(form, offering);

  const setShowConsultCta = useCallback(
    (showConsultCta: boolean) => updateDetails({ showConsultCta }),
    [updateDetails],
  );

  const setShowEnrollCta = useCallback(
    (showEnrollCta: boolean) => updateDetails({ showEnrollCta }),
    [updateDetails],
  );

  const setConsultLabel = useCallback(
    (ctaConsultLabel: string) => updateDetails({ ctaConsultLabel }),
    [updateDetails],
  );

  const setConsultHref = useCallback(
    (href: string) => updateDetails({ ctaConsultHref: href, ctaHref: href }),
    [updateDetails],
  );

  const setEnrollLabel = useCallback(
    (ctaEnrollLabel: string) => updateDetails({ ctaEnrollLabel }),
    [updateDetails],
  );

  const setEnrollHref = useCallback(
    (ctaEnrollHref: string) => updateDetails({ ctaEnrollHref }),
    [updateDetails],
  );

  return useMemo(
    () => ({
      details,
      placeholders,
      setShowConsultCta,
      setShowEnrollCta,
      setConsultLabel,
      setConsultHref,
      setEnrollLabel,
      setEnrollHref,
    }),
    [
      details,
      placeholders,
      setConsultHref,
      setConsultLabel,
      setEnrollHref,
      setEnrollLabel,
      setShowConsultCta,
      setShowEnrollCta,
    ],
  );
}
