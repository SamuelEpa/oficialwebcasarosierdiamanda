"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { CookieBar } from "@/components/layout/CookieBar";
import MarketingPageViewTracker from "@/components/marketing/MarketingPageViewTracker";

export function SiteChrome({ whatsappFloat }: { whatsappFloat?: ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/auth" || pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <MarketingPageViewTracker />
      <CookieBar />
      {pathname !== "/politica-privacidad" && whatsappFloat}
    </>
  );
}
