"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import {
  ApiError,
  clearSession,
  createPluggyConnectToken,
  getDashboard,
  getExpensesByCategory,
  getFinancialHistory,
  getToken,
  refreshAccessToken,
  validAccessToken,
} from "@/lib/api";
import type {
  DashboardResponse,
  FinancialHistoryPeriod,
  MonthYearFilter,
} from "@/types/api";
import { API_URL } from "@/lib/api/config";
import { fetchEventSource } from "@microsoft/fetch-event-source";

export type ConnectionNotice = {
  type: "loading" | "success" | "error";
  message: string;
};

class FatalSseError extends Error { }

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
  const financialHistoryPeriodRef = useRef(financialHistoryPeriod);
  const expensesByCategoryFilterRef = useRef(expensesByCategoryFilter);

  useEffect(() => {
    financialHistoryPeriodRef.current = financialHistoryPeriod;
  }, [financialHistoryPeriod]);

  useEffect(() => {
    expensesByCategoryFilterRef.current = expensesByCategoryFilter;
  }, [expensesByCategoryFilter]);

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

      setTimeout(() => {
        setConnectionNotice(null);
      }, 5_000);
    }
  }

  async function handleConnectionSuccess() {
    setConnectionNotice({
      type: "success",
      message: "Conta conectada. Sincronizando contas e transações em segundo plano...",
    });

    setTimeout(() => {
      setConnectionNotice(null);
    }, 5_000);
  }

  function closePluggyConnect() {
    setConnectToken(null);
  }

  useEffect(() => {
    const sseController = new AbortController();
    const requestController = new AbortController();
    let refreshPromise: Promise<void> | null = null;
    let refreshQueued = false;

    const refreshDashboardData = () => {
      if (refreshPromise) {
        refreshQueued = true;
        return refreshPromise;
      }

      refreshPromise = Promise.all([
        getDashboard(requestController.signal),
        getFinancialHistory(financialHistoryPeriodRef.current, requestController.signal),
        getExpensesByCategory(
          expensesByCategoryFilterRef.current,
          requestController.signal,
        ),
      ])
        .then(([nextDashboard, financialHistory, expensesByCategory]) => {
          setDashboard({ ...nextDashboard, financialHistory, expensesByCategory });
          setError("");
        })
        .catch((requestError: unknown) => {
          if (requestController.signal.aborted) return;
          if (requestError instanceof ApiError && requestError.status === 401) {
            clearSession();
            router.replace("/auth");
            sseController.abort();
            return;
          }
          setError(
            requestError instanceof ApiError
              ? requestError.message
              : "Nao foi possivel atualizar o dashboard apos a sincronizacao.",
          );
        })
        .finally(() => {
          refreshPromise = null;
          if (refreshQueued && !requestController.signal.aborted) {
            refreshQueued = false;
            void refreshDashboardData();
          }
        });

      return refreshPromise;
    };

    const connect = async () => {
      await fetchEventSource(
        `${API_URL}/api/v1/dashboard/events`,
        {
          method: "GET",

          credentials: "include",
          signal: sseController.signal,
          openWhenHidden: true,
          fetch: async (input, init) => {
            const headers = new Headers(init?.headers);
            headers.set("Authorization", `Bearer ${await validAccessToken()}`);
            return fetch(input, { ...init, headers });
          },

          async onopen(response) {
            if (response.status === 401) {
              await refreshAccessToken();
              throw new Error("Token SSE renovado; reconectando.");
            }

            if (!response.ok) {
              throw new FatalSseError(
                `Erro ao abrir conexão SSE: ${response.status}`
              );
            }

            const contentType =
              response.headers.get("content-type");

            if (!contentType?.includes("text/event-stream")) {
              throw new FatalSseError(
                `Resposta inválida para SSE: ${contentType}`
              );
            }
          },

          onmessage(event) {
            if (event.event === "ITEM_CREATED_UPDATED") {
              void refreshDashboardData();

              setConnectionNotice({
                type: "success",
                message: "Conta conectada. Sincronizando contas e transações em segundo plano...",
              });

              setTimeout(() => {
                setConnectionNotice(null);
              }, 5_000);
            }
          },

          onclose() {
            throw new Error("Conexao SSE encerrada; reconectando.");
          },

          onerror(error) {
            if (error instanceof FatalSseError) throw error;
            return 2_000;
          },
        }
      );
    };

    connect().catch((error: unknown) => {
      if (!sseController.signal.aborted) {
        if (error instanceof ApiError && error.status === 401) {
          clearSession();
          router.replace("/auth");
          return;
        }
        console.error("Não foi possível conectar ao SSE:", error);
      }
    });

    return () => {
      sseController.abort();
      requestController.abort();
    };
  }, [router]);

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
