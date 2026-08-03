import { type NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth/supabase-auth";
import { createCmsAdminUser, getCmsAdminUsers } from "@/lib/admin/users";
import { internalApiError } from "@/lib/security/api-response";

export async function GET() {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const users = await getCmsAdminUsers();
    return NextResponse.json({ users });
  } catch (error) {
    return internalApiError(error, "No se pudieron cargar los usuarios.");
  }
}

export async function POST(request: NextRequest) {
  const session = await requireAdminApi();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = (await request.json().catch(() => ({}))) as {
      email?: string;
      password?: string;
      full_name?: string;
    };

    await createCmsAdminUser({
      email: body.email ?? "",
      password: body.password ?? "",
      full_name: body.full_name,
      actorEmail: session.userEmail,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return internalApiError(error, "No se pudo crear el usuario.", 400);
  }
}
