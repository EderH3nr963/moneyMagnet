import type { User } from "@/types/api";

import { request } from "./client";

export function getProfile(signal?: AbortSignal) {
  return request<User>("/api/v1/profile/me", { signal });
}

export function updateProfile(payload: Pick<User, "username" | "email">) {
  return request<User>("/api/v1/profile/username/and/email", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function updatePassword(payload: {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}) {
  return request<void>("/api/v1/profile/password", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function updateThemePreference(theme: "LIGHT" | "DARK") {
  return request<User>("/api/v1/profile/theme", {
    method: "PATCH",
    body: JSON.stringify({ theme }),
  });
}

export function deleteProfile() {
  return request<void>("/api/v1/profile", { method: "DELETE" });
}
