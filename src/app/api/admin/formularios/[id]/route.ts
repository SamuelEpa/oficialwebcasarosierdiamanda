import { errorMessageFromUnknown } from "@/lib/cms/form-field-persistence";
import { requireAdminApi } from "@/lib/auth/supabase-auth";
import {
  FOOTER_CONTACT_FORM_PROTECTED_MESSAGE,
  isProtectedFooterContactForm,
  validateFormSlugForUpdate,
} from "@/lib/cms/form-slug-guards";
import { getFooterContactForm } from "@/lib/cms/footer-contact-form";
import {
  deleteFormPermanently,
  duplicateForm,
  getFormById,
  moveFormToTrash,
  restoreForm,
  updateForm,
} from "@/lib/cms/forms";
import { type NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

async function footerContactFormId() {
  const form = await getFooterContactForm();
  return form?.id ?? null;
}

export async function GET(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminApi())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const item = await getFormById((await ctx.params).id);
  if (!item) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  return NextResponse.json({ form: item });
}

export async function PUT(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminApi())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  const body = await request.json();
  const reservedId = await footerContactFormId();
  const slugError = validateFormSlugForUpdate(String(body.slug ?? ""), id, reservedId);
  if (slugError) return NextResponse.json({ error: slugError }, { status: 409 });

  try {
    const item = await updateForm(id, body);
    if (!item) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    revalidatePath("/", "layout");
    revalidatePath("/admin/components/footers");
    revalidatePath("/admin/formularios");
    return NextResponse.json({ form: item });
  } catch (err) {
    return NextResponse.json({ error: errorMessageFromUnknown(err, "No se pudo guardar el formulario.") }, { status: 400 });
  }
}

export async function PATCH(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminApi())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  const body = await request.json().catch(() => ({}));
  const reservedId = await footerContactFormId();

  if (body.action === "duplicate" || body.action === "trash") {
    if (isProtectedFooterContactForm(id, reservedId)) {
      return NextResponse.json({ error: FOOTER_CONTACT_FORM_PROTECTED_MESSAGE }, { status: 409 });
    }
  }

  if (body.action === "duplicate") {
    const item = await duplicateForm(id);
    if (!item) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    return NextResponse.json({ form: item });
  }
  if (body.action === "trash") {
    const item = await moveFormToTrash(id);
    if (!item) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    return NextResponse.json({ form: item });
  }
  if (body.action === "restore") {
    const item = await restoreForm(id);
    if (!item) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    return NextResponse.json({ form: item });
  }
  if (body.action === "activate") {
    const updated = await updateForm(id, { status: "active" });
    return NextResponse.json({ form: updated });
  }
  if (body.action === "draft") {
    const updated = await updateForm(id, { status: "draft" });
    return NextResponse.json({ form: updated });
  }
  return NextResponse.json({ error: "Acción no válida" }, { status: 400 });
}

export async function DELETE(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminApi())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  const reservedId = await footerContactFormId();
  if (isProtectedFooterContactForm(id, reservedId)) {
    return NextResponse.json({ error: FOOTER_CONTACT_FORM_PROTECTED_MESSAGE }, { status: 409 });
  }
  const ok = await deleteFormPermanently(id);
  if (!ok) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
