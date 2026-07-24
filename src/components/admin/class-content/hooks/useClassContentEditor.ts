"use client";

import { useCallback, useMemo, useRef } from "react";
import type { ClassOfferingContent, ClassOfferingModule } from "@/lib/cms/types";
import { DEFAULT_DESCRIPTION_TYPOGRAPHY } from "@/lib/cms/rich-text-typography";
import { createModuleId } from "../defaultContent";
import { resolveContentTypography } from "../typography";

export type ClassContentEditorProps = {
  content: ClassOfferingContent;
  onChange: (content: ClassOfferingContent) => void;
  onDirty: () => void;
};

function parsePaymentMethods(content: ClassOfferingContent) {
  if (content.paymentMethodsList?.length) return content.paymentMethodsList;
  return content.paymentMethods.split(/\r?\n|,/).map((item) => item.trim()).filter(Boolean);
}

export function useClassContentEditor({ content, onChange, onDirty }: ClassContentEditorProps) {
  const contentRef = useRef(content);
  contentRef.current = content;

  const commit = useCallback(
    (next: ClassOfferingContent) => {
      onChange(next);
      onDirty();
    },
    [onChange, onDirty],
  );

  const setField = useCallback(
    <K extends keyof ClassOfferingContent>(field: K, value: ClassOfferingContent[K]) => {
      commit({ ...contentRef.current, [field]: value });
    },
    [commit],
  );

  const updateModule = useCallback(
    (index: number, patch: Partial<ClassOfferingModule>) => {
      const current = contentRef.current;
      commit({
        ...current,
        modules: current.modules.map((item, i) => (i === index ? { ...item, ...patch } : item)),
      });
    },
    [commit],
  );

  const addModule = useCallback(() => {
    const current = contentRef.current;
    commit({
      ...current,
      modules: [
        ...current.modules,
        {
          id: createModuleId(),
          title: `MÓDULO ${current.modules.length + 1}.`,
          description: "",
          descriptionTypography: { ...DEFAULT_DESCRIPTION_TYPOGRAPHY },
          order: current.modules.length,
        },
      ],
    });
  }, [commit]);

  const duplicateModule = useCallback(
    (index: number) => {
      const current = contentRef.current;
      const source = current.modules[index];
      if (!source) return;
      commit({
        ...current,
        modules: [
          ...current.modules.slice(0, index + 1),
          {
            ...source,
            id: createModuleId(),
            title: source.title ? `${source.title} (copia)` : "",
            order: index + 1,
          },
          ...current.modules.slice(index + 1),
        ].map((item, order) => ({ ...item, order })),
      });
    },
    [commit],
  );

  const removeModule = useCallback(
    (index: number) => {
      if (!window.confirm("¿Eliminar este módulo?")) return;
      const current = contentRef.current;
      commit({
        ...current,
        modules: current.modules.filter((_, i) => i !== index).map((item, order) => ({ ...item, order })),
      });
    },
    [commit],
  );

  const paymentMethods = useMemo(() => parsePaymentMethods(content), [content]);

  const setPaymentMethods = useCallback(
    (next: string[]) => {
      const current = contentRef.current;
      const clean = next.map((item) => item.trim()).filter(Boolean);
      commit({
        ...current,
        paymentMethodsList: next,
        paymentMethods: clean.join("\n"),
      });
    },
    [commit],
  );

  const addPaymentMethod = useCallback(() => {
    setPaymentMethods([...parsePaymentMethods(contentRef.current), ""]);
  }, [setPaymentMethods]);

  const updatePaymentMethod = useCallback(
    (index: number, value: string) => {
      const current = contentRef.current;
      const list = parsePaymentMethods(current);
      const next = list.length ? [...list] : [""];
      next[index] = value;
      commit({
        ...current,
        paymentMethodsList: next,
        paymentMethods: next.map((item) => item.trim()).filter(Boolean).join("\n"),
      });
    },
    [commit],
  );

  const removePaymentMethod = useCallback(
    (index: number) => {
      setPaymentMethods(parsePaymentMethods(contentRef.current).filter((_, itemIndex) => itemIndex !== index));
    },
    [setPaymentMethods],
  );

  const typography = useMemo(
    () => ({
      learning: resolveContentTypography(content.learningContentTypography),
      participation: resolveContentTypography(content.participationContentTypography),
      extraInfo: resolveContentTypography(content.extraInfoTypography),
    }),
    [
      content.extraInfoTypography,
      content.learningContentTypography,
      content.participationContentTypography,
    ],
  );

  return useMemo(
    () => ({
      content,
      typography,
      paymentMethods,
      setField,
      updateModule,
      addModule,
      duplicateModule,
      removeModule,
      addPaymentMethod,
      updatePaymentMethod,
      removePaymentMethod,
      resolveModuleTypography: resolveContentTypography,
    }),
    [
      addModule,
      addPaymentMethod,
      content,
      duplicateModule,
      paymentMethods,
      removeModule,
      removePaymentMethod,
      setField,
      typography,
      updateModule,
      updatePaymentMethod,
    ],
  );
}

export type ClassContentEditor = ReturnType<typeof useClassContentEditor>;
