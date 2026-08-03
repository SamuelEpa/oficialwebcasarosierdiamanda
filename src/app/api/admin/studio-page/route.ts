import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminApi } from "@/lib/auth/supabase-auth";
import { getStudioPageSettings, updateStudioPageSettings } from "@/lib/cms/studio-page";
import { internalApiError } from "@/lib/security/api-response";

export async function GET() {
  if (!(await requireAdminApi())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ page: await getStudioPageSettings() });
}

export async function PUT(request: Request) {
  if (!(await requireAdminApi())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const page = await updateStudioPageSettings(await request.json());
    revalidatePath("/el-estudio");
    return NextResponse.json({ page });
  } catch (error) {
    return internalApiError(error, "No se pudo guardar la página.", 400);
  }
}
