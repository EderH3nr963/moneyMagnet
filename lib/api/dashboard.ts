import type {
  CategoryExpense,
  DashboardResponse,
  FinancialHistoryPeriod,
  MonthYearFilter,
  MonthlyFinancial,
} from "@/types/api";

import { request } from "./client";

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
