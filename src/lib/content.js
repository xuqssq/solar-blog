/**
 * Converts plain text (from Supabase JSONB content.text) to basic HTML.
 * Splits on double newlines for paragraphs, preserves single newlines as <br>.
 */
export function textToHtml(text) {
  if (!text) return "";

  const paragraphs = text.split(/\n\n+/);

  return paragraphs
    .map((para) => {
      const trimmed = para.trim();
      if (!trimmed) return "";

      const escaped = trimmed
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      const withBreaks = escaped.replace(/\n/g, "<br>");
      return `<p>${withBreaks}</p>`;
    })
    .filter(Boolean)
    .join("\n");
}
