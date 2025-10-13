// Utility helpers for subdomain handling and validation
export function buildSubdomainRegex(username: string, ingressBaseDomain: string): RegExp {
  // Escape special regex characters in the ingress base domain
  const safeDomain = ingressBaseDomain.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`^([^.]+)\\.${username}\\.${safeDomain}$`);
}

export function extractSubdomainSegment(
  subdomain: string,
  username: string,
  ingressBaseDomain: string
): string | null {
  if (!subdomain) return null;
  const regex = buildSubdomainRegex(username, ingressBaseDomain);
  const match = subdomain.match(regex);
  return match ? match[1] : null;
}
