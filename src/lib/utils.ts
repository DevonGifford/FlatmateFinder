export { cn } from "cn";

export function normalizeExternalUrl(value: string | undefined): string | null {
  if (!value?.trim()) return "";

  const candidate = /^https?:\/\//i.test(value.trim())
    ? value.trim()
    : `https://${value.trim()}`;

  try {
    const url = new URL(candidate);
    return url.protocol === "http:" || url.protocol === "https:"
      ? url.toString()
      : null;
  } catch {
    return null;
  }
}
