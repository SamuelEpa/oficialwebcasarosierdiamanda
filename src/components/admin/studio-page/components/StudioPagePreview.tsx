"use client";

import { memo } from "react";
import { PagePreviewAdditions } from "@/components/admin/page-editor/components/PagePreviewAdditions";
import type { NavigationItem } from "@/data/types";
import type { SiteSettings } from "@/lib/cms/settings";
import type { CmsHeroSettings, Teacher } from "@/lib/cms/types";
import type { RichTextTypography } from "@/lib/cms/rich-text-typography";
import type { StudioPageEditorState } from "../hooks/useStudioPageEditor";
import { StudioPagePreviewHero } from "./preview/StudioPagePreviewHero";
import { StudioPagePreviewTeamSection } from "./preview/StudioPagePreviewTeamSection";

type StudioPagePreviewProps = {
  hero: CmsHeroSettings;
  introHeading: string;
  introContent: string;
  introContentTypography?: RichTextTypography;
  teachers: Teacher[];
  showIdeaPromptSection: boolean;
  showFaqSection: boolean;
  selectedFaqBlock: StudioPageEditorState["selectedFaqBlock"];
  socialGalleryProps: StudioPageEditorState["socialGalleryProps"];
  navigationItems: NavigationItem[];
  menuSettings: SiteSettings["menu"];
};

function StudioPagePreviewComponent({
  hero,
  introHeading,
  introContent,
  introContentTypography,
  teachers,
  showIdeaPromptSection,
  showFaqSection,
  selectedFaqBlock,
  socialGalleryProps,
  navigationItems,
  menuSettings,
}: StudioPagePreviewProps) {
  return (
    <div className="cms-preview-frame">
      <div className="cms-public-preview__toolbar">Vista previa de escritorio · Publicado</div>
      <div className="cms-public-preview studio-page">
        <div className="cms-public-preview__scale">
          <StudioPagePreviewHero
            hero={hero}
            navigationItems={navigationItems}
            menuSettings={menuSettings}
          />
          <StudioPagePreviewTeamSection
            introHeading={introHeading}
            introContent={introContent}
            introContentTypography={introContentTypography}
            teachers={teachers}
          />
          <PagePreviewAdditions
            showFaqSection={showFaqSection}
            showIdeaPromptSection={showIdeaPromptSection}
            selectedFaqBlock={selectedFaqBlock}
            socialGalleryProps={socialGalleryProps}
          />
        </div>
      </div>
    </div>
  );
}

export const StudioPagePreview = memo(StudioPagePreviewComponent);
