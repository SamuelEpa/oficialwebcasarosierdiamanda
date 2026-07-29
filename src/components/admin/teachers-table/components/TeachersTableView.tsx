"use client";

import Image from "next/image";
import { memo } from "react";
import AdminActionModal from "@/components/admin/AdminActionModal";
import { OfferingStatusSwitch } from "@/components/admin/offerings-category/OfferingStatusSwitch";
import { TEACHER_ADMIN_LIST_PATH, TEACHER_STATUS_LABELS } from "@/lib/admin/teacher-actions";
import { assetPath } from "@/lib/assets";
import type { Teacher } from "@/lib/cms/types";
import { TeacherRowActions } from "./TeacherRowActions";
import { TeacherTrashDialog } from "./TeacherTrashDialog";
import { useTeachersTableActions, type TeachersTableSyncHandlers } from "../hooks/useTeachersTableActions";

function statusPillClass(status: Teacher["status"]) {
  if (status === "published") return "status-pill status-pill--published";
  if (status === "draft") return "status-pill status-pill--draft";
  if (status === "archived") return "status-pill status-pill--archived";
  return "status-pill";
}

export type TeachersTableViewProps = TeachersTableSyncHandlers & {
  items: Teacher[];
  basePath?: string;
  showDuplicate?: boolean;
  showArchive?: boolean;
};

function TeachersTableViewComponent({
  items,
  basePath = TEACHER_ADMIN_LIST_PATH,
  showDuplicate = true,
  showArchive = true,
  onTeacherUpdated,
  onTeacherRemoved,
}: TeachersTableViewProps) {
  const actions = useTeachersTableActions({ onTeacherUpdated, onTeacherRemoved });
  const visibleItems = actions.filterVisibleItems(items);

  return (
    <>
      <div className="table-card blog-table-card overflow-hidden rounded-2xl border border-outline-variant/70 shadow-sm">
        <table className="admin-table blog-admin-table blog-admin-table--v2 w-full">
          <thead>
            <tr>
              <th className="blog-admin-table__col-entry">Especialista</th>
              <th className="blog-admin-table__col-status">Estado</th>
              <th className="blog-admin-table__col-visibility">En sitio</th>
              <th>Orden</th>
              <th className="blog-admin-table__col-actions">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {visibleItems.map((teacher) => {
              const rowPending = actions.isPending(teacher.id);
              const status = actions.resolveStatus(teacher);
              const enabled = actions.isEnabled(teacher);
              const isStatusPending = actions.statusPendingId === teacher.id;
              const isArchived = status === "archived";
              const imageSrc = teacher.image_id ? assetPath(teacher.image_id) : "";

              return (
                <tr key={teacher.id} className={rowPending || isStatusPending ? "opacity-70" : undefined}>
                  <td className="blog-admin-table__col-entry">
                    <div className="flex min-w-0 items-center gap-3 py-1">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-outline-variant bg-surface-container-low">
                        {imageSrc ? (
                          <Image src={imageSrc} alt="" fill sizes="56px" className="object-cover" unoptimized />
                        ) : (
                          <span className="flex h-full w-full items-center justify-center text-on-surface-variant" aria-hidden="true">
                            <span className="material-symbols-outlined text-xl">person</span>
                          </span>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-body-md font-bold text-on-surface">{teacher.name}</p>
                        <p className="mt-0.5 text-label-md text-on-surface-variant">
                          {teacher.specialty || "Sin especialidad"}
                        </p>
                        <p className="mt-1 line-clamp-2 text-label-md leading-snug text-on-surface-variant">
                          {teacher.bio.slice(0, 110)}
                          {teacher.bio.length > 110 ? "…" : ""}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="blog-admin-table__col-status">
                    <span className={statusPillClass(status)}>{TEACHER_STATUS_LABELS[status]}</span>
                  </td>
                  <td className="blog-admin-table__col-visibility">
                    <OfferingStatusSwitch
                      checked={enabled}
                      loading={isStatusPending}
                      disabled={isArchived || (actions.isBusy && !isStatusPending)}
                      offeringTitle={teacher.name}
                      onCheckedChange={(next) => void actions.toggleEnabled(teacher, next)}
                    />
                    {isArchived ? <p className="blog-admin-table__visibility-note">Archivado</p> : null}
                  </td>
                  <td>{teacher.sort_order}</td>
                  <td className="blog-admin-table__col-actions">
                    <TeacherRowActions
                      teacher={teacher}
                      basePath={basePath}
                      rowPending={rowPending}
                      showDuplicate={showDuplicate}
                      showArchive={showArchive}
                      isPending={actions.isPending}
                      onEditNotice={() => actions.startEditNotice(teacher.id)}
                      onAction={(action) => void actions.runAction(teacher.id, action)}
                      onTrash={() => actions.openTrashDialog(teacher)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <AdminActionModal
        open={Boolean(actions.notice)}
        type={actions.notice?.type}
        title={actions.notice?.title ?? ""}
        message={actions.notice?.message}
        confirmLabel="Entendido"
        onClose={actions.closeNotice}
      />

      <TeacherTrashDialog
        state={actions.trashDialog}
        onConfirm={() => void actions.confirmTrashDialog()}
        onClose={actions.closeTrashDialog}
      />
    </>
  );
}

export const TeachersTableView = memo(TeachersTableViewComponent);
