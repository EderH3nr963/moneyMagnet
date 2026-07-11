import type { AuthorizationResponse, User } from "@/types/api";

import { API_URL } from "./config";
import { ApiError } from "./error";

const TOKEN_KEY = "money-magnet:token";
const TOKEN_EXPIRATION_KEY = "money-magnet:token-expiration";
const USER_KEY = "money-magnet:user";
const THEME_KEY = "money-magnet:theme";
const EXPIRATION_TOLERANCE_MS = 10_000;

let refreshPromise: Promise<AuthorizationResponse> | null = null;

export function getToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function saveSession(session: AuthorizationResponse) {
  window.localStorage.setItem(TOKEN_KEY, session.token);
  window.localStorage.setItem(TOKEN_EXPIRATION_KEY, session.expiration);
  saveUser(session.usuario);
}

export function clearSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(TOKEN_EXPIRATION_KEY);
  window.localStorage.removeItem(USER_KEY);
  window.localStorage.removeItem(THEME_KEY);
  notifySessionUpdate();
}

export function getStoredUser() {
  if (typeof window === "undefined") return null;

  try {
    return JSON.parse(
      window.localStorage.getItem(USER_KEY) || "null",
    ) as User | null;
  } catch {
    return null;
  }
}

export function saveUser(user: User) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  window.localStorage.setItem(
    THEME_KEY,
    user.theme === "DARK" ? "dark" : "light",
  );
  notifySessionUpdate();
}

export async function validAccessToken() {
  const token = getToken();
  const expiration = typeof window === "undefined"
    ? null
    : window.localStorage.getItem(TOKEN_EXPIRATION_KEY);

  if (
    token
    && expiration
    && Date.parse(expiration) > Date.now() + EXPIRATION_TOLERANCE_MS
  ) {
    return token;
  }

  return (await refreshAccessToken()).token;
}

export async function refreshAccessToken() {
  if (!refreshPromise) {
    refreshPromise = fetch(`${API_URL}/api/v1/auth/refresh`, {
      method: "POST",
      headers: { Accept: "application/json" },
      credentials: "include",
    })
      .then(async (response) => {
        if (!response.ok) {
          clearSession();
          throw new ApiError("Sua sessão expirou. Faça login novamente.", 401);
        }

        const session = (await response.json()) as AuthorizationResponse;
        saveSession(session);
        return session;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

function notifySessionUpdate() {
  window.dispatchEvent(new Event("money-magnet:session-updated"));
}
