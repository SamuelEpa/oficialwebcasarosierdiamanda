import { assetPath } from "@/lib/assets";
import type { ShopProductBadge } from "@/data/types";
import { ShopProductBadgeLabel } from "../catalog/ShopProductBadgeLabel";

type Props = {
  productName: string;
  images: string[];
  activeIndex: number;
  activeImage: string;
  badge: ShopProductBadge | null;
  onSelectImage: (index: number) => void;
};

export function ShopItemGalleryView({
  productName,
  images,
  activeIndex,
  activeImage,
  badge,
  onSelectImage,
}: Props) {
  return (
    <div className="shop-item-gallery" aria-label={`Galería de ${productName}`}>
      {images.length > 1 ? (
        <div className="shop-item-gallery__thumbs" role="tablist" aria-label="Miniaturas">
          {images.map((image, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={`${image}-${index}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Imagen ${index + 1} de ${productName}`}
                className={`shop-item-gallery__thumb${isActive ? " is-active" : ""}`}
                onClick={() => onSelectImage(index)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={assetPath(image)} alt="" loading="lazy" decoding="async" />
              </button>
            );
          })}
        </div>
      ) : null}
      <figure className="shop-item-gallery__main">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={assetPath(activeImage)} alt={productName} />
        {badge ? <ShopProductBadgeLabel badge={badge} /> : null}
      </figure>
    </div>
  );
}
