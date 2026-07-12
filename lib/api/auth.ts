import type { AuthorizationResponse } from "@/types/api";

import { request } from "./client";
import { API_URL } from "./config";
import { clearSession } from "./session";

export function login(email: string, password: string) {
  return request<AuthorizationResponse>(
    "/api/v1/auth/login",
    { method: "POST", body: JSON.stringify({ email, password }) },
    false,
  );
}

export function register(payload: {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}) {
  return request<AuthorizationResponse>(
    "/api/v1/auth/register",
    { method: "POST", body: JSON.stringify(payload) },
    false,
  );
}

export function forgotPassword(email: string) {
  return request<void>(
    "/api/v1/auth/forgot-password",
    { method: "POST", body: JSON.stringify({ email }) },
    false,
  );
}

export function resetPassword(
  payload: { token: string; password: string; confirmPassword: string },
) {
  return request<void>(
    `/api/v1/auth/reset-password`,
    { method: "POST", body: JSON.stringify(payload) },
    false,
  );
}

export function confirmEmailChange(payload: { token: string; password: string }) {
  return request<void>(
    "/api/v1/auth/confirm-email",
    { method: "POST", body: JSON.stringify(payload) },
    false,
  );
}

export async function logout() {
  try {
    await fetch(`${API_URL}/api/v1/auth/logout`, {
      method: "POST",
      headers: { Accept: "application/json" },
      credentials: "include",
    });
  } finally {
    clearSession();
  }
}
