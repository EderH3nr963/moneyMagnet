import type { PageResponse, Transaction } from "@/types/api";

import { request } from "./client";

export interface TransactionFilters {
  search?: string;
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
  });

  if (filters.startDate) query.set("startDate", filters.startDate);
  if (filters.endDate) query.set("endDate", filters.endDate);
  if (filters.search) query.set("search", filters.search);

  return request<PageResponse<Transaction>>(`/transactions?${query}`, { signal });
}
