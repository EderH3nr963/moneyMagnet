"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { ApiError, clearSession, getBanks, getToken } from "@/lib/api";
import type { Account } from "@/types/api";

export interface InstitutionGroup {
  id: string;
  name: string;
  logoUrl: string | null;
  primaryColor: string | null;
  accounts: Account[];
  totalBalance: number;
  totalCreditLimit: number;
}

export function useInstitutions() {
  const router = useRouter();
  const [institutions, setInstitutions] = useState<InstitutionGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const load = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    setError("");

    try {
      const banks = await getBanks(signal);
      setInstitutions(
        banks.map((bank) => ({
          ...bank,
          totalBalance: bank.accounts.reduce(
            (total, account) =>
              total + (account.type === "CREDIT" ? 0 : account.balance ?? 0),
            0,
          ),
          totalCreditLimit: bank.accounts.reduce(
            (total, account) => total + (account.creditLimit ?? 0),
            0,
          ),
        })),
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
          : "Nao foi possivel carregar as instituicoes.",
      );
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (!getToken()) {
      router.replace("/auth");
      return;
    }

    const controller = new AbortController();
    const loadAccounts = async () => {
      await Promise.resolve();
      await load(controller.signal);
    };

    void loadAccounts();

    return () => controller.abort();
  }, [load, router]);

  const filteredInstitutions = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return institutions;

    return institutions
      .map((institution) => ({
        ...institution,
        accounts: institution.accounts.filter(
          (account) =>
            institution.name.toLowerCase().includes(term) ||
            account.name.toLowerCase().includes(term) ||
            (account.number ?? "").toLowerCase().includes(term),
        ),
      }))
      .filter((institution) => institution.accounts.length > 0);
  }, [institutions, search]);

  const totals = useMemo(
    () => ({
      institutions: institutions.length,
      accounts: institutions.reduce(
        (total, institution) => total + institution.accounts.length,
        0,
      ),
      balance: institutions.reduce(
        (total, institution) => total + institution.totalBalance,
        0,
      ),
      creditLimit: institutions.reduce(
        (total, institution) => total + institution.totalCreditLimit,
        0,
      ),
    }),
    [institutions],
  );

  return {
    accounts: institutions.flatMap((institution) => institution.accounts),
    institutions: filteredInstitutions,
    totals,
    loading,
    error,
    search,
    setSearch,
    refresh: () => load(),
  };
}
