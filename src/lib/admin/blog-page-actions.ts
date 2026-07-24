import type { BlogPageSettings } from "@/lib/cms/types";

export const BLOG_PAGE_SAVE_ENDPOINT = "/api/admin/blog-page";

export type BlogPageSavePayload = Partial<BlogPageSettings> & {
  status?: BlogPageSettings["status"];
};

export type BlogPageSaveResult =
  | { ok: true; page: BlogPageSettings }
  | { ok: false; error: string };

export async function saveBlogPageSettingsAction(payload: BlogPageSavePayload): Promise<BlogPageSaveResult> {
  try {
    const response = await fetch(BLOG_PAGE_SAVE_ENDPOINT, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await response.json().catch(() => ({}))) as {
      page?: BlogPageSettings;
      error?: string;
    };

    if (!response.ok || !data.page) {
      return { ok: false, error: data.error || "No se pudo guardar la página." };
    }

    return { ok: true, page: data.page };
  } catch {
    return { ok: false, error: "Revisa la conexión y vuelve a intentarlo." };
  }
}
