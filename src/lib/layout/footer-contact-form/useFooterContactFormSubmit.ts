"use client";

import type { FormEvent } from "react";
import { useCallback, useState } from "react";
import type { PublicFooterContactFormProps } from "@/lib/cms/public-footer-model";

type SubmitState = "idle" | "submitting" | "success" | "error";

export function useFooterContactFormSubmit(
  config: PublicFooterContactFormProps,
  preview: boolean,
) {
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      if (preview) return;
      event.preventDefault();
      const element = event.currentTarget;
      const formData = new FormData(element);

      setState("submitting");
      setMessage("");

      const data = Object.fromEntries(formData.entries());
      const response = await fetch(`/api/forms/${config.slug}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          subject: config.submitSubject,
          source_page: window.location.pathname,
          data,
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as {
        message?: string;
        error?: string;
        redirect_url?: string;
      };

      if (response.ok) {
        element.reset();
        if (typeof payload.redirect_url === "string" && payload.redirect_url.trim()) {
          window.location.href = payload.redirect_url;
          return;
        }
        setState("success");
        setMessage(payload.message || config.defaultSuccessMessage);
        return;
      }

      setState("error");
      setMessage(payload.error || "No se pudo enviar el mensaje. Intentalo de nuevo.");
    },
    [config.defaultSuccessMessage, config.slug, config.submitSubject, preview],
  );

  return {
    state,
    message,
    handleSubmit,
    isSubmitting: state === "submitting",
  };
}
