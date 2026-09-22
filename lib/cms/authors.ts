export const normalizeAuthorName = (name: string) =>
  name.normalize("NFKC").trim().replace(/\s+/g, " ").toLowerCase();

export const splitAuthors = (authors: string) =>
  authors.split(/[,;\n]+/).map((name) => name.trim()).filter(Boolean);

export const isPortfolioOwner = (name: string, ownerName: string) =>
  normalizeAuthorName(name) === normalizeAuthorName(ownerName);

export function authorUrl(value: string): string {
  try {
    if (!/^https?:\/\//i.test(value.trim())) return "";
    const url = new URL(value.trim());
    return ["https:", "http:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}

export function getAuthorLink(links: Record<string, string> | undefined, name: string) {
  const key = normalizeAuthorName(name);
  return links && Object.hasOwn(links, key) ? authorUrl(links[key]) : "";
}

export function unlinkedAuthors(
  authors: string,
  ownerName: string,
  links: Record<string, string> = {},
  ignored: string[] = [],
) {
  const seen = new Set<string>();
  const dismissed = new Set(ignored);
  return splitAuthors(authors).filter((name) => {
    const key = normalizeAuthorName(name);
    if (seen.has(key)) return false;
    seen.add(key);
    return !isPortfolioOwner(name, ownerName) && !getAuthorLink(links, name) && !dismissed.has(key);
  });
}
