export const defaultSize = { width: 1200, height: 630 };
export const defaultContentType = "image/png";

export function getTitleFromParams(params?: Record<string, string>) {
  if (!params) return "Kargo";
  if (params.about !== undefined) return "About Kargo";
  if (params.contact !== undefined) return "Contact Kargo";
  if (params.slug) return `Page: ${params.slug}`;
  if (params.tag && params.item)
    return `Tag: ${params.tag}, Item: ${params.item}`;
  if (params.tag) return `Tag: ${params.tag}`;
  return "Kargo";
}
