"use client";

import { memo } from "react";
import AdminPagination from "@/components/admin/AdminPagination";
import TeachersTable from "@/components/admin/TeachersTable";
import { SectionCard } from "@/components/admin/class-edit/components/SectionCard";
import Button from "@/components/ui/Button";
import { STUDIO_SPECIALISTS_BASE_PATH } from "../constants";
import { useStudioSpecialistsSection } from "../hooks/useStudioSpecialistsSection";
import type { StudioPageEditorState } from "../hooks/useStudioPageEditor";

type StudioPageSpecialistsSectionProps = Pick<
  StudioPageEditorState,
  "visibleTeachers" | "applyTeacherActionResult" | "removeLocalTeacher"
>;

function StudioPageSpecialistsSectionComponent({
  visibleTeachers,
  applyTeacherActionResult,
  removeLocalTeacher,
}: StudioPageSpecialistsSectionProps) {
  const section = useStudioSpecialistsSection(visibleTeachers);

  return (
    <SectionCard
      title="Especialistas"
      description="Gestiona perfiles del estudio. Activa el switch para mostrarlos en el sitio público."
      action={
        <Button href={`${STUDIO_SPECIALISTS_BASE_PATH}/new`} variant="solid" className="primary-btn shrink-0">
          Crear especialista
        </Button>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {[
            { label: "Total", value: section.stats.total },
            { label: "Publicados", value: section.stats.published },
            { label: "Borradores", value: section.stats.draft },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-outline-variant/60 bg-surface-container-low px-4 py-3"
            >
              <p className="text-label-md text-on-surface-variant">{item.label}</p>
              <p className="text-headline-sm font-bold text-on-surface">{item.value}</p>
            </div>
          ))}
        </div>

        {visibleTeachers.length === 0 ? (
          <div className="empty-inline rounded-2xl border border-dashed border-outline-variant bg-surface-container-low p-8 text-center">
            <strong>Aún no hay especialistas.</strong>
            <span className="mt-1 block text-on-surface-variant">
              Crea perfiles para mostrarlos en la página pública.
            </span>
          </div>
        ) : (
          <>
            <TeachersTable
              items={section.pageItems}
              basePath={STUDIO_SPECIALISTS_BASE_PATH}
              showDuplicate={false}
              showArchive={false}
              onTeacherUpdated={applyTeacherActionResult}
              onTeacherRemoved={removeLocalTeacher}
            />
            {section.showPagination ? (
              <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                <p className="text-label-md text-on-surface-variant">
                  Página {section.page} de {section.totalPages} · {section.total} especialistas
                </p>
                <AdminPagination
                  page={section.page}
                  totalPages={section.totalPages}
                  onPageChange={section.setPage}
                />
              </div>
            ) : null}
          </>
        )}
      </div>
    </SectionCard>
  );
}

export const StudioPageSpecialistsSection = memo(StudioPageSpecialistsSectionComponent);
