import Link from "next/link";
import type { BlogPostAdjacent } from "../../loadBlogPostPage";

export function BlogPostPager({
  adjacent,
  position,
  total,
}: {
  adjacent: BlogPostAdjacent;
  position: number;
  total: number;
}) {
  const { previous, next } = adjacent;
  const hasNav = previous || next || total > 0;
  if (!hasNav) return null;

  return (
    <nav className="blog-article-pager" aria-label="Navegación entre artículos">
      <div className="blog-article-pager__container">
        {previous ? (
          <Link
            className="blog-article-pager__arrow"
            href={`/blog/${previous.slug}`}
            aria-label={`Artículo anterior: ${previous.title}`}
          >
            <span aria-hidden="true">&lsaquo;</span>
          </Link>
        ) : (
          <span className="blog-article-pager__arrow blog-article-pager__arrow--placeholder" aria-hidden="true" />
        )}

        {total > 0 && position > 0 ? (
          <p className="blog-article-pager__position">
            <span className="blog-article-pager__current">{position}</span>
            <span className="blog-article-pager__sep" aria-hidden="true">
              /
            </span>
            <span className="blog-article-pager__total">{total}</span>
          </p>
        ) : null}

        {next ? (
          <Link
            className="blog-article-pager__arrow"
            href={`/blog/${next.slug}`}
            aria-label={`Artículo siguiente: ${next.title}`}
          >
            <span aria-hidden="true">&rsaquo;</span>
          </Link>
        ) : (
          <span className="blog-article-pager__arrow blog-article-pager__arrow--placeholder" aria-hidden="true" />
        )}
      </div>
      <Link className="blog-article-pager__back" href="/blog">
        Volver a la bitácora
      </Link>
    </nav>
  );
}
