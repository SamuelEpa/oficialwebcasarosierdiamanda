import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";

export function internalApiError(error: unknown, publicMessage: string, status = 500) {
  const requestId = randomUUID();
  console.error(`[api:${requestId}]`, error);
  return NextResponse.json({ error: publicMessage, requestId }, { status });
}