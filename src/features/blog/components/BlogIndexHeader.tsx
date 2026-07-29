import { HeaderInterno } from "@/components/layout/HeaderInterno";

/** Blog index: navigation band only; masthead lives in the page body (mock). */
export async function BlogIndexHeader() {
  return (
    <HeaderInterno
      height="small"
      className="blog-index-header page-hero--nav-only"
      heroMenuTone="dark"
    />
  );
}
