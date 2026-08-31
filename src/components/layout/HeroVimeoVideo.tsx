"use client";

import { useCallback, useEffect, useRef } from "react";

const LOOP_FADE_SECONDS = 1.1;

type VimeoMessage = {
  event?: string;
  data?: {
    seconds?: number;
    duration?: number;
  };
};

export function HeroVimeoVideo({
  className,
  src,
  title,
}: {
  className: string;
  src: string;
  title: string;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const subscribeToPlayback = useCallback(() => {
    iframeRef.current?.contentWindow?.postMessage(
      { method: "addEventListener", value: "timeupdate" },
      "https://player.vimeo.com"
    );
  }, []);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onMessage = (event: MessageEvent<unknown>) => {
      if (
        event.origin !== "https://player.vimeo.com" ||
        event.source !== iframe.contentWindow
      ) {
        return;
      }

      let message: VimeoMessage;
      try {
        message = typeof event.data === "string" ? JSON.parse(event.data) : event.data as VimeoMessage;
      } catch {
        return;
      }

      if (message.event === "ready") {
        subscribeToPlayback();
        return;
      }

      if (message.event !== "timeupdate" || reduceMotion.matches) return;

      const seconds = message.data?.seconds;
      const duration = message.data?.duration;
      if (typeof seconds !== "number" || typeof duration !== "number") return;

      const fadeWindow = Math.min(LOOP_FADE_SECONDS, duration * 0.1);
      iframe.style.opacity = duration - seconds <= fadeWindow ? "0" : "1";
    };

    window.addEventListener("message", onMessage);
    subscribeToPlayback();
    return () => window.removeEventListener("message", onMessage);
  }, [subscribeToPlayback]);

  return (
    <iframe
      ref={iframeRef}
      className={`${className} hero__video--loop-fade`}
      src={src}
      title={title}
      allow="autoplay; fullscreen; picture-in-picture"
      onLoad={subscribeToPlayback}
      tabIndex={-1}
      aria-hidden="true"
    />
  );
}
