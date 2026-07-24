import { requireAdminApi } from "@/lib/auth/supabase-auth";
import { createCategory, getCategories } from "@/lib/cms/product-categories";
import { type NextRequest, NextResponse } from "next/server";

function sortCategories<T extends { sort_order: number; name: string }>(items: T[]) {
  return [...items].sort(
    (a, b) => a.sort_order - b.sort_order || a.name.localeCompare(b.name, "es"),
  );
}

export async function GET(request: NextRequest) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const usableOnly = request.nextUrl.searchParams.get("usable") === "1";
  const items = await getCategories();

  const categories = usableOnly
    ? sortCategories(
        items.filter((category) => category.status === "active" && !category.deleted_at),
      )
    : sortCategories(items);

  return NextResponse.json({ categories });
}

export async function POST(request: NextRequest) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  if (!body?.name) {
    return NextResponse.json({ error: "El nombre es obligatorio." }, { status: 400 });
  }

  try {
    const item = await createCategory(body);
    return NextResponse.json({ category: item });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Error" },
      { status: 400 },
    );
  }
}
