import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  LoaderCircle,
  ReceiptText,
  X,
} from "lucide-react";

import type { Category, PageResponse, Transaction } from "@/types/api";
import { TransactionCard, TransactionRow } from "./TransactionEntry";

interface TransactionsHistoryProps {
  transactionsPage: PageResponse<Transaction>;
  categories: Category[];
  page: number;
  size: number;
  loading: boolean;
  updating: boolean;
  onCategoryChange: (
    transaction: Transaction,
    categoryId: string,
    applyToMerchant: boolean,
  ) => Promise<void>;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export default function TransactionsHistory({
  transactionsPage,
  categories,
  page,
  size,
  loading,
  updating,
  onCategoryChange,
  onPageChange,
  onPageSizeChange,
}: TransactionsHistoryProps) {
  const [pendingChange, setPendingChange] = useState<{
    transaction: Transaction;
    category: Category;
  } | null>(null);
  const [applyToMerchant, setApplyToMerchant] = useState(false);

  function requestCategoryChange(transaction: Transaction, categoryId: string) {
    const category = categories.find((item) => item.id === categoryId);
    if (!category || transaction.category?.id === category.id) return;

    setPendingChange({ transaction, category });
    setApplyToMerchant(false);
  }

  async function confirmCategoryChange() {
    if (!pendingChange) return;

    await onCategoryChange(
      pendingChange.transaction,
      pendingChange.category.id,
      applyToMerchant,
    );
    setPendingChange(null);
    setApplyToMerchant(false);
  }

  return (
    <section className="m-3 min-w-0 overflow-hidden rounded-xl border border-border bg-card sm:m-4 sm:rounded-2xl">
      <HistoryHeader
        size={size}
        onPageSizeChange={onPageSizeChange}
      />

      <HistoryContent
        transactionsPage={transactionsPage}
        categories={categories}
        loading={loading}
        updating={updating}
        onCategorySelect={requestCategoryChange}
      />

      <Pagination
        transactionsPage={transactionsPage}
        page={page}
        loading={loading}
        onPageChange={onPageChange}
      />

      <CategoryChangeModal
        pendingChange={pendingChange}
        applyToMerchant={applyToMerchant}
        saving={updating}
        onApplyToMerchantChange={setApplyToMerchant}
        onCancel={() => setPendingChange(null)}
        onConfirm={confirmCategoryChange}
      />
    </section>
  );
}

interface HistoryHeaderProps {
  size: number;
  onPageSizeChange: (size: number) => void;
}

function HistoryHeader({
  size,
  onPageSizeChange,
}: HistoryHeaderProps) {
  return (
    <div className="flex flex-col gap-3 border-b border-border px-4 py-4 min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-between sm:px-5">
      <div className="flex items-center gap-2">
        <ReceiptText className="text-primary" size={20} />
        <h2 className="font-semibold">Histórico</h2>
      </div>
      <label className="flex items-center gap-2 text-sm text-muted-foreground">
        Exibir
        <select
          value={size}
          onChange={(event) => onPageSizeChange(Number(event.target.value))}
          className="rounded-lg border border-border bg-background px-2 py-1.5 text-foreground outline-none focus:border-primary"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </label>
    </div>
  );
}

interface HistoryContentProps {
  transactionsPage: PageResponse<Transaction>;
  categories: Category[];
  loading: boolean;
  updating: boolean;
  onCategorySelect: (transaction: Transaction, categoryId: string) => void;
}

function HistoryContent({
  transactionsPage,
  categories,
  loading,
  updating,
  onCategorySelect,
}: HistoryContentProps) {
  if (loading) {
    return (
      <div className="flex min-h-80 items-center justify-center gap-3 text-muted-foreground">
        <LoaderCircle className="animate-spin" />
        Carregando transações...
      </div>
    );
  }

  if (transactionsPage.empty) {
    return (
      <div className="flex min-h-80 flex-col items-center justify-center px-4 text-center">
        <div className="mb-4 rounded-full bg-primary/10 p-4 text-primary">
          <ReceiptText size={30} />
        </div>
        <h2 className="font-semibold">Nenhuma transação encontrada</h2>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          Conecte uma conta bancária no dashboard para importar suas movimentações.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-190 w-full">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="px-5 py-3 font-medium">Descrição</th>
              <th className="px-5 py-3 font-medium">Categoria</th>
              <th className="px-5 py-3 font-medium">Conta</th>
              <th className="px-5 py-3 font-medium">Data</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 text-right font-medium">Valor</th>
            </tr>
          </thead>
          <tbody>
            {transactionsPage.content.map((transaction) => (
              <TransactionRow
                key={transaction.id}
                transaction={transaction}
                categories={categories}
                updating={updating}
                onCategorySelect={onCategorySelect}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="divide-y divide-border md:hidden">
        {transactionsPage.content.map((transaction) => (
          <TransactionCard
            key={transaction.id}
            transaction={transaction}
            categories={categories}
            updating={updating}
            onCategorySelect={onCategorySelect}
          />
        ))}
      </div>
    </>
  );
}

interface CategoryChangeModalProps {
  pendingChange: {
    transaction: Transaction;
    category: Category;
  } | null;
  applyToMerchant: boolean;
  saving: boolean;
  onApplyToMerchantChange: (value: boolean) => void;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
}

function CategoryChangeModal({
  pendingChange,
  applyToMerchant,
  saving,
  onApplyToMerchantChange,
  onCancel,
  onConfirm,
}: CategoryChangeModalProps) {
  if (!pendingChange) return null;

  const { transaction, category } = pendingChange;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6">
      <div className="max-h-[calc(100vh-3rem)] w-full max-w-md overflow-y-auto rounded-xl border border-border bg-card p-5 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold">Alterar categoria?</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Essa transacao sera movida para {category.name}.
            </p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:opacity-50"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-4 rounded-lg border border-border bg-background p-3 text-sm">
          <p className="break-words-word font-medium">
            {transaction.merchant || transaction.description}
          </p>
          <p className="mt-1 text-muted-foreground">
            {transaction.category?.name || "Sem categoria"} para {category.name}
          </p>
        </div>

        {transaction.merchant && (
          <label className="mt-4 flex items-start gap-3 rounded-lg border border-border p-3 text-sm">
            <input
              type="checkbox"
              checked={applyToMerchant}
              onChange={(event) => onApplyToMerchantChange(event.target.checked)}
              disabled={saving}
              className="mt-1 h-4 w-4 accent-primary"
            />
            <span>
              <span className="block font-medium">
                Definir como padrao para {transaction.merchant}
              </span>
              <span className="mt-1 block text-muted-foreground">
                As proximas transacoes desse merchant vao cair nessa categoria.
              </span>
            </span>
          </label>
        )}

        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="rounded-lg border border-border px-4 py-2 text-sm transition hover:bg-muted disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => void onConfirm()}
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
          >
            {saving ? <LoaderCircle className="animate-spin" size={16} /> : <Check size={16} />}
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

interface PaginationProps {
  transactionsPage: PageResponse<Transaction>;
  page: number;
  loading: boolean;
  onPageChange: (page: number) => void;
}

function Pagination({
  transactionsPage,
  page,
  loading,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex flex-col gap-3 border-t border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Página {transactionsPage.totalPages ? page + 1 : 0} de{" "}
        {transactionsPage.totalPages}
      </p>
      <div className="grid grid-cols-2 gap-2 sm:flex">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={loading || transactionsPage.first}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 text-sm transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40 not-disabled:hover:cursor-pointer"
        >
          <ArrowLeft size={16} />
          Anterior
        </button>
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={loading || transactionsPage.last}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 text-sm transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40 not-disabled:hover:cursor-pointer"
        >
          Próxima
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
