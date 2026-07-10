import type {
  AuthorizationResponse,
  Account,
  Category,
  CategoryExpense,
  DashboardResponse,
  FinancialHistoryPeriod,
  InstitutionProfile,
  ItemSyncResponse,
  MerchantCategoryRule,
  MonthYearFilter,
  MonthlyFinancial,
  PageResponse,
  PluggyConnectTokenResponse,
  Transaction,
  User,
} from "@/types/api";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080"
).replace(/\/$/, "");

const TOKEN_KEY = "money-magnet:token";
const USER_KEY = "money-magnet:user";
const THEME_KEY = "money-magnet:theme";

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(
  path: string,
  init: RequestInit = {},
  authenticated = true,
): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set("Accept", "application/json");

  if (init.body) {
    headers.set("Content-Type", "application/json");
  }

  if (authenticated) {
    const token = getToken();
    if (!token) {
      throw new ApiError("Faça login para continuar.", 401);
    }
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers,
  });

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

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export function getToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function saveSession(session: AuthorizationResponse) {
  window.localStorage.setItem(TOKEN_KEY, session.token);
  window.localStorage.setItem(USER_KEY, JSON.stringify(session.usuario));
  window.localStorage.setItem(
    THEME_KEY,
    session.usuario.theme === "DARK" ? "dark" : "light",
  );
  window.dispatchEvent(new Event("money-magnet:session-updated"));
}

export function clearSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
  window.localStorage.removeItem(THEME_KEY);
  window.dispatchEvent(new Event("money-magnet:session-updated"));
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
  window.dispatchEvent(new Event("money-magnet:session-updated"));
}

export function login(email: string, password: string) {
  return request<AuthorizationResponse>(
    "/api/v1/auth/login",
    {
      method: "POST",
      body: JSON.stringify({ email, password }),
    },
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
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    false,
  );
}

export function forgotPassword(email: string) {
  return request<void>(
    "/api/v1/auth/forgot-password",
    {
      method: "POST",
      body: JSON.stringify({ email }),
    },
    false,
  );
}

export function resetPassword(
  token: string,
  payload: {
    password: string;
    confirmPassword: string;
  },
) {
  return request<void>(
    `/api/v1/auth/reset-password/${encodeURIComponent(token)}`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    false,
  );
}

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
  return request<void>("/api/v1/profile", {
    method: "DELETE",
  });
}

export function getDashboard(signal?: AbortSignal) {
  return request<DashboardResponse>("/api/v1/dashboard", { signal });
}

export function getFinancialHistory(
  months: FinancialHistoryPeriod,
  signal?: AbortSignal,
) {
  return request<MonthlyFinancial[]>(
    `/api/v1/dashboard/financial-history?months=${months}`,
    { signal },
  );
}

export function getExpensesByCategory(
  filter: MonthYearFilter,
  signal?: AbortSignal,
) {
  const query = new URLSearchParams({
    year: filter.year.toString(),
    month: filter.month.toString(),
  });

  return request<CategoryExpense[]>(
    `/api/v1/dashboard/expenses-category?${query}`,
    { signal },
  );
}

export function createPluggyConnectToken() {
  return request<PluggyConnectTokenResponse>("/api/v1/pluggy/connect-token", {
    method: "POST",
  });
}

export function createAndSyncItem(pluggyItemId: string) {
  return request<ItemSyncResponse>("/api/v1/items", {
    method: "POST",
    body: JSON.stringify({ pluggyItemId }),
  });
}

export function getAccounts(signal?: AbortSignal) {
  return request<Account[]>("/api/v1/accounts", { signal });
}

export function getCategories(signal?: AbortSignal) {
  return request<Category[]>("/api/v1/categories", { signal });
}

export type CategoryPayload = Pick<Category, "name" | "color" | "icon">;

export function createCategory(payload: CategoryPayload) {
  return request<Category>("/api/v1/categories", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateCategory(
  categoryId: string,
  payload: CategoryPayload,
) {
  return request<Category>(`/api/v1/categories/${categoryId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function deleteCategory(categoryId: string) {
  return request<void>(`/api/v1/categories/${categoryId}`, {
    method: "DELETE",
  });
}

export function updateTransactionCategory(
  transactionId: string,
  categoryId: string,
) {
  const query = new URLSearchParams({ categoryId });

  return request<Transaction>(`/transactions/${transactionId}?${query}`, {
    method: "PUT",
  });
}

export function createMerchantCategoryRule(
  merchant: string,
  categoryId: string,
) {
  return request<MerchantCategoryRule>("/api/v1/categories/merchant-rules", {
    method: "POST",
    body: JSON.stringify({ merchant, categoryId }),
  });
}

export function getMerchantCategoryRules(signal?: AbortSignal) {
  return request<MerchantCategoryRule[]>("/api/v1/categories/merchant-rules", {
    signal,
  });
}

export function updateMerchantCategoryRule(
  ruleId: string,
  categoryId: string,
  active = true,
) {
  return request<MerchantCategoryRule>(
    `/api/v1/categories/merchant-rules/${ruleId}`,
    {
      method: "PUT",
      body: JSON.stringify({ categoryId, active }),
    },
  );
}

export function deleteMerchantCategoryRule(ruleId: string) {
  return request<void>(`/api/v1/categories/merchant-rules/${ruleId}`, {
    method: "DELETE",
  });
}

export function getInstitutionProfile(
  institutionId: string,
  signal?: AbortSignal,
) {
  return request<InstitutionProfile>(
    `/api/v1/institutions/${institutionId}`,
    { signal },
  );
}

export function getInstitutionTransactions(
  institutionId: string,
  accountType: string,
  page = 0,
  size = 10,
  signal?: AbortSignal,
) {
  const query = new URLSearchParams({
    accountType,
    page: page.toString(),
    size: size.toString(),
    sort: "paymentDate,desc",
  });

  return request<PageResponse<Transaction>>(
    `/api/v1/institutions/${institutionId}/transactions?${query}`,
    { signal },
  );
}

export interface TransactionFilters {
  startDate?: string;
  endDate?: string;
}

export function getTransactions(
  page = 0,
  size = 20,
  filters: TransactionFilters = {},
  signal?: AbortSignal,
) {
  const query = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    sort: "paymentDate,desc",
  });

  if (filters.startDate) query.set("startDate", filters.startDate);
  if (filters.endDate) query.set("endDate", filters.endDate);

  return request<PageResponse<Transaction>>(`/transactions?${query}`, {
    signal,
  });
}
