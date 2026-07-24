import MediaSelectField from "@/components/admin/MediaSelectField";
import { PRODUCT_MEDIA_FOLDER } from "../constants";
import type { ProductFormFields } from "../types";
import { ProductSectionHead } from "./ProductSectionHead";

type Props = {
  fields: ProductFormFields;
  disabled?: boolean;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onImageChange: (value: string) => void;
};

export function ProductSeoSection({
  fields,
  disabled,
  onTitleChange,
  onDescriptionChange,
  onImageChange,
}: Props) {
  return (
    <section className="form-block shop-product-editor__section">
      <ProductSectionHead
        icon="travel_explore"
        title="SEO"
        description="Metadatos usados al compartir o indexar el artículo."
      />
      <div className="grid-2">
        <label className="field span-2">
          <span>SEO title</span>
          <input
            value={fields.seoTitle}
            disabled={disabled}
            onChange={(event) => onTitleChange(event.target.value)}
          />
        </label>
        <label className="field span-2">
          <span>SEO description</span>
          <textarea
            rows={4}
            value={fields.seoDescription}
            disabled={disabled}
            onChange={(event) => onDescriptionChange(event.target.value)}
          />
        </label>
        <div className="span-2">
          <MediaSelectField
            label="SEO image"
            value={fields.seoImage}
            onChange={onImageChange}
            folder={PRODUCT_MEDIA_FOLDER}
            previewClassName="shop-product-editor__seo-preview"
          />
        </div>
      </div>
    </section>
  );
}
