export function FieldLabel({
  children,
  required = false,
  htmlFor,
}: {
  children: string;
  required?: boolean;
  htmlFor?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="text-label-md font-bold uppercase tracking-wide text-on-surface-variant">
      {children}{required ? " *" : ""}
    </label>
  );
}
