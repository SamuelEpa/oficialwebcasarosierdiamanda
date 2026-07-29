import type { StudioPageSettings } from "@/lib/cms/types";

export const STUDIO_PAGE_SAVE_ENDPOINT = "/api/admin/studio-page";

export type StudioPageSavePayload = Partial<StudioPageSettings> & {
  status?: StudioPageSettings["status"];
};

export type StudioPageSaveResult =
  | { ok: true; page: StudioPageSettings }
  | { ok: false; error: string };

export async function saveStudioPageSettingsAction(
  payload: StudioPageSavePayload,
): Promise<StudioPageSaveResult> {
  try {
    const response = await fetch(STUDIO_PAGE_SAVE_ENDPOINT, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await response.json().catch(() => ({}))) as {
      page?: StudioPageSettings;
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
