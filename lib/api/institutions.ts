import type {
  InstitutionProfile,
  ItemSyncResponse,
  PageResponse,
  PluggyConnectTokenResponse,
  Transaction,
} from "@/types/api";

import { request } from "./client";

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

export function getBanks(signal?: AbortSignal) {
  return request<InstitutionProfile[]>("/api/v1/banks", { signal });
}

export function getInstitutionProfile(itemId: string, signal?: AbortSignal) {
  return request<InstitutionProfile>(`/api/v1/banks/${itemId}`, { signal });
}

export function getInstitutionTransactions(
  itemId: string,
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
    `/api/v1/banks/${itemId}/transactions?${query}`,
    { signal },
  );
}
