"use client";

import { useMemo, useState } from "react";
import type { BlogPost } from "@/lib/cms/types";
import { normalizeBlogPostSearch } from "../utils/blogPostListing";

export type BlogPostsStatusFilter = "all" | "published" | "draft" | "archived";

export function useBlogPostsSection(posts: BlogPost[]) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<BlogPostsStatusFilter>("all");

  const stats = useMemo(() => {
    const published = posts.filter((p) => p.status === "published").length;
    const draft = posts.filter((p) => p.status === "draft").length;
    const archived = posts.filter((p) => p.status === "archived").length;
    const featured = posts.filter((p) => p.is_featured && p.status === "published").length;
    return { total: posts.length, published, draft, archived, featured };
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return posts.filter((post) => {
      if (statusFilter !== "all" && post.status !== statusFilter) return false;
      if (!normalizedQuery) return true;
      return normalizeBlogPostSearch(post).includes(normalizedQuery);
    });
  }, [posts, query, statusFilter]);

  return {
    query,
    setQuery,
    statusFilter,
    setStatusFilter,
    stats,
    filteredPosts,
  };
}
