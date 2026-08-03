import { recordMarketingEvent } from "@/lib/cms/marketing";
import { NextResponse, type NextRequest } from "next/server";
import { apiErrorResponse, enforceRateLimit, readJsonObject } from "@/lib/security/api-protection";

function optionalString(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : undefined;
}

export async function POST(request: NextRequest) {
  try {
    await enforceRateLimit(request, { route: "marketing/track-event", limit: 60, windowSeconds: 60 });
    const body = await readJsonObject(request, 16 * 1024);
    const eventName = optionalString(body.eventName, 64);
    if (!eventName || !/^[a-zA-Z0-9_.:-]+$/.test(eventName)) {
      return NextResponse.json({ error: "eventName es obligatorio o no es valido." }, { status: 400 });
    }

    const metadata = typeof body.metadata === "object" && body.metadata !== null && !Array.isArray(body.metadata)
      ? body.metadata as Record<string, unknown>
      : undefined;
    if (metadata && JSON.stringify(metadata).length > 4096) {
      return NextResponse.json({ error: "metadata es demasiado grande." }, { status: 400 });
    }

    const userAgent = request.headers.get("user-agent")?.slice(0, 512) ?? "";
    const result = await recordMarketingEvent({
      eventName,
      pageUrl: optionalString(body.pageUrl, 2048),
      pageTitle: optionalString(body.pageTitle, 300),
      contentType: optionalString(body.contentType, 100),
      contentId: optionalString(body.contentId, 200),
      campaignId: optionalString(body.campaignId, 200),
      source: optionalString(body.source, 200),
      medium: optionalString(body.medium, 200),
      device: optionalString(body.device, 512) || userAgent,
      country: optionalString(body.country, 100),
      city: optionalString(body.city, 100),
      metadata,
    });

    return NextResponse.json({ ok: Boolean(result), event: result });
  } catch (error) {
    return apiErrorResponse(error);
  }
}
