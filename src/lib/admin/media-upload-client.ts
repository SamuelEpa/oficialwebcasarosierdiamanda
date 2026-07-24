import { prepareFileForAdminUpload } from "./media-upload-prepare";

export const MEDIA_UPLOAD_ENDPOINT = "/api/admin/media/upload";

export const MEDIA_UPLOAD_MAX_BYTES = 10 * 1024 * 1024;

export type MediaUploadOptimization = {
  optimized: boolean;
  originalSize: number;
  finalSize: number;
  savedBytes: number;
  reductionPercent: number;
  width?: number;
  height?: number;
};

export type MediaUploadResult =
  | { ok: true; fileUrl: string; optimization?: MediaUploadOptimization; clientCompressed?: boolean }
  | { ok: false; error: string };

export type UploadAdminMediaInput = {
  file: File;
  folder: string;
  title?: string;
  altText?: string;
  /** Skip browser resize/compress (e.g. when file was already prepared). */
  skipClientPrepare?: boolean;
};

function formatMegabytes(bytes: number) {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function validateImageFileForUpload(file: File): string | null {
  if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
    return "Selecciona una imagen o PDF válido.";
  }
  if (file.size > MEDIA_UPLOAD_MAX_BYTES) {
    return `El archivo supera el límite de ${formatMegabytes(MEDIA_UPLOAD_MAX_BYTES)}.`;
  }
  return null;
}

export async function uploadAdminMediaFile(input: UploadAdminMediaInput): Promise<MediaUploadResult> {
  const prepared = input.skipClientPrepare
    ? { file: input.file, clientCompressed: false }
    : await prepareFileForAdminUpload(input.file);

  const validationError = validateImageFileForUpload(prepared.file);
  if (validationError) {
    return { ok: false, error: validationError };
  }

  const formData = new FormData();
  formData.append("file", prepared.file);
  formData.append("folder", input.folder);
  if (input.title) formData.append("title", input.title);
  if (input.altText) formData.append("alt_text", input.altText);
  if (prepared.clientCompressed) {
    formData.append("client_compressed", "1");
  }

  try {
    const response = await fetch(MEDIA_UPLOAD_ENDPOINT, {
      method: "POST",
      body: formData,
    });

    const data = (await response.json().catch(() => ({}))) as {
      asset?: { file_url?: string };
      error?: string;
      optimization?: MediaUploadOptimization;
    };

    if (!response.ok || !data.asset?.file_url) {
      return { ok: false, error: data.error || "No se pudo subir el archivo." };
    }

    return {
      ok: true,
      fileUrl: data.asset.file_url,
      optimization: data.optimization,
      clientCompressed: prepared.clientCompressed,
    };
  } catch {
    return { ok: false, error: "No se pudo conectar con el servidor de medios." };
  }
}

export { formatMegabytes as formatUploadMegabytes };
