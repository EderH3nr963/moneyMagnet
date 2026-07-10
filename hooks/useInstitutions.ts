"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { ApiError, clearSession, getAccounts, getToken } from "@/lib/api";
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

function institutionKey(account: Account) {
  return account.institutionId;
}

function groupAccounts(accounts: Account[]): InstitutionGroup[] {
  const groups = new Map<string, InstitutionGroup>();

  for (const account of accounts) {
    const id = institutionKey(account);
    const current = groups.get(id) ?? {
      id,
      name: account.institutionName,
      logoUrl: account.institutionLogoUrl,
      primaryColor: account.institutionPrimaryColor,
      accounts: [],
      totalBalance: 0,
      totalCreditLimit: 0,
    };

    current.accounts.push(account);
    if (account.type !== "CREDIT") {
      current.totalBalance += account.balance ?? 0;
    }
    current.totalCreditLimit += account.creditLimit ?? 0;

    groups.set(id, current);
  }

  return Array.from(groups.values()).sort((left, right) =>
    left.name.localeCompare(right.name, "pt-BR"),
  );
}

export function useInstitutions() {
  const router = useRouter();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const load = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    setError("");

    try {
      setAccounts(await getAccounts(signal));
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

  const institutions = useMemo(() => groupAccounts(accounts), [accounts]);

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
      accounts: accounts.length,
      balance: institutions.reduce(
        (total, institution) => total + institution.totalBalance,
        0,
      ),
      creditLimit: institutions.reduce(
        (total, institution) => total + institution.totalCreditLimit,
        0,
      ),
    }),
    [accounts.length, institutions],
  );

  return {
    accounts,
    institutions: filteredInstitutions,
    totals,
    loading,
    error,
    search,
    setSearch,
    refresh: () => load(),
  };
}
