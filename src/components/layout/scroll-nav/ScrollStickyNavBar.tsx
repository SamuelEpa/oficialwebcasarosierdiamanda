"use client";

import type { CSSProperties, RefObject } from "react";
import type { NavigationItem } from "@/data/types";
import { classNames } from "@/lib/utils";
import { ScrollDesktopNavList, ScrollStickyLogo } from "./ScrollDesktopNavList";
import { splitNavigationColumns } from "./splitNavigationColumns";

type Props = {
  variant?: "default" | "editorial" | "home";
  items: NavigationItem[];
  logoUrl: string;
  useLogoTint: boolean;
  logoTintStyle: CSSProperties;
  openHref: string | null;
  current: (href: string) => boolean;
  onOpen: (href: string) => void;
  onScheduleClose: () => void;
  onClose: () => void;
  showDesktopNav: boolean;
  mobileToggleRef: RefObject<HTMLButtonElement | null>;
  mobileOpen: boolean;
  onToggleMobile: () => void;
};

export function ScrollStickyNavBar({
  variant = "default",
  items,
  logoUrl,
  useLogoTint,
  logoTintStyle,
  openHref,
  current,
  onOpen,
  onScheduleClose,
  onClose,
  showDesktopNav,
  mobileToggleRef,
  mobileOpen,
  onToggleMobile,
}: Props) {
  const isEditorial = variant === "editorial" || variant === "home";
  const { left, right } = splitNavigationColumns(items);

  return (
    <div
      className={classNames(
        "mobile-scroll-nav__bar",
        isEditorial && "mobile-scroll-nav__bar--editorial",
        showDesktopNav && isEditorial && "mobile-scroll-nav__bar--editorial-split",
      )}
    >
      {showDesktopNav && isEditorial ? (
        <>
          <ScrollDesktopNavList
            className="scroll-desktop-nav--left"
            items={left}
            openHref={openHref}
            current={current}
            onOpen={onOpen}
            onScheduleClose={onScheduleClose}
            onClose={onClose}
          />
          <ScrollStickyLogo
            logoUrl={logoUrl}
            useTint={useLogoTint}
            tintStyle={logoTintStyle}
            onNavigate={onClose}
          />
          <ScrollDesktopNavList
            className="scroll-desktop-nav--right"
            items={right}
            openHref={openHref}
            current={current}
            onOpen={onOpen}
            onScheduleClose={onScheduleClose}
            onClose={onClose}
          />
        </>
      ) : (
        <>
          <ScrollStickyLogo
            logoUrl={logoUrl}
            useTint={useLogoTint}
            tintStyle={logoTintStyle}
            onNavigate={onClose}
          />
          {showDesktopNav ? (
            <ScrollDesktopNavList
              items={items}
              openHref={openHref}
              current={current}
              onOpen={onOpen}
              onScheduleClose={onScheduleClose}
              onClose={onClose}
            />
          ) : null}
        </>
      )}

      <button
        ref={mobileToggleRef}
        className="mobile-scroll-nav__toggle"
        type="button"
        aria-expanded={mobileOpen}
        aria-controls="mobile-scroll-menu"
        aria-label={mobileOpen ? "Cerrar menu" : "Abrir menu"}
        onClick={onToggleMobile}
      >
        <span className="mobile-scroll-nav__icon" aria-hidden="true" />
      </button>
    </div>
  );
}
