import type { BlogIndexIntroView } from "../../lib/buildBlogIndexIntroView";

export function BlogIndexMasthead({ intro }: { intro: BlogIndexIntroView }) {
  return (
    <section className="blog-index-masthead section" aria-labelledby="blog-index-masthead-title">
      <div className="blog-index-masthead__container">
        <h1 id="blog-index-masthead-title" className="blog-index-masthead__title">
          {intro.heading}
        </h1>
        {intro.kicker ? (
          <p className="blog-index-masthead__kicker">{intro.kicker}</p>
        ) : null}
        {intro.text ? <p className="blog-index-masthead__text">{intro.text}</p> : null}
      </div>
    </section>
  );
}
