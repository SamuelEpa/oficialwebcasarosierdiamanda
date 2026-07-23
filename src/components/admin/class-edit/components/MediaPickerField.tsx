"use client";

import Button from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { ImagePreview } from "../fields/ImagePreview";

type MediaPickerFieldProps = {
  label: string;
  image: string;
  alt: string;
  emptyMessage: string;
  uploadInputId: string;
  isUploading: boolean;
  onPickFromLibrary: () => void;
  onUpload: (file: File) => void;
  onRemove?: () => void;
  uploadLabel?: string;
  libraryLabel?: string;
};

export function MediaPickerField({
  label,
  image,
  alt,
  emptyMessage,
  uploadInputId,
  isUploading,
  onPickFromLibrary,
  onUpload,
  onRemove,
  uploadLabel = "Subir imagen",
  libraryLabel = "Biblioteca",
}: MediaPickerFieldProps) {
  return (
    <FormField label={label}>
      {image ? (
        <ImagePreview src={image} alt={alt} />
      ) : (
        <div className="flex aspect-video items-center justify-center rounded-xl border border-dashed border-outline-variant bg-surface-container-low p-6 text-center">
          <p className="text-label-md text-on-surface-variant">{emptyMessage}</p>
        </div>
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        <Button type="button" variant="outlined" size="sm" onClick={onPickFromLibrary}>
          {libraryLabel}
        </Button>
        <label className="secondary-btn cms-hero-image-field__button" htmlFor={uploadInputId} aria-disabled={isUploading}>
          {isUploading ? "Subiendo..." : uploadLabel}
        </label>
        <input
          id={uploadInputId}
          type="file"
          accept="image/*"
          className="sr-only"
          disabled={isUploading}
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) onUpload(file);
            event.target.value = "";
          }}
        />
        {image && onRemove ? (
          <Button type="button" variant="outlined" size="sm" onClick={onRemove}>
            Eliminar imagen
          </Button>
        ) : null}
      </div>
    </FormField>
  );
}
