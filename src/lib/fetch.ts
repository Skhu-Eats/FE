import "server-only";

const BASE = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").replace(/\/$/, "");

function normalizeHeaders(headers?: HeadersInit): Record<string, string> {
  if (!headers) return {};
  if (headers instanceof Headers) return Object.fromEntries(headers.entries());
  if (Array.isArray(headers)) return Object.fromEntries(headers);
  return headers;
}

function buildAuthHeaders(token?: string): Record<string, string> {
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

export async function serverFetch<T = unknown>(
  path: string,
  token?: string,
  init?: RequestInit,
): Promise<T> {
  if (!BASE)
    throw new Error("[serverFetch] NEXT_PUBLIC_API_BASE_URL is not configured");

  const isFormData = init?.body instanceof FormData;
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      ...(!["GET", "HEAD"].includes((init?.method ?? "GET").toUpperCase()) &&
      !isFormData
        ? { "Content-Type": "application/json" }
        : {}),
      ...normalizeHeaders(init?.headers),
      ...buildAuthHeaders(token),
    },
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((json as { message?: string }).message ?? `HTTP ${res.status}`);
  return json as T;
}

export async function serverFetchRaw(
  path: string,
  token?: string,
  init?: RequestInit,
): Promise<{ status: number; data: unknown }> {
  if (!BASE)
    throw new Error("[serverFetch] NEXT_PUBLIC_API_BASE_URL is not configured");

  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      ...(["GET", "HEAD"].includes((init?.method ?? "GET").toUpperCase())
        ? {}
        : { "Content-Type": "application/json" }),
      ...normalizeHeaders(init?.headers),
      ...buildAuthHeaders(token),
    },
  });

  const data = await res.json().catch(() => ({}));
  return { status: res.status, data };
}
