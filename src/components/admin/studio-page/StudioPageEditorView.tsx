"use client";

import { memo } from "react";
import AdminActionModal from "@/components/admin/AdminActionModal";
import type { NavigationItem } from "@/data/types";
import type { SiteSettings } from "@/lib/cms/settings";
import type {
  Faq,
  FaqGroup,
  SocialGallery as CmsSocialGallery,
  StudioPageSettings,
  Teacher,
} from "@/lib/cms/types";
import { PageAdditionsSection } from "@/components/admin/page-editor/components/PageAdditionsSection";
import { StudioPageContentSection } from "./components/StudioPageContentSection";
import { StudioPageEditorHeader } from "./components/StudioPageEditorHeader";
import { StudioPageEditorTabBar } from "./components/StudioPageEditorTabBar";
import { StudioPageHeroSection } from "./components/StudioPageHeroSection";
import { StudioPagePreview } from "./components/StudioPagePreview";
import { StudioPageSpecialistsSection } from "./components/StudioPageSpecialistsSection";
import { StudioPageStickyActionBar } from "./components/StudioPageStickyActionBar";
import { useStudioPageEditor } from "./hooks/useStudioPageEditor";

export type StudioPageEditorViewProps = {
  page: StudioPageSettings;
  teachers: Teacher[];
  navigationItems: NavigationItem[];
  menuSettings: SiteSettings["menu"];
  socialGallery: CmsSocialGallery | null;
  faqs: Faq[];
  faqGroups: FaqGroup[];
};

function StudioPageEditorViewComponent({
  navigationItems,
  menuSettings,
  ...editorProps
}: StudioPageEditorViewProps) {
  const editor = useStudioPageEditor(editorProps);

  return (
    <div className="cms-editor-shell">
      <AdminActionModal
        open={Boolean(editor.modal)}
        type={editor.modal?.type}
        title={editor.modal?.title ?? ""}
        message={editor.modal?.message}
        confirmLabel="Entendido"
        onClose={editor.closeModal}
      />

      <StudioPageEditorHeader
        status={editor.status}
        summaryMeta={editor.summaryMeta}
        isSaving={editor.isSaving}
        onSaveDraft={editor.saveDraft}
        onSavePublished={editor.savePublished}
      />

      <StudioPageEditorTabBar activeTab={editor.tab} onTabChange={editor.setTab} />

      <div className="cms-editor-main">
        {editor.tab === "hero" ? (
          <StudioPageHeroSection hero={editor.hero} patchHero={editor.patchHero} />
        ) : null}

        {editor.tab === "specialists" ? (
          <StudioPageSpecialistsSection
            visibleTeachers={editor.visibleTeachers}
            applyTeacherActionResult={editor.applyTeacherActionResult}
            removeLocalTeacher={editor.removeLocalTeacher}
          />
        ) : null}

        {editor.tab === "content" ? (
          <StudioPageContentSection
            introHeading={editor.introHeading}
            setIntroHeading={editor.setIntroHeading}
            introContent={editor.introContent}
            setIntroContent={editor.setIntroContent}
            introContentTypography={editor.introContentTypography}
            setIntroContentTypography={editor.setIntroContentTypography}
          />
        ) : null}

        {editor.tab === "additions" ? (
          <PageAdditionsSection
            showFaqSection={editor.showFaqSection}
            setShowFaqSection={editor.setShowFaqSection}
            faqGroupId={editor.faqGroupId}
            setFaqGroupId={editor.setFaqGroupId}
            showIdeaPromptSection={editor.showIdeaPromptSection}
            setShowIdeaPromptSection={editor.setShowIdeaPromptSection}
            publishedFaqGroups={editor.publishedFaqGroups}
            selectedFaqBlock={editor.selectedFaqBlock}
            socialGalleryProps={editor.socialGalleryProps}
          />
        ) : null}

        {editor.tab === "preview" ? (
          <StudioPagePreview
            hero={editor.hero}
            introHeading={editor.introHeading}
            introContent={editor.introContent}
            introContentTypography={editor.introContentTypography}
            teachers={editor.publishedTeachers}
            showIdeaPromptSection={editor.showIdeaPromptSection}
            showFaqSection={editor.showFaqSection}
            selectedFaqBlock={editor.selectedFaqBlock}
            socialGalleryProps={editor.socialGalleryProps}
            navigationItems={navigationItems}
            menuSettings={menuSettings}
          />
        ) : null}
      </div>

      <StudioPageStickyActionBar
        summaryMeta={editor.summaryMeta}
        isSaving={editor.isSaving}
        onPreview={editor.openPreviewTab}
        onSaveDraft={editor.saveDraft}
        onSavePublished={editor.savePublished}
      />
    </div>
  );
}

export const StudioPageEditorView = memo(StudioPageEditorViewComponent);
