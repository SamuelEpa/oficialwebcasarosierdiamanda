import { requireAdminApi } from "@/lib/auth/supabase-auth";
import { runSeoAudit } from "@/lib/cms/marketing";
import { NextResponse } from "next/server";
import { internalApiError } from "@/lib/security/api-response";

export async function POST() {
  if (!(await requireAdminApi())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const result = await runSeoAudit();
    return NextResponse.json(result);
  } catch (error) {
    return internalApiError(error, "No se pudo ejecutar la auditoría SEO.");
  }
}
