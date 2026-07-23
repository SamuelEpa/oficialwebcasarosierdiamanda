import Image from "next/image";

export function ImagePreview({
  src,
  alt,
  aspect = "aspect-video",
}: {
  src: string;
  alt: string;
  aspect?: string;
}) {
  if (!src) return null;
  return (
    <div className={`relative overflow-hidden rounded-xl border border-outline-variant bg-surface-container-high ${aspect}`}>
      <Image src={src} alt={alt} fill sizes="720px" className="object-cover" unoptimized />
    </div>
  );
}
