import type { ReactNode } from "react";
import { classNames } from "@/lib/utils";

export type HomeSectionBlock = "featured" | "gift";

export type HomeSectionProps = {
  id?: string;
  title: string;
  subtitle?: string;
  /** Appended as `{block}--{variant}` on the section root. */
  variant?: string;
  /** BEM block prefix for container/head/title (default `featured`). */
  block?: HomeSectionBlock;
  className?: string;
  children: ReactNode;
  /** Wrap children in the cards grid. Default `true`. Set `false` for carousels or custom layouts. */
  withGrid?: boolean;
  /** Editorial vertical rhythm for home page sections (FeaturedSection, gift). */
  editorialSpacing?: boolean;
  gridClassName?: string;
};

export function HomeSection({
  id,
  title,
  subtitle,
  variant,
  block = "featured",
  className,
  children,
  withGrid = true,
  editorialSpacing = false,
  gridClassName = "featured__grid cards-grid",
}: HomeSectionProps) {
  return (
    <section
      id={id}
      className={classNames(
        block,
        "section",
        variant && `${block}--${variant}`,
        editorialSpacing && "home-section--editorial",
        className,
      )}
    >
      <div className={classNames("container", `${block}__container`)}>
        <header className={`${block}__head`}>
          <h2 className={classNames(`${block}__title`, "section-title")}>{title}</h2>
          {subtitle ? (
            <p className={classNames(`${block}__subtitle`, "section-subtitle")}>{subtitle}</p>
          ) : null}
        </header>
        {withGrid ? <div className={gridClassName}>{children}</div> : children}
      </div>
    </section>
  );
}
