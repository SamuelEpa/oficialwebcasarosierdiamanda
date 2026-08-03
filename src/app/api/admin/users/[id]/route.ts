import { type NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth/supabase-auth";
import { deleteCmsAdminUser, updateCmsAdminUserPassword } from "@/lib/admin/users";
import { internalApiError } from "@/lib/security/api-response";

export async function PATCH(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const session = await requireAdminApi();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await ctx.params;
    const body = (await request.json().catch(() => ({}))) as { password?: string };
    await updateCmsAdminUserPassword(id, body.password ?? "", session.userEmail);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return internalApiError(error, "No se pudo actualizar la contraseña.", 400);
  }
}

export async function DELETE(_request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const session = await requireAdminApi();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await ctx.params;
    await deleteCmsAdminUser(id, session.userEmail);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return internalApiError(error, "No se pudo eliminar el usuario.", 400);
  }
}
