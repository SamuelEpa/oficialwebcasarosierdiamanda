import { formatBlogDateBadge } from "../../lib/formatBlogDateBadge";

export function BlogFeedDateBadge({ publishedAt }: { publishedAt: string }) {
  const label = formatBlogDateBadge(publishedAt);
  if (!label) return null;

  return (
    <time className="blog-feed-card__badge" dateTime={publishedAt}>
      {label}
    </time>
  );
}
