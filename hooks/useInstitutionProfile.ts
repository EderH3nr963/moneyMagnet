"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  ApiError,
  clearSession,
  createMerchantCategoryRule,
  getMerchantCategoryRules,
  getInstitutionProfile,
  getInstitutionTransactions,
  getToken,
  updateMerchantCategoryRule,
  updateTransactionCategory,
} from "@/lib/api";
import type { InstitutionProfile, PageResponse, Transaction } from "@/types/api";

export type InstitutionAccountType = "CHECKING" | "SAVINGS" | "CREDIT";

const emptyPage: PageResponse<Transaction> = {
  content: [],
  totalPages: 0,
  totalElements: 0,
  size: 10,
  number: 0,
  first: true,
  last: true,
  numberOfElements: 0,
  empty: true,
};

export function useInstitutionProfile(institutionId: string) {
  const router = useRouter();
  const [profile, setProfile] = useState<InstitutionProfile | null>(null);
  const [transactionsPage, setTransactionsPage] = useState(emptyPage);
  const [accountType, setAccountType] =
    useState<InstitutionAccountType>("CHECKING");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [error, setError] = useState("");

  const handleError = useCallback(
    (requestError: unknown, fallback: string) => {
      if (requestError instanceof ApiError && requestError.status === 401) {
        clearSession();
        router.replace("/auth");
        return;
      }

      setError(requestError instanceof ApiError ? requestError.message : fallback);
    },
    [router],
  );

  useEffect(() => {
    if (!getToken()) {
      router.replace("/auth");
      return;
    }

    const controller = new AbortController();
    const load = async () => {
      await Promise.resolve();
      setLoadingProfile(true);
      setError("");

      try {
        setProfile(await getInstitutionProfile(institutionId, controller.signal));
      } catch (requestError) {
        if (
          requestError instanceof DOMException &&
          requestError.name === "AbortError"
        ) {
          return;
        }
        handleError(requestError, "Nao foi possivel carregar a instituicao.");
      } finally {
        if (!controller.signal.aborted) setLoadingProfile(false);
      }
    };

    void load();

    return () => controller.abort();
  }, [handleError, institutionId, router]);

  useEffect(() => {
    if (!getToken()) {
      router.replace("/auth");
      return;
    }

    const controller = new AbortController();
    const load = async () => {
      await Promise.resolve();
      setLoadingTransactions(true);
      setError("");

      try {
        setTransactionsPage(
          await getInstitutionTransactions(
            institutionId,
            accountType,
            page,
            size,
            controller.signal,
          ),
        );
      } catch (requestError) {
        if (
          requestError instanceof DOMException &&
          requestError.name === "AbortError"
        ) {
          return;
        }
        handleError(requestError, "Nao foi possivel carregar as transacoes.");
      } finally {
        if (!controller.signal.aborted) setLoadingTransactions(false);
      }
    };

    void load();

    return () => controller.abort();
  }, [accountType, handleError, institutionId, page, router, size]);

  function changeAccountType(nextType: InstitutionAccountType) {
    if (nextType === accountType) return;
    setAccountType(nextType);
    setPage(0);
  }

  function changePage(nextPage: number) {
    if (
      nextPage < 0 ||
      nextPage >= transactionsPage.totalPages ||
      nextPage === page
    ) {
      return;
    }

    setPage(nextPage);
  }

  function changePageSize(nextSize: number) {
    setSize(nextSize);
    setPage(0);
  }

  async function changeTransactionCategory(
    transaction: Transaction,
    categoryId: string,
    applyToMerchant: boolean,
  ) {
    setLoadingTransactions(true);
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

      setTransactionsPage(
        await getInstitutionTransactions(institutionId, accountType, page, size),
      );
    } catch (requestError) {
      handleError(requestError, "Nao foi possivel alterar a categoria.");
    } finally {
      setLoadingTransactions(false);
    }
  }

  return {
    profile,
    transactionsPage,
    accountType,
    page,
    size,
    loadingProfile,
    loadingTransactions,
    error,
    changeAccountType,
    changeTransactionCategory,
    changePage,
    changePageSize,
  };
}

function normalizeMerchant(merchant: string) {
  return merchant.trim().toLowerCase();
}
