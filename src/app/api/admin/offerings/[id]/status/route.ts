import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminApi } from "@/lib/auth/supabase-auth";
import { getOfferingById, updateOffering } from "@/lib/cms/offerings";
import { invalidatePublicNavigationCache } from "@/lib/cms/navigation-public";
import type { Offering, OfferingStatus } from "@/lib/cms/types";

function publicOfferingPath(offering: Pick<Offering, "type" | "slug"> | null | undefined) {
  if (!offering?.slug) return null;
  if (offering.type === "workshop") return `/workshops/${offering.slug}`;
  if (offering.type === "experience") return `/experiencias/${offering.slug}`;
  if (offering.type === "gift_card") return `/gift-cards/${offering.slug}`;
  return `/clases/${offering.slug}`;
}

function refreshOfferingPaths(...offerings: Array<Pick<Offering, "type" | "slug"> | null | undefined>) {
  invalidatePublicNavigationCache();
  revalidatePath("/admin/clases");
  revalidatePath("/admin/workshops");
  revalidatePath("/admin/experiencias");
  revalidatePath("/admin/gift-cards");
  revalidatePath("/");
  revalidatePath("/clases");
  revalidatePath("/workshops");
  revalidatePath("/experiencias");
  revalidatePath("/gift-cards");
  revalidatePath("/el-estudio");
  revalidatePath("/shop");
  for (const offering of offerings) {
    const path = publicOfferingPath(offering);
    if (path) revalidatePath(path);
  }
}

function resolveStatus(enabled: boolean): OfferingStatus {
  return enabled ? "published" : "draft";
}

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const session = await requireAdminApi();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const body = (await request.json().catch(() => ({}))) as { enabled?: boolean };

  if (typeof body.enabled !== "boolean") {
    return NextResponse.json({ error: "El campo enabled es obligatorio." }, { status: 400 });
  }

  const offering = await getOfferingById(id);
  if (!offering) {
    return NextResponse.json({ error: "Offering no encontrado" }, { status: 404 });
  }

  if (offering.status === "deleted" || offering.status === "archived") {
    return NextResponse.json({ error: "No se puede cambiar el estado de un contenido archivado o eliminado." }, { status: 400 });
  }

  const nextStatus = resolveStatus(body.enabled);
  if (offering.status === nextStatus) {
    return NextResponse.json({ offering });
  }

  const updated = await updateOffering(id, { ...offering, status: nextStatus });
  if (!updated) {
    return NextResponse.json({ error: "No se pudo actualizar el estado." }, { status: 500 });
  }

  refreshOfferingPaths(offering, updated);
  return NextResponse.json({ offering: updated, enabled: nextStatus === "published" });
}
