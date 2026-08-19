"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";

const CONSENT_KEY = "casarosier_cookie_consent_v2";
const LEGACY_CONSENT_KEY = "casarosier_cookie_accept_v1";
export const COOKIE_CONSENT_EVENT = "casarosier:cookie-consent";

function hasAnalyticsConsent(): boolean {
  try {
    const raw =
      window.localStorage.getItem(CONSENT_KEY) ||
      window.localStorage.getItem(LEGACY_CONSENT_KEY);
    if (!raw) return false;
    try {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed.analytics === "boolean") return parsed.analytics;
    } catch {
      // Legacy key: its presence meant the user accepted cookies.
    }
    return true;
  } catch {
    return false;
  }
}

function PageViewTracker({ posthogKey }: { posthogKey: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!posthogKey || !posthog.has_opted_in_capturing()) return;
    const search = searchParams?.toString();
    posthog.capture("$pageview", {
      pathname,
      url: `${pathname}${search ? `?${search}` : ""}`,
      referrer: document.referrer || "",
    });
  }, [pathname, searchParams, posthogKey]);

  return null;
}

export function PostHogProvider({
  posthogKey,
  posthogHost,
  children,
}: {
  posthogKey?: string;
  posthogHost?: string;
  children?: React.ReactNode;
}) {
  const key = posthogKey || "";
  const host = posthogHost || "https://us.i.posthog.com";

  useEffect(() => {
    if (!key) return;

    posthog.init(key, {
      api_host: host,
      capture_pageview: false,
      capture_pageleave: false,
      disable_session_recording: true,
      opt_out_capturing_by_default: true,
    });

    const applyConsent = () => {
      if (hasAnalyticsConsent()) {
        void posthog.opt_in_capturing();
      } else {
        void posthog.opt_out_capturing();
      }
    };

    applyConsent();
    window.addEventListener(COOKIE_CONSENT_EVENT, applyConsent);
    window.addEventListener("storage", applyConsent);
    return () => {
      window.removeEventListener(COOKIE_CONSENT_EVENT, applyConsent);
      window.removeEventListener("storage", applyConsent);
    };
  }, [key, host]);

  return (
    <>
      {children}
      <Suspense fallback={null}>
        <PageViewTracker posthogKey={key} />
      </Suspense>
    </>
  );
}