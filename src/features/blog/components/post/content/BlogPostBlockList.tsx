export function BlogPostBlockList({ items }: { items: string[] }) {
  return (
    <ul className="blog-article__list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
