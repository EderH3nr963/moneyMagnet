"use client";

import { useSidebar } from "../../context/SidebarContext";
import TransactionsFilters from "@/components/transactions/TransactionsFilters";
import TransactionsHeader from "@/components/transactions/TransactionsHeader";
import TransactionsHistory from "@/components/transactions/TransactionsHistory";
import TransactionsSummary from "@/components/transactions/TransactionsSummary";
import { useCategories } from "@/hooks/useCategories";
import { useTransactions } from "@/hooks/useTransactions";

export default function TransactionsPage() {
  const { setOpen } = useSidebar();
  const {
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
  } = useTransactions();
  const {
    categories,
    loading: loadingCategories,
    error: categoriesError,
  } = useCategories();

  return (
    <main className="w-full not-lg:max-w-[100vw]">
      <TransactionsHeader
        totalElements={transactionsPage.totalElements}
        onOpenMenu={() => setOpen(true)}
      />

      {error && (
        <div
          role="alert"
          className="mx-4 mt-4 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-400"
        >
          {error}
        </div>
      )}

      {categoriesError && (
        <div
          role="alert"
          className="mx-4 mt-4 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-400"
        >
          {categoriesError}
        </div>
      )}

      <TransactionsFilters
        filters={filters}
        loading={loading}
        onApply={applyFilters}
        onClear={clearFilters}
        onRefresh={refresh}
      />

      <TransactionsSummary
        numberOfElements={transactionsPage.numberOfElements}
        income={totals.income}
        expenses={totals.expenses}
      />

      <TransactionsHistory
        transactionsPage={transactionsPage}
        categories={categories}
        page={page}
        size={size}
        loading={loading || loadingCategories}
        updating={loading}
        onCategoryChange={changeTransactionCategory}
        onPageChange={changePage}
        onPageSizeChange={changePageSize}
      />
    </main>
  );
}
