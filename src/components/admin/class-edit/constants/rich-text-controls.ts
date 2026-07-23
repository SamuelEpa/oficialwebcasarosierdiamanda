import type { RichTextEditorControl } from "@/components/editor/editor-types";

/** Block-level typography uses Variable Axes; inline italic stays in toolbar for partial emphasis. */
export const DETAIL_PAGE_RICH_TEXT_CONTROLS: RichTextEditorControl[] = [
  "undo",
  "redo",
  "paragraph",
  "h2",
  "h3",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "ul",
  "ol",
  "alignLeft",
  "alignCenter",
  "alignRight",
  "link",
];
