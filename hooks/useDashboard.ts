"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Item as PluggyItem } from "pluggy-js";

import {
  ApiError,
  clearSession,
  createAndSyncItem,
  createPluggyConnectToken,
  getDashboard,
  getExpensesByCategory,
  getFinancialHistory,
  getToken,
} from "@/lib/api";
import type {
  DashboardResponse,
  FinancialHistoryPeriod,
  MonthYearFilter,
} from "@/types/api";

export type ConnectionNotice = {
  type: "loading" | "success" | "error";
  message: string;
};

function currentMonthYear(): MonthYearFilter {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
  };
}

function pluggyErrorMessage(message?: string) {
  if (message?.includes("ITEM_USER_ALREADY_EXISTS")) {
    return "Essa conexao ja existe na Pluggy para o seu usuario. Tente novamente; agora o app permite criar outra conexao para a mesma instituicao.";
  }

  return message || "Nao foi possivel conectar a instituicao.";
}

export function useDashboard() {
  const router = useRouter();
  const [dashboard, setDashboard] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingFinancialHistory, setLoadingFinancialHistory] = useState(false);
  const [loadingExpensesByCategory, setLoadingExpensesByCategory] =
    useState(false);
  const [financialHistoryPeriod, setFinancialHistoryPeriod] =
    useState<FinancialHistoryPeriod>(12);
  const [expensesByCategoryFilter, setExpensesByCategoryFilter] =
    useState<MonthYearFilter>(() => currentMonthYear());
  const [error, setError] = useState("");
  const [connectToken, setConnectToken] = useState<string | null>(null);
  const [connectionNotice, setConnectionNotice] =
    useState<ConnectionNotice | null>(null);

  const loadDashboard = useCallback(
    async (signal?: AbortSignal) => {
      setError("");
      setLoading(true);

      try {
        const response = await getDashboard(signal);
        setDashboard(response);
      } catch (requestError) {
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
            : "Não foi possível carregar o dashboard. Confira se o servidor está ligado.",
        );
      } finally {
        if (!signal?.aborted) setLoading(false);
      }
    },
    [router],
  );

  const loadExpensesByCategory = useCallback(
    async (filter: MonthYearFilter, signal?: AbortSignal) => {
      setError("");
      setExpensesByCategoryFilter(filter);
      setLoadingExpensesByCategory(true);

      try {
        const expensesByCategory = await getExpensesByCategory(filter, signal);
        setDashboard((current) =>
          current ? { ...current, expensesByCategory } : current,
        );
      } catch (requestError) {
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
            : "Nao foi possivel carregar as despesas por categoria.",
        );
      } finally {
        if (!signal?.aborted) setLoadingExpensesByCategory(false);
      }
    },
    [router],
  );

  const loadFinancialHistory = useCallback(
    async (months: FinancialHistoryPeriod, signal?: AbortSignal) => {
      setError("");
      setFinancialHistoryPeriod(months);
      setLoadingFinancialHistory(true);

      try {
        const financialHistory = await getFinancialHistory(months, signal);
        setDashboard((current) =>
          current ? { ...current, financialHistory } : current,
        );
      } catch (requestError) {
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
            : "Nao foi possivel carregar o historico financeiro.",
        );
      } finally {
        if (!signal?.aborted) setLoadingFinancialHistory(false);
      }
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
      await loadDashboard(controller.signal);
    };

    void load();

    return () => controller.abort();
  }, [loadDashboard, router]);

  async function openBankConnection() {
    setConnectionNotice({
      type: "loading",
      message: "Preparando conexão segura com a Pluggy...",
    });

    try {
      const response = await createPluggyConnectToken();
      setConnectToken(response.accessToken);
      setConnectionNotice(null);
    } catch (requestError) {
      if (requestError instanceof ApiError && requestError.status === 401) {
        clearSession();
        router.replace("/auth");
        return;
      }

      setConnectionNotice({
        type: "error",
        message:
          requestError instanceof ApiError
            ? requestError.message
            : "Não foi possível iniciar a conexão bancária.",
      });
    }
  }

  async function handleConnectionSuccess({ item }: { item: PluggyItem }) {
    setConnectionNotice({
      type: "loading",
      message: "Conta conectada. Sincronizando contas e transações...",
    });

    try {
      const sync = await createAndSyncItem(item.id);
      setConnectToken(null);
      await loadDashboard();
      setFinancialHistoryPeriod(12);
      setExpensesByCategoryFilter(currentMonthYear());
      setConnectionNotice({
        type: "success",
        message: `${sync.accountsSynced} conta(s) e ${sync.transactionsSynced} transação(ões) sincronizadas.`,
      });
    } catch (requestError) {
      setConnectToken(null);
      setConnectionNotice({
        type: "error",
        message:
          requestError instanceof ApiError
            ? requestError.message
            : "A conta foi conectada, mas não foi possível sincronizar os dados.",
      });
    }
  }

  function closePluggyConnect() {
    setConnectToken(null);
  }

  function handlePluggyError(message?: string) {
    setConnectToken(null);
    setConnectionNotice({
      type: "error",
      message: pluggyErrorMessage(message),
    });
  }

  function handlePluggyLoadError() {
    setConnectToken(null);
    setConnectionNotice({
      type: "error",
      message: "Não foi possível carregar o modal da Pluggy.",
    });
  }

  return {
    dashboard,
    loading,
    loadingFinancialHistory,
    loadingExpensesByCategory,
    financialHistoryPeriod,
    expensesByCategoryFilter,
    error,
    connectToken,
    connectionNotice,
    loadDashboard,
    loadFinancialHistory,
    loadExpensesByCategory,
    openBankConnection,
    handleConnectionSuccess,
    closePluggyConnect,
    handlePluggyError,
    handlePluggyLoadError,
  };
}
