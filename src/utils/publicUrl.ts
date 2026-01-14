export const ASSET_BASE = "/docs";

export const publicUrl = (path: string) => {
  const trimmed = path.trim();
  if (!trimmed) {
    return ASSET_BASE;
  }

  const normalized = trimmed.replace(/^\/+/, "");
  const base = ASSET_BASE.replace(/^\/+/, "");

  if (normalized.startsWith(`${base}/`)) {
    return `/${normalized}`;
  }

  return `${ASSET_BASE}/${normalized}`;
};
