import type { Category, MerchantCategoryRule, Transaction } from "@/types/api";

import { request } from "./client";

export type CategoryPayload = Pick<Category, "name" | "color" | "icon">;

export function getCategories(signal?: AbortSignal) {
  return request<Category[]>("/api/v1/categories", { signal });
}

export function createCategory(payload: CategoryPayload) {
  return request<Category>("/api/v1/categories", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateCategory(categoryId: string, payload: CategoryPayload) {
  return request<Category>(`/api/v1/categories/${categoryId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function deleteCategory(categoryId: string) {
  return request<void>(`/api/v1/categories/${categoryId}`, { method: "DELETE" });
}

export function updateTransactionCategory(transactionId: string, categoryId: string) {
  const query = new URLSearchParams({ categoryId });
  return request<Transaction>(`/transactions/${transactionId}?${query}`, {
    method: "PUT",
  });
}

export function createMerchantCategoryRule(merchant: string, categoryId: string) {
  return request<MerchantCategoryRule>("/api/v1/categories/merchant-rules", {
    method: "POST",
    body: JSON.stringify({ merchant, categoryId }),
  });
}

export function getMerchantCategoryRules(signal?: AbortSignal) {
  return request<MerchantCategoryRule[]>("/api/v1/categories/merchant-rules", { signal });
}

export function updateMerchantCategoryRule(
  ruleId: string,
  categoryId: string,
  active = true,
) {
  return request<MerchantCategoryRule>(
    `/api/v1/categories/merchant-rules/${ruleId}`,
    { method: "PUT", body: JSON.stringify({ categoryId, active }) },
  );
}

export function deleteMerchantCategoryRule(ruleId: string) {
  return request<void>(`/api/v1/categories/merchant-rules/${ruleId}`, {
    method: "DELETE",
  });
}
