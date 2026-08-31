import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminApi } from "@/lib/auth/supabase-auth";
import { getHomePageSettings, updateHomePageSettings } from "@/lib/cms/home-page";
import { internalApiError } from "@/lib/security/api-response";

export async function GET() {
  if (!(await requireAdminApi())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ page: await getHomePageSettings() });
}

export async function PUT(request: Request) {
  if (!(await requireAdminApi())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const page = await updateHomePageSettings(await request.json());
    revalidatePath("/", "layout");
    revalidatePath("/admin/home");
    return NextResponse.json({ page });
  } catch (error) {
    return internalApiError(error, "No se pudo guardar la home.", 400);
  }
}
