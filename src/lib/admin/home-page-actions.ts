import type { HomePageSettings } from "@/lib/cms/types";

export const HOME_PAGE_SAVE_ENDPOINT = "/api/admin/home-page";

export type HomePageSavePayload = Partial<HomePageSettings> & {
  status?: HomePageSettings["status"];
};

export type HomePageSaveResult =
  | { ok: true; page: HomePageSettings }
  | { ok: false; error: string };

export async function saveHomePageSettingsAction(
  payload: HomePageSavePayload,
): Promise<HomePageSaveResult> {
  try {
    const response = await fetch(HOME_PAGE_SAVE_ENDPOINT, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await response.json().catch(() => ({}))) as {
      page?: HomePageSettings;
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
