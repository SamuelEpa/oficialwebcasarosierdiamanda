export const MAX_UPLOAD_SIZE = 10 * 1024 * 1024;
export const ALLOWED_UPLOAD_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp", "avif", "gif", "pdf"]);
export const ALLOWED_UPLOAD_MIME_PREFIXES = ["image/", "application/pdf"];

export function hasAllowedFileSignature(buffer: Uint8Array, extension: string) {
  const bytes = Buffer.from(buffer);
  const normalizedExtension = extension.toLowerCase().replace(/^\./, "");
  const hex = bytes.subarray(0, 12).toString("hex");

  if (normalizedExtension === "jpg" || normalizedExtension === "jpeg") return hex.startsWith("ffd8ff");
  if (normalizedExtension === "png") return hex.startsWith("89504e470d0a1a0a");
  if (normalizedExtension === "gif") {
    const signature = bytes.subarray(0, 6).toString("ascii");
    return signature === "GIF87a" || signature === "GIF89a";
  }
  if (normalizedExtension === "webp") {
    return bytes.subarray(0, 4).toString("ascii") === "RIFF"
      && bytes.subarray(8, 12).toString("ascii") === "WEBP";
  }
  if (normalizedExtension === "avif") {
    const brand = bytes.subarray(4, 12).toString("ascii");
    return brand.includes("ftypavif") || brand.includes("ftypavis");
  }
  if (normalizedExtension === "pdf") return bytes.subarray(0, 5).toString("ascii") === "%PDF-";
  return false;
}