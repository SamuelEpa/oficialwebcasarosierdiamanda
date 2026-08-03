import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createMediaAsset } from "@/lib/cms/media";
import { optimizeImageForUpload } from "@/lib/cms/image-optimization";

import { isMediaFolder } from "@/lib/cms/types";
import { requireAdminApi } from "@/lib/auth/supabase-auth";
import { randomUUID } from "crypto";
import { internalApiError } from "@/lib/security/api-response";
import {
  ALLOWED_UPLOAD_EXTENSIONS,
  ALLOWED_UPLOAD_MIME_PREFIXES,
  hasAllowedFileSignature,
  MAX_UPLOAD_SIZE,
} from "@/lib/security/file-upload";

export const runtime = "nodejs";

const STORAGE_BUCKET = "media";

async function verifyStoredFile(
  supabase: ReturnType<typeof createAdminClient>,
  storagePath: string,
  expectedSize: number,
) {
  const { data, error } = await supabase.storage.from(STORAGE_BUCKET).download(storagePath);
  if (error || !data || data.size !== expectedSize) {
    try {
      await supabase.storage.from(STORAGE_BUCKET).remove([storagePath]);
    } catch {
      // Best effort cleanup after a failed verification.
    }
    throw error ?? new Error("El archivo guardado no coincide con la imagen enviada.");
  }
}

export async function POST(request: NextRequest) {
  const session = await requireAdminApi();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const contentType = request.headers.get("content-type")?.toLowerCase() ?? "";
  if (!contentType.startsWith("multipart/form-data;")) {
    return NextResponse.json({ error: "El contenido debe ser multipart/form-data." }, { status: 415 });
  }
  const declaredLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_UPLOAD_SIZE + 256 * 1024) {
    return NextResponse.json({ error: "La solicitud supera el limite permitido." }, { status: 413 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch (error) {
    return internalApiError(error, "No se pudo leer el archivo enviado.", 400);
  }
  const fileValue = formData.get("file");
  const file = fileValue instanceof File ? fileValue : null;
  const folder = String(formData.get("folder") || "general").trim();
  const altText = String(formData.get("alt_text") || "").trim();
  const title = String(formData.get("title") || "").trim();
  const skipOptimize =
    formData.get("client_compressed") === "1" || formData.get("skip_optimize") === "1";

  if (!file || !file.name) {
    return NextResponse.json({ error: "No se recibió ningún archivo." }, { status: 400 });
  }

  if (!isMediaFolder(folder)) {
    return NextResponse.json({ error: "Folder no válido." }, { status: 400 });
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "";
  if (!ALLOWED_UPLOAD_EXTENSIONS.has(ext)) {
    return NextResponse.json({ error: `Extensión .${ext} no permitida. Solo se aceptan imágenes y PDF.` }, { status: 400 });
  }

  if (!ALLOWED_UPLOAD_MIME_PREFIXES.some((p) => file.type.startsWith(p))) {
    return NextResponse.json({ error: "Tipo de archivo no permitido." }, { status: 400 });
  }

  if (file.size > MAX_UPLOAD_SIZE) {
    return NextResponse.json({ error: "El archivo supera el límite de 10 MB." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  if (!hasAllowedFileSignature(buffer, ext)) {
    return NextResponse.json({ error: "El contenido del archivo no coincide con su tipo." }, { status: 400 });
  }

  try {
    const optimizedFile = await optimizeImageForUpload({
      buffer,
      extension: ext,
      mimeType: file.type,
      skipOptimize,
    });
    const safeName = `${Date.now()}-${randomUUID().slice(0, 8)}.${optimizedFile.extension}`;
    const storagePath = `${folder}/${safeName}`;
    const supabase = createAdminClient();
    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(storagePath, optimizedFile.buffer, {
        contentType: optimizedFile.mimeType,
        upsert: false,
      });
    if (uploadError) {
      return internalApiError(uploadError, "No se pudo guardar el archivo.");
    }

    // Never persist or return a public URL until the exact uploaded bytes can be read back.
    await verifyStoredFile(supabase, storagePath, optimizedFile.size);

    const { data: publicUrlData } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(storagePath);
    const fileUrl = publicUrlData.publicUrl;

    const asset = await createMediaAsset({
      file_name: storagePath,
      original_name: file.name,
      file_url: fileUrl,
      file_type: optimizedFile.extension,
      mime_type: optimizedFile.mimeType,
      size: optimizedFile.size,
      alt_text: altText,
      title: title || file.name,
      description: "",
      folder,
      tags: optimizedFile.optimized ? ["optimized"] : [],
      status: "active",
    });

    return NextResponse.json({
      asset,
      optimization: {
        optimized: optimizedFile.optimized,
        originalSize: optimizedFile.originalSize,
        finalSize: optimizedFile.size,
        savedBytes: optimizedFile.savedBytes,
        reductionPercent: optimizedFile.reductionPercent,
        width: optimizedFile.width,
        height: optimizedFile.height,
      },
    });
  } catch (error) {
    return internalApiError(error, "No se pudo subir el archivo.");
  }
}
