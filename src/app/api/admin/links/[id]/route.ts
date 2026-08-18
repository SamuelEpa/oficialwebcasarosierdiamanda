import { requireAdminApi } from "@/lib/auth/supabase-auth";
import { deleteInternalLink, getInternalLinkById, toggleInternalLinkActive, updateInternalLink } from "@/lib/cms/internal-links";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminApi())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const item = await getInternalLinkById((await ctx.params).id);
  if (!item) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  return NextResponse.json({ link: item });
}

export async function PUT(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminApi())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const item = await updateInternalLink((await ctx.params).id, await request.json());
    if (!item) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    return NextResponse.json({ link: item });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Error" }, { status: 400 });
  }
}

export async function PATCH(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminApi())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  const body = await request.json().catch(() => ({}));
  if (body.action === "toggle_active") {
    const item = await toggleInternalLinkActive(id);
    if (!item) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    return NextResponse.json({ link: item });
  }
  return NextResponse.json({ error: "Acción no válida" }, { status: 400 });
}

export async function DELETE(_request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminApi())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const ok = await deleteInternalLink((await ctx.params).id);
  if (!ok) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  return NextResponse.json({ ok: true });
}