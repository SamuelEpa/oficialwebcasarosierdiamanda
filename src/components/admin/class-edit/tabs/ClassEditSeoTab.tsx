"use client";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { ImagePreview, TextAreaField, TextField } from "../fields";
import type { ClassEditFormState } from "../hooks/useClassEditForm";
import { renderPlainText } from "../utils";

export function ClassEditSeoTab({ form }: { form: ClassEditFormState }) {
  const { title, slug, description, seoTitle, seoDescription, details, setSeoTitle, setSeoDescription, markDirty, setPickerTarget } = form;

  return (
    <>
      <Card padding="lg" className="space-y-5 rounded-2xl">
        <h2 className="text-headline-sm text-on-surface">SEO</h2>
        <TextField label="Título SEO" value={seoTitle} maxLength={70} help={`Caracteres: ${seoTitle.length}/70`} onChange={(event) => { setSeoTitle(event.target.value); markDirty(); }} />
        <TextAreaField label="Descripción SEO" value={seoDescription} maxLength={160} help={`Caracteres: ${seoDescription.length}/160`} onChange={(event) => { setSeoDescription(event.target.value); markDirty(); }} className="min-h-[100px]" />
      </Card>
      <Card padding="lg" className="space-y-5 rounded-2xl">
        <h2 className="text-headline-sm text-on-surface">Open Graph</h2>
        <ImagePreview src={details.seoImage} alt="Imagen SEO" />
        <Button type="button" variant="outlined" size="sm" onClick={() => setPickerTarget("seo")}>{details.seoImage ? "Reemplazar imagen" : "Establecer imagen SEO"}</Button>
        <div className="overflow-hidden rounded-xl border border-outline-variant bg-white p-4">
          <p className="truncate text-sm text-[#1a0dab]">{seoTitle || title || "Título SEO"}</p>
          <p className="truncate text-sm text-[#006d21]">{slug ? `casarosierceramica.com/clases/${slug}` : "casarosierceramica.com/clases/ejemplo"}</p>
          <p className="mt-1 line-clamp-2 text-sm text-[#545454]">{seoDescription || renderPlainText(description) || "Descripción SEO de la clase..."}</p>
        </div>
      </Card>
    </>
  );
}
