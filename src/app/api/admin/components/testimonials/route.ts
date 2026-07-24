import { requireAdminApi } from "@/lib/auth/supabase-auth";
import { invalidatePublicContentCache } from "@/lib/cms/public-content";
import {
  createTestimonial,
  listAdminTestimonials,
  reorderTestimonials,
  type TestimonialAdminStatusFilter,
} from "@/lib/cms/testimonials";
import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

function refreshTestimonialViews() {
  invalidatePublicContentCache();
  revalidatePath("/", "layout");
  revalidatePath("/el-estudio");
  revalidatePath("/admin/components/testimonials");
}

function parseStatus(value: string | null): TestimonialAdminStatusFilter {
  if (value === "draft" || value === "published") return value;
  return "all";
}

export async function GET(request: NextRequest) {
  if (!(await requireAdminApi())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const status = parseStatus(request.nextUrl.searchParams.get("status"));
  const items = await listAdminTestimonials(status);
  return NextResponse.json({ testimonials: items });
}

export async function POST(request: NextRequest) {
  if (!(await requireAdminApi())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json().catch(() => ({}));
  if (!body?.name) return NextResponse.json({ error: "El nombre es obligatorio." }, { status: 400 });
  try {
    const item = await createTestimonial(body);
    refreshTestimonialViews();
    return NextResponse.json({ testimonial: item });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "No se pudo guardar el testimonio." },
      { status: 400 },
    );
  }
}

export async function PUT(request: NextRequest) {
  if (!(await requireAdminApi())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json().catch(() => ({}));
  if (body.action !== "reorder" || !Array.isArray(body.orderedIds)) {
    return NextResponse.json({ error: "Acción no válida" }, { status: 400 });
  }
  const items = await reorderTestimonials(body.orderedIds.filter((id: unknown) => typeof id === "string"));
  refreshTestimonialViews();
  return NextResponse.json({ testimonials: items });
}
