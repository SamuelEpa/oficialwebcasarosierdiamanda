import type { NavigationItem } from "@/data/types";
import type { SiteSettings } from "@/lib/cms/settings";
import type { BlogPost } from "@/lib/cms/types";
import { BlogFormView } from "./blog-form/BlogFormView";

export default function BlogForm({
  mode,
  item,
  navigationItems,
  menuSettings,
}: {
  mode: "create" | "edit";
  item?: BlogPost;
  navigationItems: NavigationItem[];
  menuSettings: SiteSettings["menu"];
}) {
  return <BlogFormView mode={mode} item={item} navigationItems={navigationItems} menuSettings={menuSettings} />;
}
