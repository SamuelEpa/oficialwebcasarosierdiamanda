const HTML_BLOCK_PATTERN = /<(p|h[1-3]|div)\b[^>]*>[\s\S]*?<\/\1>/gi;

function splitPlainText(source: string) {
  const parts = source
    .replace(/\r\n/g, "\n")
    .trim()
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length <= 1) {
    return { heading: parts[0] ?? "", body: "" };
  }

  return {
    heading: parts[0],
    body: parts.slice(1).join("\n\n"),
  };
}

function splitHtmlBlocks(source: string) {
  const blocks = source.match(HTML_BLOCK_PATTERN) ?? [];
  if (blocks.length <= 1) {
    return { heading: blocks[0] ?? source.trim(), body: "" };
  }

  return {
    heading: blocks[0],
    body: blocks.slice(1).join(""),
  };
}

/** Fallback when intro_heading is empty: first block = left column, rest = right column. */
export function splitStudioIntroContent(source: string) {
  const trimmed = source.trim();
  if (!trimmed) {
    return { heading: "", body: "" };
  }

  if (/<[a-z][\s\S]*>/i.test(trimmed)) {
    return splitHtmlBlocks(trimmed);
  }

  return splitPlainText(trimmed);
}
