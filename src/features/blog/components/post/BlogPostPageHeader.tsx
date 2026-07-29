import { HeaderInterno } from "@/components/layout/HeaderInterno";

export async function BlogPostPageHeader() {
  return (
    <HeaderInterno
      height="small"
      className="blog-post-header page-hero--nav-only"
      heroMenuTone="dark"
    />
  );
}
