"use client";

import { memo } from "react";
import { CmsRichTextField } from "@/components/admin/CmsRichTextField";
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

function ClassContentRichTextFieldComponent(props: ClassContentRichTextFieldProps) {
  return <CmsRichTextField {...props} minHeight={props.minHeight ?? "160px"} />;
}

export const ClassContentRichTextField = memo(ClassContentRichTextFieldComponent);
