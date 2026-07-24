"use client";

import { memo } from "react";
import AdminActionModal from "@/components/admin/AdminActionModal";
import type { NavigationItem } from "@/data/types";
import type { SiteSettings } from "@/lib/cms/settings";
import type { BlogPageSettings, BlogPost, Faq, FaqGroup, SocialGallery as CmsSocialGallery } from "@/lib/cms/types";
import { BlogPageAdditionsSection } from "./components/BlogPageAdditionsSection";
import { BlogPageEditorHeader } from "./components/BlogPageEditorHeader";
import { BlogPageEditorTabBar } from "./components/BlogPageEditorTabBar";
import { BlogPageHeroSection } from "./components/BlogPageHeroSection";
import { BlogPagePostsSection } from "./components/BlogPagePostsSection";
import { BlogPagePreview } from "./components/BlogPagePreview";
import { BlogPageStickyActionBar } from "./components/BlogPageStickyActionBar";
import { useBlogPageEditor } from "./hooks/useBlogPageEditor";

export type BlogPageEditorViewProps = {
  page: BlogPageSettings;
  posts: BlogPost[];
  navigationItems: NavigationItem[];
  menuSettings: SiteSettings["menu"];
  socialGallery: CmsSocialGallery | null;
  faqs: Faq[];
  faqGroups: FaqGroup[];
};

function BlogPageEditorViewComponent(props: BlogPageEditorViewProps) {
  const editor = useBlogPageEditor(props);

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

      <BlogPageEditorHeader
        status={editor.status}
        summaryMeta={editor.summaryMeta}
        isSaving={editor.isSaving}
        onSaveDraft={editor.saveDraft}
        onSavePublished={editor.savePublished}
      />

      <BlogPageEditorTabBar activeTab={editor.tab} onTabChange={editor.setTab} />

      <div className="cms-editor-main">
        {editor.tab === "hero" ? <BlogPageHeroSection hero={editor.hero} patchHero={editor.patchHero} /> : null}
        {editor.tab === "posts" ? (
          <BlogPagePostsSection
            visiblePosts={editor.visiblePosts}
            onPostUpdated={editor.applyPostActionResult}
            onPostRemoved={editor.removeLocalPost}
          />
        ) : null}
        {editor.tab === "additions" ? (
          <BlogPageAdditionsSection
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
          <BlogPagePreview
            hero={editor.hero}
            posts={editor.visiblePosts}
            showIdeaPromptSection={editor.showIdeaPromptSection}
            showFaqSection={editor.showFaqSection}
            selectedFaqBlock={editor.selectedFaqBlock}
            socialGalleryProps={editor.socialGalleryProps}
            navigationItems={props.navigationItems}
            menuSettings={props.menuSettings}
            syncStatus={editor.syncStatus}
          />
        ) : null}
      </div>

      <BlogPageStickyActionBar
        summaryMeta={editor.summaryMeta}
        isSaving={editor.isSaving}
        onPreview={editor.openPreviewTab}
        onSaveDraft={editor.saveDraft}
        onSavePublished={editor.savePublished}
      />
    </div>
  );
}

export const BlogPageEditorView = memo(BlogPageEditorViewComponent);
