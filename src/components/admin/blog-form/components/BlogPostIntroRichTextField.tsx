"use client";

import { memo } from "react";
import { AdminRichTextField } from "@/components/ui/AdminRichTextField";
import { DETAIL_PAGE_RICH_TEXT_CONTROLS } from "@/components/admin/class-edit/constants/rich-text-controls";
import type { RichTextTypography } from "@/lib/cms/rich-text-typography";

type Props = {
  label: string;
  value: string;
  typography: RichTextTypography;
  required?: boolean;
  minHeight?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onTypographyChange: (typography: RichTextTypography) => void;
};

function BlogPostIntroRichTextFieldComponent({
  label,
  value,
  typography,
  required,
  minHeight = "170px",
  placeholder,
  onChange,
  onTypographyChange,
}: Props) {
  return (
    <div className="class-edit-rich-text-stack">
      <AdminRichTextField
        label={label}
        labelPlacement="editor"
        layout="compact"
        required={required}
        value={value}
        typography={typography}
        controls={DETAIL_PAGE_RICH_TEXT_CONTROLS}
        minHeight={minHeight}
        placeholder={placeholder}
        onChange={onChange}
        onTypographyChange={onTypographyChange}
      />
    </div>
  );
}

export const BlogPostIntroRichTextField = memo(BlogPostIntroRichTextFieldComponent);
