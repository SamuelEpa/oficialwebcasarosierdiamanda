"use client";

import { memo, useState } from "react";
import { AdminRichTextField } from "@/components/ui/AdminRichTextField";
import { DETAIL_PAGE_RICH_TEXT_CONTROLS } from "@/components/admin/class-edit/constants/rich-text-controls";
import {
  DEFAULT_DESCRIPTION_TYPOGRAPHY,
  normalizeRichTextTypography,
  type RichTextTypography,
} from "@/lib/cms/rich-text-typography";

export type CmsRichTextFieldProps = {
  label: string;
  value: string;
  typography?: RichTextTypography;
  minHeight?: string;
  placeholder?: string;
  required?: boolean;
  help?: string;
  error?: string;
  maxLength?: number;
  onChange: (value: string) => void;
  onTypographyChange?: (typography: RichTextTypography) => void;
};

/** Standard admin rich-text field (TipTap + typography panel + DETAIL_PAGE controls). */
function CmsRichTextFieldComponent({
  label,
  value,
  typography: typographyProp,
  minHeight = "220px",
  placeholder,
  required,
  help,
  error,
  maxLength,
  onChange,
  onTypographyChange,
}: CmsRichTextFieldProps) {
  const [internalTypography, setInternalTypography] = useState<RichTextTypography>(() =>
    normalizeRichTextTypography(typographyProp ?? DEFAULT_DESCRIPTION_TYPOGRAPHY),
  );
  const typography = typographyProp
    ? normalizeRichTextTypography(typographyProp)
    : internalTypography;

  const handleTypographyChange = (next: RichTextTypography) => {
    const normalized = normalizeRichTextTypography(next);
    if (!typographyProp) setInternalTypography(normalized);
    onTypographyChange?.(normalized);
  };

  return (
    <div className="class-edit-rich-text-stack">
      <AdminRichTextField
        label={label}
        labelPlacement="editor"
        layout="compact"
        value={value}
        typography={typography}
        controls={DETAIL_PAGE_RICH_TEXT_CONTROLS}
        minHeight={minHeight}
        placeholder={placeholder}
        required={required}
        help={help}
        error={error}
        maxLength={maxLength}
        onChange={onChange}
        onTypographyChange={handleTypographyChange}
      />
    </div>
  );
}

export const CmsRichTextField = memo(CmsRichTextFieldComponent);
