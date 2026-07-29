"use client";

import { memo } from "react";
import { CmsRichTextField } from "@/components/admin/CmsRichTextField";
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

function BlogPostIntroRichTextFieldComponent(props: Props) {
  return <CmsRichTextField {...props} minHeight={props.minHeight ?? "170px"} />;
}

export const BlogPostIntroRichTextField = memo(BlogPostIntroRichTextFieldComponent);
