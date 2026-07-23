"use client";

import AdminActionModal from "@/components/admin/AdminActionModal";
import MediaLibraryModal from "@/components/admin/MediaLibraryModal";
import SharedHeroEditor from "@/components/admin/SharedHeroEditor";
import Button from "@/components/ui/Button";
import type { ClassEditorPreviewChrome } from "@/lib/cms/class-editor-preview";
import type { ClassOfferingDetails, Offering } from "@/lib/cms/types";
import { ClassEditStickyBar } from "./ClassEditStickyBar";
import { CLASS_EDIT_TABS, FALLBACK_PREVIEW_CHROME, FORM_ID } from "./constants";
import { useClassEditForm } from "./hooks/useClassEditForm";
import { ClassEditAdditionsTab } from "./tabs/ClassEditAdditionsTab";
import { ClassEditDetailPagePanel } from "./components/ClassEditDetailPagePanel";
import { ClassEditHomeTab } from "./tabs/ClassEditHomeTab";
import { ClassEditPreviewTab } from "./tabs/ClassEditPreviewTab";
import { ClassEditScheduleTab } from "./tabs/ClassEditScheduleTab";
import { ClassEditSeoTab } from "./tabs/ClassEditSeoTab";
import { ClassEditTabBar } from "./tabs/ClassEditTabBar";
import type { ClassEditFormMode } from "./types";

export default function ClassEditForm({
  offering,
  mode = "edit",
  basePath = "/admin/clases",
  previewChrome = FALLBACK_PREVIEW_CHROME,
}: {
  offering: Offering;
  mode?: ClassEditFormMode;
  basePath?: string;
  previewChrome?: ClassEditorPreviewChrome;
}) {
  const form = useClassEditForm({ offering, mode, basePath });
  const visibleTabs = offering.type === "experience"
    ? CLASS_EDIT_TABS.filter((tab) => tab.key !== "home")
    : CLASS_EDIT_TABS;

  return (
    <>
      <AdminActionModal
        open={Boolean(form.toast)}
        type={form.toast?.type}
        title={form.toast?.type === "success" ? "Acción completada" : "Revisa la edición"}
        message={form.toast?.message}
        details={form.toast?.details}
        confirmLabel="Entendido"
        onClose={form.closeToast}
      />

      <ClassEditTabBar tabs={visibleTabs} activeTab={form.activeTab} onTabChange={form.setActiveTab} />

      <form id={FORM_ID} onSubmit={form.handleSubmit} className="class-edit-form space-y-6">
        {form.activeTab === "hero" ? (
          <SharedHeroEditor
            details={form.details}
            titleFallback={form.title || "Título del hero"}
            subtitleFallback={form.subtitle || "Clases - Iniciación"}
            onChange={(next) => form.updateDetails(next as Partial<ClassOfferingDetails>)}
          />
        ) : null}

        {form.activeTab === "home" ? <ClassEditHomeTab offering={offering} form={form} /> : null}
        {form.activeTab === "basic" ? (
          <ClassEditDetailPagePanel offering={offering} form={form} />
        ) : null}
        {form.activeTab === "schedule" ? <ClassEditScheduleTab form={form} /> : null}
        {form.activeTab === "seo" ? <ClassEditSeoTab form={form} /> : null}
        {form.activeTab === "additions" ? <ClassEditAdditionsTab form={form} previewChrome={previewChrome} /> : null}
        {form.activeTab === "preview" ? (
          <ClassEditPreviewTab offering={offering} form={form} previewChrome={previewChrome} />
        ) : null}

        <div className="border-t border-outline-variant pt-5">
          <Button type="button" variant="ghost" onClick={form.handleCancel}>Cancelar</Button>
        </div>

        <ClassEditStickyBar form={form} />
      </form>

      <MediaLibraryModal
        open={form.pickerTarget !== null}
        onSelect={form.handleSelectImage}
        onClose={() => form.setPickerTarget(null)}
      />
    </>
  );
}
