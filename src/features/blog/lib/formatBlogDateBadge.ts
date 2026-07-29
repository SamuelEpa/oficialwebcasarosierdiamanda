/** Badge overlay on feed images, e.g. "JUNIO 21". */
export function formatBlogDateBadge(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const month = new Intl.DateTimeFormat("es-ES", {
    month: "long",
    timeZone: "UTC",
  })
    .format(date)
    .replace(/\./g, "")
    .toUpperCase();

  const day = new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    timeZone: "UTC",
  }).format(date);

  return `${month} ${day}`;
}
