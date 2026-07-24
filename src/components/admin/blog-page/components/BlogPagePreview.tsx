"use client";

import { memo, useMemo } from "react";
import type { NavigationItem } from "@/data/types";
import type { SiteSettings } from "@/lib/cms/settings";
import type { BlogPost, CmsHeroSettings } from "@/lib/cms/types";
import type { BlogPageEditorState } from "../hooks/useBlogPageEditor";
import { buildBlogPreviewPostCollections } from "../utils/previewPosts";
import { BlogPagePreviewAdditions } from "./preview/BlogPagePreviewAdditions";
import { BlogPagePreviewHero } from "./preview/BlogPagePreviewHero";
import { BlogPagePreviewListing } from "./preview/BlogPagePreviewListing";

type BlogPagePreviewProps = {
  hero: CmsHeroSettings;
  posts: BlogPost[];
  showIdeaPromptSection: boolean;
  showFaqSection: boolean;
  selectedFaqBlock: BlogPageEditorState["selectedFaqBlock"];
  socialGalleryProps: BlogPageEditorState["socialGalleryProps"];
  navigationItems: NavigationItem[];
  menuSettings: SiteSettings["menu"];
  syncStatus?: BlogPageEditorState["syncStatus"];
};

function BlogPagePreviewComponent({
  hero,
  posts,
  showIdeaPromptSection,
  showFaqSection,
  selectedFaqBlock,
  socialGalleryProps,
  navigationItems,
  menuSettings,
  syncStatus = "idle",
}: BlogPagePreviewProps) {
  const collections = useMemo(() => buildBlogPreviewPostCollections(posts), [posts]);

  const syncLabel =
    syncStatus === "saving" || syncStatus === "pending"
      ? "Sincronizando…"
      : syncStatus === "error"
        ? "Error de sincronización"
        : "Vista previa · estado actual";

  return (
    <div className="cms-preview-frame">
      <div className="cms-public-preview__toolbar">{syncLabel}</div>
      <div className="cms-public-preview blog-page">
        <div className="cms-public-preview__scale">
          <BlogPagePreviewHero hero={hero} navigationItems={navigationItems} menuSettings={menuSettings} />
          <BlogPagePreviewListing
            listing={collections.listing}
            featured={collections.featured}
            categories={collections.categories}
          />
          <BlogPagePreviewAdditions
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

export const BlogPagePreview = memo(BlogPagePreviewComponent);
