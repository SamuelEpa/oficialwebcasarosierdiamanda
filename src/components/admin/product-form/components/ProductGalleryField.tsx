"use client";

import Image from "next/image";
import { useId, useState } from "react";
import MediaLibraryModal from "@/components/admin/MediaLibraryModal";
import { MEDIA_UPLOAD_ENDPOINT, PRODUCT_MEDIA_FOLDER } from "../constants";
import { isAbsoluteUrl, localImageSrc } from "../utils";

type Props = {
  images: string[];
  disabled?: boolean;
  folder?: string;
  onAdd: (urls: string[]) => void;
  onRemove: (index: number) => void;
  onMove: (from: number, to: number) => void;
};

export function ProductGalleryField({
  images,
  disabled,
  folder = PRODUCT_MEDIA_FOLDER,
  onAdd,
  onRemove,
  onMove,
}: Props) {
  const inputId = useId();
  const [showPicker, setShowPicker] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function uploadFiles(fileList: FileList | null) {
    if (!fileList?.length || disabled) return;

    setIsUploading(true);
    setError(null);

    try {
      const uploads = Array.from(fileList).map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        const response = await fetch(MEDIA_UPLOAD_ENDPOINT, {
          method: "POST",
          body: formData,
        });
        const data = (await response.json().catch(() => ({}))) as {
          asset?: { file_url?: string };
          error?: string;
        };

        if (!response.ok || !data.asset?.file_url) {
          throw new Error(data.error || "No se pudo subir una imagen.");
        }

        return data.asset.file_url;
      });

      const results = await Promise.allSettled(uploads);
      const urls = results
        .filter((result): result is PromiseFulfilledResult<string> => result.status === "fulfilled")
        .map((result) => result.value);
      const failed = results.length - urls.length;

      if (urls.length) onAdd(urls);
      if (failed > 0) {
        setError(
          urls.length
            ? `${failed} imagen(es) no se pudieron subir. El resto se añadieron.`
            : "No se pudieron subir las imágenes.",
        );
      }
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "No se pudieron subir las imágenes.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="shop-product-editor__gallery">
      <div className="shop-product-editor__gallery-toolbar">
        <div>
          <p className="shop-product-editor__gallery-title">Galería del producto</p>
          <p className="shop-product-editor__gallery-help">
            Sube varias fotos o elígelas desde la biblioteca. Ordena y elimina con los controles de cada miniatura.
          </p>
        </div>
        <div className="shop-product-editor__gallery-actions">
          <button
            type="button"
            className="secondary-btn"
            disabled={disabled || isUploading}
            aria-expanded={showPicker}
            onClick={() => setShowPicker(true)}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              photo_library
            </span>
            Biblioteca
          </button>
          <label
            className="secondary-btn"
            htmlFor={inputId}
            style={{ cursor: disabled || isUploading ? "wait" : "pointer" }}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              upload
            </span>
            {isUploading ? "Subiendo…" : "Subir varias"}
            <input
              id={inputId}
              type="file"
              accept="image/*"
              multiple
              hidden
              disabled={disabled || isUploading}
              onChange={(event) => {
                void uploadFiles(event.target.files);
                event.target.value = "";
              }}
            />
          </label>
        </div>
      </div>

      {images.length ? (
        <ul className="shop-product-editor__gallery-grid" aria-label="Imágenes de la galería">
          {images.map((url, index) => (
            <li key={`${url}-${index}`} className="shop-product-editor__gallery-item">
              <div className="shop-product-editor__gallery-thumb">
                {isAbsoluteUrl(url) ? (
                  <img src={url} alt={`Imagen ${index + 1} de la galería`} />
                ) : (
                  <Image
                    src={localImageSrc(url)}
                    alt={`Imagen ${index + 1} de la galería`}
                    fill
                    sizes="160px"
                    className="object-cover"
                    unoptimized
                  />
                )}
              </div>
              <div className="shop-product-editor__gallery-item-actions">
                <button
                  type="button"
                  className="shop-product-editor__icon-btn"
                  aria-label={`Mover imagen ${index + 1} a la izquierda`}
                  disabled={disabled || index === 0}
                  onClick={() => onMove(index, index - 1)}
                >
                  <span className="material-symbols-outlined" aria-hidden="true">
                    chevron_left
                  </span>
                </button>
                <button
                  type="button"
                  className="shop-product-editor__icon-btn"
                  aria-label={`Mover imagen ${index + 1} a la derecha`}
                  disabled={disabled || index === images.length - 1}
                  onClick={() => onMove(index, index + 1)}
                >
                  <span className="material-symbols-outlined" aria-hidden="true">
                    chevron_right
                  </span>
                </button>
                <button
                  type="button"
                  className="shop-product-editor__icon-btn shop-product-editor__icon-btn--danger"
                  aria-label={`Quitar imagen ${index + 1}`}
                  disabled={disabled}
                  onClick={() => onRemove(index)}
                >
                  <span className="material-symbols-outlined" aria-hidden="true">
                    delete
                  </span>
                </button>
              </div>
              <span className="shop-product-editor__gallery-index">{index + 1}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="shop-product-editor__gallery-empty">
          <span className="material-symbols-outlined" aria-hidden="true">
            imagesmode
          </span>
          <p>Aún no hay fotos en la galería.</p>
          <span>Puedes subir varias a la vez o elegirlas de la biblioteca.</span>
        </div>
      )}

      {error ? <p className="form-error">{error}</p> : null}

      <MediaLibraryModal
        open={showPicker}
        onSelect={(url) => {
          onAdd([url]);
          setShowPicker(false);
        }}
        onClose={() => setShowPicker(false)}
      />
    </div>
  );
}
