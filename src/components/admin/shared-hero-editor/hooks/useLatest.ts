"use client";

import { useEffect, useRef } from "react";

/** Stable ref to the latest value; updates after commit (safe for event handlers). */
export function useLatest<T>(value: T) {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  });
  return ref;
}
