import MediaSelectField from "@/components/admin/MediaSelectField";
import { PRODUCT_MEDIA_FOLDER } from "../constants";
import { ProductGalleryField } from "./ProductGalleryField";
import { ProductSectionHead } from "./ProductSectionHead";

type Props = {
  mainImageId: string;
  gallery: string[];
  disabled?: boolean;
  onMainImageChange: (value: string) => void;
  onGalleryAdd: (urls: string[]) => void;
  onGalleryRemove: (index: number) => void;
  onGalleryMove: (from: number, to: number) => void;
};

export function ProductMediaSection({
  mainImageId,
  gallery,
  disabled,
  onMainImageChange,
  onGalleryAdd,
  onGalleryRemove,
  onGalleryMove,
}: Props) {
  return (
    <section className="form-block shop-product-editor__section shop-product-editor__media-card">
      <ProductSectionHead
        icon="image"
        title="Imágenes"
        description="Fotografía principal para la tienda y galería adicional de la ficha."
      />
      <MediaSelectField
        label="Imagen principal"
        value={mainImageId}
        onChange={onMainImageChange}
        folder={PRODUCT_MEDIA_FOLDER}
        previewClassName="shop-product-editor__image-preview"
      />
      <ProductGalleryField
        images={gallery}
        disabled={disabled}
        folder={PRODUCT_MEDIA_FOLDER}
        onAdd={onGalleryAdd}
        onRemove={onGalleryRemove}
        onMove={onGalleryMove}
      />
    </section>
  );
}
