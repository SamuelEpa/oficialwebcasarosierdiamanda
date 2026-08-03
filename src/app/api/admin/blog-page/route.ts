import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminApi } from "@/lib/auth/supabase-auth";
import { getBlogPageSettings, updateBlogPageSettings } from "@/lib/cms/blog-page";
import { internalApiError } from "@/lib/security/api-response";

export async function GET() {
  if (!(await requireAdminApi())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ page: await getBlogPageSettings() });
}

export async function PUT(request: Request) {
  if (!(await requireAdminApi())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const page = await updateBlogPageSettings(await request.json());
    revalidatePath("/blog");
    revalidatePath("/admin/bitacora");
    return NextResponse.json({ page });
  } catch (error) {
    return internalApiError(error, "No se pudo guardar la página.", 400);
  }
}
