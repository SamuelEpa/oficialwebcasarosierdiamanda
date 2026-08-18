import { requireAdminApi } from "@/lib/auth/supabase-auth";
import { createInternalLink, getInternalLinks } from "@/lib/cms/internal-links";
import { type NextRequest, NextResponse } from "next/server";

export async function GET() {
  if (!(await requireAdminApi())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const links = await getInternalLinks();
  return NextResponse.json({ links });
}

export async function POST(request: NextRequest) {
  if (!(await requireAdminApi())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  if (!body?.label || !body?.url) return NextResponse.json({ error: "label y url son obligatorios." }, { status: 400 });
  try {
    const link = await createInternalLink(body);
    return NextResponse.json({ link });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Error" }, { status: 400 });
  }
}