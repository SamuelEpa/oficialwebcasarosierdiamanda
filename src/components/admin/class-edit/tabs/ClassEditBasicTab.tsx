"use client";

import type { Offering } from "@/lib/cms/types";
import { BasicInfoSection } from "../components/BasicInfoSection";
import { CtaButtonsSection } from "../components/CtaButtonsSection";
import { PricingSection } from "../components/PricingSection";
import type { ClassEditFormState } from "../hooks/useClassEditForm";

type BasicTabProps = {
  offering: Offering;
  form: ClassEditFormState;
};

export function ClassEditBasicTab({ offering, form }: BasicTabProps) {
  return (
    <>
      <BasicInfoSection form={form} />
      <CtaButtonsSection offering={{ type: offering.type }} form={form} />
      <PricingSection form={form} />
    </>
  );
}
