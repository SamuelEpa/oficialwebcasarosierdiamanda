import { requireAdminApi } from "@/lib/auth/supabase-auth";
import { invalidatePublicContentCache } from "@/lib/cms/public-content";
import {
  deleteTestimonialPermanently,
  duplicateTestimonial,
  getTestimonialById,
  moveTestimonialToTrash,
  restoreTestimonial,
  setTestimonialStatus,
  updateTestimonial,
} from "@/lib/cms/testimonials";
import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

function refreshTestimonialViews() {
  invalidatePublicContentCache();
  revalidatePath("/", "layout");
  revalidatePath("/el-estudio");
  revalidatePath("/admin/components/testimonials");
}

export async function GET(_request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminApi())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const item = await getTestimonialById((await ctx.params).id);
  if (!item) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  return NextResponse.json({ testimonial: item });
}

export async function PUT(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminApi())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    const item = await updateTestimonial((await ctx.params).id, body);
    if (!item) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    refreshTestimonialViews();
    return NextResponse.json({ testimonial: item });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "No se pudo guardar el testimonio." },
      { status: 400 },
    );
  }
}

export async function PATCH(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminApi())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  const body = await request.json().catch(() => ({}));

  if (body.action === "duplicate") {
    const item = await duplicateTestimonial(id);
    if (!item) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    refreshTestimonialViews();
    return NextResponse.json({ testimonial: item });
  }

  if (body.action === "trash") {
    const item = await moveTestimonialToTrash(id);
    if (!item) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    refreshTestimonialViews();
    return NextResponse.json({ testimonial: item });
  }

  if (body.action === "restore") {
    const item = await restoreTestimonial(id);
    if (!item) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    refreshTestimonialViews();
    return NextResponse.json({ testimonial: item });
  }

  const nextStatus =
    body.action === "publish"
      ? "published"
      : body.action === "archive"
        ? "archived"
        : body.action === "draft"
          ? "draft"
          : null;

  if (!nextStatus) return NextResponse.json({ error: "Acción no válida" }, { status: 400 });

  // Single write path — no prior GET + update double-hit.
  const updated = await setTestimonialStatus(id, nextStatus);
  if (!updated) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  refreshTestimonialViews();
  return NextResponse.json({ testimonial: updated });
}

export async function DELETE(_request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminApi())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const ok = await deleteTestimonialPermanently((await ctx.params).id);
  if (!ok) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  refreshTestimonialViews();
  return NextResponse.json({ ok: true });
}
