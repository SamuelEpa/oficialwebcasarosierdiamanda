import AdminShell from "@/components/admin/AdminShell";
import InternalLinksManager from "@/components/admin/links/InternalLinksManager";
import { getInternalLinks } from "@/lib/cms/internal-links";

export default async function LinksPage() {
  const items = await getInternalLinks();

  return (
    <AdminShell>
      <InternalLinksManager items={items} />
    </AdminShell>
  );
}