import { RegisterPayload, AuthResponse, User } from "@/types/auth";
import { useAuthStore } from "@/lib/store/useAuthStore";

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "";

async function post<T>(path: string, body: unknown): Promise<T> {
  if (!BASE) throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured");
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((json as { message?: string }).message ?? `HTTP ${res.status}`);
  return json as T;
}

async function get<T>(path: string): Promise<T> {
  if (!BASE) throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured");
  const token = useAuthStore.getState().token;
  const res = await fetch(`${BASE}${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((json as { message?: string }).message ?? `HTTP ${res.status}`);
  return json as T;
}

export const authService = {
  login: (email: string, password: string) =>
    post<AuthResponse>("/api/auth/login", { email, password }),

  sendCode: (email: string) =>
    post<{ message: string }>("/api/auth/send-code", { email }),

  verifyCode: (email: string, code: string) =>
    post<{ verified: boolean }>("/api/auth/verify-code", { email, code }),

  checkNickname: (nickname: string) =>
    post<{ available: boolean }>("/api/auth/check-nickname", { nickname }),

  register: (data: RegisterPayload) =>
    post<AuthResponse>("/api/auth/register", data),

  getMe: () =>
    get<User>("/api/members/me"),
};
