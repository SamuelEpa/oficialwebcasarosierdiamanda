"use client";

import type { ExperienceItem } from "@/data/types";
import { assetPath } from "@/lib/assets";
import { classNames } from "@/lib/utils";
import { useClassDetailGallery, type ClassDetailGalleryItem } from "../../hooks/useClassDetailGallery";
import {
  isDirectVideoFile,
  offeringVideoEmbedUrl,
  offeringVideoIsEmbeddable,
} from "../../lib/offeringVideoEmbed";

function GalleryPlayButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" className="class-gallery__play" aria-label={label} onClick={onClick}>
      <span className="class-gallery__play-icon" aria-hidden="true" />
    </button>
  );
}

function GalleryMainMedia({
  item,
  title,
  isPlaying,
  onPlay,
}: {
  item: ClassDetailGalleryItem;
  title: string;
  isPlaying: boolean;
  onPlay: () => void;
}) {
  if (item.kind === "video" && item.videoUrl && isPlaying) {
    const embedUrl = offeringVideoEmbedUrl(item.videoUrl, true);
    if (embedUrl) {
      return (
        <div className="class-gallery__main-wrap class-gallery__main-wrap--video">
          <iframe
            className="class-gallery__embed"
            src={embedUrl}
            title={`Video de ${title}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      );
    }

    if (isDirectVideoFile(item.videoUrl)) {
      return (
        <div className="class-gallery__main-wrap class-gallery__main-wrap--video">
          <video
            className="class-gallery__video"
            src={assetPath(item.videoUrl)}
            controls
            autoPlay
            playsInline
            preload="metadata"
          />
        </div>
      );
    }
  }

  const showPlay =
    item.kind === "video" && item.videoUrl && offeringVideoIsEmbeddable(item.videoUrl);

  return (
    <div className="class-gallery__main-wrap">
      <img className="class-gallery__main" src={assetPath(item.poster)} alt={title} />
      {showPlay ? (
        <GalleryPlayButton label={`Reproducir video de ${title}`} onClick={onPlay} />
      ) : null}
    </div>
  );
}

type Props = {
  item: ExperienceItem;
};

export function ClassDetailGallery({ item }: Props) {
  const gallery = useClassDetailGallery(item);

  if (!gallery.items.length || !gallery.activeItem) return null;

  return (
    <div className="class-gallery thumbnail-carousel" aria-label={`Galeria de ${item.title}`}>
      <div className="thumbnail-carousel__main">
        <GalleryMainMedia
          item={gallery.activeItem}
          title={item.title}
          isPlaying={gallery.isPlaying}
          onPlay={gallery.startPlayback}
        />
      </div>
      {gallery.items.length > 1 ? (
        <div className={classNames("thumbnail-carousel__thumbs", "class-gallery__thumbs")}>
          {gallery.items.map((mediaItem, index) => {
            const isActive = index === gallery.activeIndex;
            return (
              <div className="thumbnail-carousel__thumb-wrap" key={mediaItem.id}>
                <button
                  className={classNames("class-gallery__thumb", isActive && "is-active")}
                  type="button"
                  aria-label={
                    mediaItem.kind === "video"
                      ? `Ver video de ${item.title}`
                      : `Ver imagen ${index + 1} de ${item.title}`
                  }
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => gallery.selectIndex(index)}
                >
                  <img src={assetPath(mediaItem.poster)} alt="" />
                  {mediaItem.kind === "video" ? (
                    <span className="class-gallery__thumb-play" aria-hidden="true" />
                  ) : null}
                </button>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
