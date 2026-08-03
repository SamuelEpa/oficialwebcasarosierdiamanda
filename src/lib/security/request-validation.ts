type JsonObject = Record<string, unknown>;

export class ApiRequestError extends Error {
  readonly status: number;
  readonly code: string;

  constructor(message: string, status: number, code: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export async function readJsonObject(request: Request, maxBytes: number): Promise<JsonObject> {
  const contentType = request.headers.get("content-type")?.split(";", 1)[0].trim().toLowerCase();
  if (contentType !== "application/json") {
    throw new ApiRequestError("El contenido debe ser JSON.", 415, "unsupported_media_type");
  }

  const declaredLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > maxBytes) {
    throw new ApiRequestError("La solicitud es demasiado grande.", 413, "payload_too_large");
  }

  const buffer = await request.arrayBuffer();
  if (buffer.byteLength > maxBytes) {
    throw new ApiRequestError("La solicitud es demasiado grande.", 413, "payload_too_large");
  }

  let value: unknown;
  try {
    value = JSON.parse(new TextDecoder().decode(buffer));
  } catch {
    throw new ApiRequestError("JSON no valido.", 400, "invalid_json");
  }

  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new ApiRequestError("La solicitud debe contener un objeto JSON.", 400, "invalid_json_object");
  }
  return value as JsonObject;
}