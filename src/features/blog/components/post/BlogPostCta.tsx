import Link from "next/link";

export function BlogPostCta() {
  return (
    <section className="blog-article-cta section" aria-labelledby="blog-article-cta-title">
      <div className="blog-article-cta__container">
        <p id="blog-article-cta-title" className="blog-article-cta__text">
          ¿Te apetece probar la cerámica en el taller?
        </p>
        <Link className="blog-article-cta__button" href="/clases">
          Ver clases
        </Link>
      </div>
    </section>
  );
}
