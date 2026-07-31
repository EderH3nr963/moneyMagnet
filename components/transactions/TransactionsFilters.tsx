import { Filter, RefreshCw, Search, X } from "lucide-react";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";

import type { TransactionFilters } from "@/lib/api";

interface TransactionsFiltersProps {
  filters: TransactionFilters;
  loading: boolean;
  onApply: (filters: TransactionFilters) => void;
  onClear: () => void;
  onRefresh: () => void;
}

export default function TransactionsFilters({
  filters,
  loading,
  onApply,
  onClear,
  onRefresh,
}: TransactionsFiltersProps) {
  const [startDate, setStartDate] = useState(filters.startDate ?? "");
  const [endDate, setEndDate] = useState(filters.endDate ?? "");
  const [search, setSearch] = useState(filters.search ?? "");

  const hasActiveFilters = Boolean(
    filters.search || filters.startDate || filters.endDate,
  );
  const hasInvalidRange = useMemo(
    () => Boolean(startDate && endDate && startDate > endDate),
    [endDate, startDate],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (hasInvalidRange) return;
    onApply({ search, startDate, endDate });
  }

  function handleClear() {
    setSearch("");
    setStartDate("");
    setEndDate("");
    onClear();
  }

  return (
    <section className="m-4 rounded-2xl border border-border bg-card p-4">
      <form
        onSubmit={handleSubmit}
        className="grid gap-3 lg:grid-cols-[1.5fr_1fr_1fr_auto] lg:items-end"
      >
        <label className="grid gap-2 text-sm">
          <span className="text-muted-foreground">Pesquisar</span>
          <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2.5 transition focus-within:border-primary">
            <Search size={18} className="shrink-0 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Descrição, loja ou conta"
              className="w-full bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
            />
          </div>
        </label>

        <label className="grid gap-2 text-sm">
          <span className="text-muted-foreground">Data inicial</span>
          <input
            type="date"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
            className="rounded-xl border border-border bg-background px-3 py-2.5 text-foreground outline-none transition focus:border-primary"
          />
        </label>

        <label className="grid gap-2 text-sm">
          <span className="text-muted-foreground">Data final</span>
          <input
            type="date"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
            className="rounded-xl border border-border bg-background px-3 py-2.5 text-foreground outline-none transition focus:border-primary"
          />
        </label>

        <div className="flex flex-wrap gap-2">
          <button
            type="submit"
            disabled={loading || hasInvalidRange}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            <Filter size={16} />
            Filtrar
          </button>
          <button
            type="button"
            onClick={handleClear}
            disabled={
              loading || (!hasActiveFilters && !search && !startDate && !endDate)
            }
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50 not-disabled:cursor-pointer"
          >
            <X size={16} />
            Limpar
          </button>
          <button
            type="button"
            onClick={onRefresh}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Atualizar
          </button>
        </div>
      </form>

      {hasInvalidRange && (
        <p className="mt-3 text-sm text-red-400">
          A data inicial precisa ser menor ou igual a data final.
        </p>
      )}
    </section>
  );
}
