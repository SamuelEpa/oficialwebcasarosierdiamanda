function SectionIcon({ children }: { children: string }) {
  return (
    <span className="material-symbols-outlined" aria-hidden="true">
      {children}
    </span>
  );
}

export function ProductSectionHead({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="shop-product-editor__section-head">
      <SectionIcon>{icon}</SectionIcon>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}
