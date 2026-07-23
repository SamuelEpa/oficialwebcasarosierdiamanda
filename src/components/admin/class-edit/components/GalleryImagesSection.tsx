"use client";

import Button from "@/components/ui/Button";
import { AdminInput } from "@/components/ui/AdminField";
import type { ClassEditFormState } from "../hooks/useClassEditForm";
import { useGalleryDragDrop } from "../hooks/useGalleryDragDrop";
import { formatFileSize } from "../utils";
import { ImagePreview } from "../fields/ImagePreview";
import { ListItemActions } from "./ListItemActions";
import { SectionCard } from "./SectionCard";

type GalleryImagesSectionProps = {
  form: ClassEditFormState;
};

export function GalleryImagesSection({ form }: GalleryImagesSectionProps) {
  const {
    details,
    errors,
    uploadingTarget,
    galleryUploadInfo,
    setPickerTarget,
    uploadImage,
    updateGalleryImage,
    moveGalleryImage,
    removeGalleryImage,
  } = form;

  const dragDrop = useGalleryDragDrop(form);

  return (
    <SectionCard
      compact
      description="Ordena las imágenes y agrega un texto alternativo breve para accesibilidad."
      action={(
        <div className="flex flex-wrap gap-2">
          <label
            className="secondary-btn cms-hero-image-field__button"
            htmlFor="gallery-new-upload"
            aria-disabled={uploadingTarget === "gallery:new"}
          >
            {uploadingTarget === "gallery:new" ? "Subiendo..." : "Subir imagen"}
          </label>
          <input
            id="gallery-new-upload"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            className="sr-only"
            disabled={uploadingTarget === "gallery:new"}
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void uploadImage("gallery:new", file);
              event.target.value = "";
            }}
          />
          <Button type="button" variant="outlined" onClick={() => setPickerTarget("gallery")}>
            Anadir imagen
          </Button>
        </div>
      )}
    >
      <div className="grid grid-cols-1 gap-3">
        {details.galleryImages.map((item, index) => (
          <div
            key={`${item.image}-${index}`}
            draggable
            onDragStart={() => dragDrop.onDragStart(index)}
            onDragOver={dragDrop.onDragOver}
            onDrop={() => dragDrop.onDrop(index)}
            className="rounded-xl border border-outline-variant bg-surface-container-lowest p-3"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="text-label-md font-bold uppercase tracking-wide text-on-surface-variant">
                Imagen {index + 1}
              </span>
              <ListItemActions
                size="sm"
                onMoveUp={() => moveGalleryImage(index, index - 1)}
                onMoveDown={() => moveGalleryImage(index, index + 1)}
                onRemove={() => removeGalleryImage(index)}
                removeLabel="Eliminar imagen"
              />
            </div>
            <div className="grid gap-3 md:grid-cols-[160px_minmax(0,1fr)] md:items-start">
              <div className="space-y-2">
                <ImagePreview
                  src={item.image}
                  alt={item.alt || `Imagen ${index + 1}`}
                  aspect="h-24 w-full md:h-[104px]"
                />
                {galleryUploadInfo[item.image] ? (
                  <p className="text-xs leading-5 text-on-surface-variant">
                    Original: {formatFileSize(galleryUploadInfo[item.image].originalSize)}.
                    Optimizada: {formatFileSize(galleryUploadInfo[item.image].finalSize)} (
                    {galleryUploadInfo[item.image].reductionPercent}% menos).
                  </p>
                ) : null}
                <Button
                  type="button"
                  variant="outlined"
                  size="sm"
                  className="w-full"
                  onClick={() => setPickerTarget(`gallery:${index}`)}
                >
                  Sustituir
                </Button>
              </div>
              <AdminInput
                label="Texto alternativo (ALT)"
                required
                value={item.alt}
                error={errors[`gallery-${index}`]}
                validationKey={`gallery-${index}`}
                onChange={(event) => updateGalleryImage(index, { alt: event.target.value })}
              />
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
