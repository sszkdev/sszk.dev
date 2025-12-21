export type Frontmatter = Record<string, string>;

export function parseFrontmatter(markdown: string) {
  const normalized = markdown.replace(/\r\n/g, "\n");

  if (!normalized.startsWith("---\n")) {
    return { data: {}, content: normalized.trim() };
  }

  const endIndex = normalized.indexOf("\n---\n", 4);
  if (endIndex === -1) {
    return { data: {}, content: normalized.trim() };
  }

  const rawMeta = normalized.slice(4, endIndex).trim();
  const content = normalized.slice(endIndex + 5).trim();
  const data: Frontmatter = {};

  for (const line of rawMeta.split("\n")) {
    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();
    if (key) {
      data[key] = value;
    }
  }

  return { data, content };
}
