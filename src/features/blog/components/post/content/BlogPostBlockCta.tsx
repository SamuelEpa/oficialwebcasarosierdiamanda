import Link from "next/link";
import { internalHref } from "@/lib/assets";

export function BlogPostBlockCta({ text, href }: { text: string; href: string }) {
  return (
    <div className="blog-article__inline-cta">
      <Link className="blog-article__pill-btn" href={internalHref(href)}>
        {text}
      </Link>
    </div>
  );
}
