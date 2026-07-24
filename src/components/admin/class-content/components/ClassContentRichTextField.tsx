"use client";

import { memo } from "react";
import { AdminRichTextField } from "@/components/ui/AdminRichTextField";
import { DETAIL_PAGE_RICH_TEXT_CONTROLS } from "@/components/admin/class-edit/constants/rich-text-controls";
import type { RichTextTypography } from "@/lib/cms/rich-text-typography";

type ClassContentRichTextFieldProps = {
  label: string;
  value: string;
  typography: RichTextTypography;
  minHeight?: string;
  placeholder?: string;
  help?: string;
  onChange: (value: string) => void;
  onTypographyChange: (typography: RichTextTypography) => void;
};

function ClassContentRichTextFieldComponent({
  label,
  value,
  typography,
  minHeight = "160px",
  placeholder,
  help,
  onChange,
  onTypographyChange,
}: ClassContentRichTextFieldProps) {
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
        help={help}
        onChange={onChange}
        onTypographyChange={onTypographyChange}
      />
    </div>
  );
}

export const ClassContentRichTextField = memo(ClassContentRichTextFieldComponent);
