"use client";

import Image from "next/image";
import { PublicHeroContent } from "@/components/hero/PublicHeroContent";
import type { CmsHeroSettings } from "@/lib/cms/types";
import { PREVIEW_MENU_ITEMS } from "../constants";
import type { SharedHeroEditorState } from "../types";
import { heroScale, heroText } from "../utils";

export function HeroPositionPreview({
  details,
  titleFallback,
  subtitleFallback,
  editor,
}: {
  details: CmsHeroSettings;
  titleFallback: string;
  subtitleFallback?: string;
  editor: SharedHeroEditorState;
}) {
  const { device, keys, isHydrated, isImageHero, isPresentationHero, isTextHero, frameStyle, menuStyle, logoMask, previewVideoEmbedUrl, previewVideoUrl } = editor;

  return (
    <div className="cms-hero-position-preview" aria-label="Vista de referencia del hero">
      <div
        className={`relative mx-auto overflow-hidden rounded-xl border border-outline-variant shadow-sm ${isHydrated && isPresentationHero ? "header-interno--presentation-hero" : ""}`}
        style={frameStyle}
      >
        {previewVideoEmbedUrl ? (
          <iframe
            className="absolute inset-0 z-0 h-full w-full object-cover"
            src={previewVideoEmbedUrl}
            title="Video de fondo del hero"
            allow="autoplay; fullscreen; picture-in-picture"
            tabIndex={-1}
            aria-hidden="true"
          />
        ) : previewVideoUrl ? (
          <video
            className="absolute inset-0 z-0 h-full w-full object-cover"
            src={previewVideoUrl}
            poster={details.heroVideoPoster || details.heroImage}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        ) : null}

        {device === "desktop" ? (
          <>
            <span
              className="absolute z-20 -translate-x-1/2"
              style={{
                ...logoMask,
                left: heroText(details, keys.logoX) || "50%",
                top: heroText(details, keys.logoY) || "46px",
                width: heroText(details, keys.logoWidth) || "118px",
                aspectRatio: "2.2 / 1",
              }}
            />
            <nav className="absolute left-1/2 z-20 flex whitespace-nowrap text-[12px] font-bold" style={menuStyle} aria-label="Vista previa menú">
              <ul className="flex list-none items-center gap-4 p-0">
                {PREVIEW_MENU_ITEMS.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </nav>
          </>
        ) : (
          <div className="absolute inset-0 z-20" style={{ color: editor.navColor }}>
            <span
              className="absolute block -translate-x-1/2"
              style={{
                ...logoMask,
                left: heroText(details, keys.logoX) || "50%",
                top: heroText(details, keys.logoY) || (device === "tablet" ? "42px" : "34px"),
                width: heroText(details, keys.logoWidth) || (device === "tablet" ? "106px" : "92px"),
                aspectRatio: "2.2 / 1",
              }}
            />
            <span
              className="absolute right-6 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-current/30"
              style={{ top: heroText(details, keys.menuY) || (device === "tablet" ? "118px" : "96px") }}
            >
              <span className="material-symbols-outlined text-[22px]">menu</span>
            </span>
          </div>
        )}

        <div className="absolute inset-0 z-10">
          {isPresentationHero ? (
            <PublicHeroContent
              hero={{
                ...details,
                heroPresentationText: details.heroPresentationText || details.heroTitle || titleFallback,
                heroPresentationSubtitle: details.heroPresentationSubtitle,
              }}
            />
          ) : null}

          {isImageHero ? (
            <div className="absolute inset-0">
              {details.titleImage ? (
                <div
                  className="absolute"
                  style={{
                    left: heroText(details, keys.titlePosX) || "50%",
                    top: heroText(details, keys.titlePosY) || "50%",
                    transform: `translate(-50%, -50%) scale(${heroScale(details, keys.titleScale)})`,
                    transformOrigin: "center center",
                    width: "50%",
                    height: "30%",
                  }}
                >
                  <Image src={details.titleImage} alt="" fill sizes="700px" className="object-contain opacity-80" unoptimized />
                </div>
              ) : null}
              {details.titleImageSecondary ? (
                <div
                  className="absolute"
                  style={{
                    left: heroText(details, keys.titleSecondaryPosX) || "50%",
                    top: heroText(details, keys.titleSecondaryPosY) || "50%",
                    transform: `translate(-50%, -50%) scale(${heroScale(details, keys.titleSecondaryScale)})`,
                    transformOrigin: "center center",
                    width: "50%",
                    height: "30%",
                  }}
                >
                  <Image src={details.titleImageSecondary} alt="" fill sizes="700px" className="object-contain" unoptimized />
                </div>
              ) : null}
            </div>
          ) : null}

          {isTextHero ? (
            <div
              className="absolute w-full text-center"
              style={{
                left: heroText(details, keys.heroTitleX) || "50%",
                top: heroText(details, keys.heroTitleY) || "50%",
                transform: `translate(-50%, -50%) scale(${heroScale(details, keys.heroTitleScale)})`,
                transformOrigin: "center center",
              }}
            >
              <h3 className="font-serif text-[clamp(30px,4vw,54px)] uppercase leading-none text-[#5b554f]">{details.heroTitle || titleFallback}</h3>
              <p className="mt-4 text-label-md uppercase text-[#a99b90]">{details.heroSubtitle || subtitleFallback}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
