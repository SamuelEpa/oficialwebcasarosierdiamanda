"use client";

import AdminActionModal from "@/components/admin/AdminActionModal";
import { TestimonialsEmptyState } from "./components/TestimonialsEmptyState";
import { TestimonialsFilters } from "./components/TestimonialsFilters";
import { TestimonialListCard } from "./components/TestimonialListCard";
import { TestimonialsOrderBar } from "./components/TestimonialsOrderBar";
import { TestimonialsPageHeader } from "./components/TestimonialsPageHeader";
import { useTestimonialsTable } from "./hooks/useTestimonialsTable";
import type { Testimonial, TestimonialFilter, TestimonialFilterValue } from "./types";

export default function TestimonialsTable({
  items,
  filters,
  status,
}: {
  items: Testimonial[];
  filters: readonly TestimonialFilter[];
  status: TestimonialFilterValue;
}) {
  const table = useTestimonialsTable(items);

  return (
    <div className="testimonial-admin-view">
      <TestimonialsPageHeader
        stats={table.stats}
        hasOrderChanges={table.hasOrderChanges}
        isSavingOrder={table.isSavingOrder}
        onSaveOrder={() => void table.saveOrder()}
      />

      <TestimonialsFilters filters={filters} status={status} />

      <div className="admin-card-list testimonial-card-list">
        {!table.orderedItems.length ? <TestimonialsEmptyState status={status} /> : null}

        {table.orderedItems.map((testimonial, index) => {
          const isPending = Boolean(table.pendingAction?.startsWith(`${testimonial.id}:`));
          return (
            <TestimonialListCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
              total={table.orderedItems.length}
              isPending={isPending}
              isBusy={table.isBusy}
              onMoveUp={() => table.moveItem(index, index - 1)}
              onMoveDown={() => table.moveItem(index, index + 1)}
              onPublishToggle={() =>
                void table.run(testimonial.id, testimonial.status === "published" ? "draft" : "publish")
              }
              onTrash={() => table.requestTrash(testimonial)}
            />
          );
        })}
      </div>

      <TestimonialsOrderBar
        visible={table.hasOrderChanges}
        isSavingOrder={table.isSavingOrder}
        onSaveOrder={() => void table.saveOrder()}
      />

      <AdminActionModal
        open={Boolean(table.notice)}
        type={table.notice?.type}
        title={table.notice?.title ?? ""}
        message={table.notice?.message}
        confirmLabel="Entendido"
        onClose={table.closeNotice}
      />
      <AdminActionModal
        open={Boolean(table.confirm)}
        type="confirm"
        title={table.confirm?.title ?? ""}
        message={table.confirm?.message}
        confirmLabel={table.confirm?.confirmLabel}
        cancelLabel="Cancelar"
        onConfirm={table.confirmTrash}
        onClose={table.closeConfirm}
      />
    </div>
  );
}
