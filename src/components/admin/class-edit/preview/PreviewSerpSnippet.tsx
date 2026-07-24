"use client";

import { memo, useMemo } from "react";
import { buildClassEditSerpPreview } from "../utils";

function PreviewSerpSnippetComponent({
  seoTitle,
  seoDescription,
  title,
  slug,
  description,
}: {
  seoTitle: string;
  seoDescription: string;
  title: string;
  slug: string;
  description: string;
}) {
  const serp = useMemo(
    () => buildClassEditSerpPreview({ seoTitle, seoDescription, title, slug, description }),
    [description, seoDescription, seoTitle, slug, title],
  );

  return (
    <div className="overflow-hidden rounded-xl border border-outline-variant bg-white p-4">
      <p className="mb-2 text-label-md font-medium text-on-surface-variant">Vista SEO (pestaña SEO)</p>
      <p className="truncate text-sm text-[#1a0dab]">{serp.title}</p>
      <p className="truncate text-sm text-[#006d21]">{serp.url}</p>
      <p className="mt-1 line-clamp-2 text-sm text-[#545454]">{serp.description}</p>
    </div>
  );
}

export const PreviewSerpSnippet = memo(PreviewSerpSnippetComponent);
