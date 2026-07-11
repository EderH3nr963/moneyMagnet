import { API_URL } from "./config";
import { ApiError } from "./error";
import { refreshAccessToken, validAccessToken } from "./session";

export async function request<T>(
  path: string,
  init: RequestInit = {},
  authenticated = true,
): Promise<T> {
  const headers = requestHeaders(init);

  if (authenticated) {
    headers.set("Authorization", `Bearer ${await validAccessToken()}`);
  }

  const response = await send(path, init, headers);

  if (response.status === 401 && authenticated) {
    const renewedSession = await refreshAccessToken();
    headers.set("Authorization", `Bearer ${renewedSession.token}`);
    return parseResponse<T>(await send(path, init, headers));
  }

  return parseResponse<T>(response);
}

async function send(path: string, init: RequestInit, headers: Headers) {
  return fetch(`${API_URL}${path}`, {
    ...init,
    headers,
    credentials: "include",
  });
}

function requestHeaders(init: RequestInit) {
  const headers = new Headers(init.headers);
  headers.set("Accept", "application/json");
  if (init.body) headers.set("Content-Type", "application/json");
  return headers;
}

async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = "Não foi possível concluir a solicitação.";

    try {
      const payload = (await response.json()) as { message?: string };
      if (payload.message) message = payload.message;
    } catch {
      // A API pode responder sem corpo em alguns erros.
    }

    throw new ApiError(message, response.status);
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}
