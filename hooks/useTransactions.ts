"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  ApiError,
  clearSession,
  createMerchantCategoryRule,
  getMerchantCategoryRules,
  getToken,
  getTransactions,
  updateMerchantCategoryRule,
  updateTransactionCategory,
  type TransactionFilters,
} from "@/lib/api";
import type { PageResponse, Transaction } from "@/types/api";

const emptyPage: PageResponse<Transaction> = {
  content: [],
  totalPages: 0,
  totalElements: 0,
  size: 20,
  number: 0,
  first: true,
  last: true,
  numberOfElements: 0,
  empty: true,
};

export function useTransactions() {
  const router = useRouter();
  const [transactionsPage, setTransactionsPage] = useState(emptyPage);
  const [page, setPage] = useState(0);
  const [size, setSizeState] = useState(20);
  const [filters, setFiltersState] = useState<TransactionFilters>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!getToken()) {
      router.replace("/auth");
      return;
    }

    const controller = new AbortController();
    void getTransactions(page, size, filters, controller.signal)
      .then((response) => {
        setTransactionsPage(response);
        setError("");
      })
      .catch((requestError: unknown) => {
        if (
          requestError instanceof DOMException &&
          requestError.name === "AbortError"
        ) {
          return;
        }

        if (requestError instanceof ApiError && requestError.status === 401) {
          clearSession();
          router.replace("/auth");
          return;
        }

        setError(
          requestError instanceof ApiError
            ? requestError.message
            : "Não foi possível carregar as transações.",
        );
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [filters, page, router, size]);

  const totals = useMemo(
    () =>
      transactionsPage.content.reduce(
        (result, transaction) => {
          if (transaction.nature === "INCOME") {
            result.income += Math.abs(transaction.amount);
          }
          if (transaction.nature === "EXPENSE") {
            result.expenses += Math.abs(transaction.amount);
          }
          return result;
        },
        { income: 0, expenses: 0 },
      ),
    [transactionsPage.content],
  );

  async function refresh() {
    setLoading(true);
    setError("");

    try {
      setTransactionsPage(await getTransactions(page, size, filters));
    } catch (requestError) {
      if (requestError instanceof ApiError && requestError.status === 401) {
        clearSession();
        router.replace("/auth");
        return;
      }
      setError(
        requestError instanceof ApiError
          ? requestError.message
          : "Não foi possível atualizar as transações.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function changeTransactionCategory(
    transaction: Transaction,
    categoryId: string,
    applyToMerchant: boolean,
  ) {
    setLoading(true);
    setError("");

    try {
      await updateTransactionCategory(transaction.id, categoryId);

      const merchant = transaction.merchant;
      if (applyToMerchant && merchant) {
        const rules = await getMerchantCategoryRules();
        const existingRule = rules.find(
          (rule) => normalizeMerchant(rule.merchant) === normalizeMerchant(merchant),
        );

        if (existingRule) {
          await updateMerchantCategoryRule(existingRule.id, categoryId, true);
        } else {
          await createMerchantCategoryRule(merchant, categoryId);
        }
      }

      setTransactionsPage(await getTransactions(page, size, filters));
    } catch (requestError) {
      if (requestError instanceof ApiError && requestError.status === 401) {
        clearSession();
        router.replace("/auth");
        return;
      }

      setError(
        requestError instanceof ApiError
          ? requestError.message
          : "Nao foi possivel alterar a categoria.",
      );
    } finally {
      setLoading(false);
    }
  }

  function changePage(nextPage: number) {
    if (
      nextPage < 0 ||
      nextPage >= transactionsPage.totalPages ||
      nextPage === page
    ) {
      return;
    }

    setLoading(true);
    setPage(nextPage);
  }

  function changePageSize(nextSize: number) {
    setLoading(true);
    setPage(0);
    setSizeState(nextSize);
  }

  function applyFilters(nextFilters: TransactionFilters) {
    setLoading(true);
    setPage(0);
    setFiltersState({
      startDate: nextFilters.startDate || undefined,
      endDate: nextFilters.endDate || undefined,
    });
  }

  function clearFilters() {
    applyFilters({});
  }

  return {
    transactionsPage,
    totals,
    page,
    size,
    filters,
    loading,
    error,
    refresh,
    changeTransactionCategory,
    changePage,
    changePageSize,
    applyFilters,
    clearFilters,
  };
}

function normalizeMerchant(merchant: string) {
  return merchant.trim().toLowerCase();
}
