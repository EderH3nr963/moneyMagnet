import type { PageResponse, Transaction } from "@/types/api";

import { request } from "./client";

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

  return request<PageResponse<Transaction>>(`/transactions?${query}`, { signal });
}
