import type { Category, Transaction } from "@/types/api";
import {
  formatCurrency,
  formatTransactionDate,
  getTransactionTitle,
  transactionStatusLabels,
} from "./transaction-formatters";
import CategoryDropdown from "./CategoryDropdown";

interface TransactionEntryProps {
  transaction: Transaction;
  categories: Category[];
  updating: boolean;
  onCategorySelect: (transaction: Transaction, categoryId: string) => void;
}

export function TransactionRow({
  transaction,
  categories,
  updating,
  onCategorySelect,
}: TransactionEntryProps) {
  const income = transaction.nature === "INCOME";

  return (
    <tr className="border-b border-border/70 transition last:border-0 hover:bg-muted/40">
      <td className="max-w-72 px-5 py-4">
        <p className="truncate font-medium">{getTransactionTitle(transaction)}</p>
        {transaction.merchant && (
          <p className="truncate text-xs text-muted-foreground">
            {transaction.description}
          </p>
        )}
      </td>
      <td className="px-5 py-4 text-sm">
        <TransactionCategory
          transaction={transaction}
          categories={categories}
          updating={updating}
          onCategorySelect={onCategorySelect}
        />
      </td>
      <td className="max-w-44 px-5 py-4 text-sm text-muted-foreground">
        <span className="block truncate">{transaction.accountName}</span>
      </td>
      <td className="whitespace-nowrap px-5 py-4 text-sm text-muted-foreground">
        {formatTransactionDate(transaction)}
      </td>
      <td className="px-5 py-4">
        <TransactionStatus status={transaction.status} />
      </td>
      <td
        className={`whitespace-nowrap px-5 py-4 text-right font-semibold ${
          income && "text-emerald-500" 
        }`}
      >
        {income && "+"}
        {formatCurrency(Math.abs(transaction.amount), transaction.currency)}
      </td>
    </tr>
  );
}

export function TransactionCard({
  transaction,
  categories,
  updating,
  onCategorySelect,
}: TransactionEntryProps) {
  const income = transaction.nature === "INCOME";

  return (
    <article className="p-4">
      <div className="flex flex-col gap-2 min-[420px]:flex-row min-[420px]:items-start min-[420px]:justify-between min-[420px]:gap-4">
        <div className="min-w-0">
          <p className="truncate font-medium">{getTransactionTitle(transaction)}</p>
          <p className="mt-1 break-words-word text-xs text-muted-foreground">
            {transaction.accountName} · {formatTransactionDate(transaction)}
          </p>
        </div>
        <p
          className={`break-words-word font-semibold min-[420px]:shrink-0 min-[420px]:text-right ${
            income ? "text-emerald-500" : "text-red-400"
          }`}
        >
          {income ? "+" : "-"}
          {formatCurrency(Math.abs(transaction.amount), transaction.currency)}
        </p>
      </div>
      <div className="mt-3 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-between">
        <TransactionCategory
          transaction={transaction}
          categories={categories}
          updating={updating}
          onCategorySelect={onCategorySelect}
        />
        <TransactionStatus status={transaction.status} />
      </div>
    </article>
  );
}

function TransactionCategory({
  transaction,
  categories,
  updating,
  onCategorySelect,
}: TransactionEntryProps) {
  return (
    <CategoryDropdown
      categories={categories}
      value={transaction.category}
      disabled={updating}
      onChange={(categoryId) => onCategorySelect(transaction, categoryId)}
    />
  );
}

function TransactionStatus({ status }: { status: string }) {
  const pending = status === "PENDING";

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
        pending
          ? "bg-amber-500/10 text-amber-400"
          : "bg-emerald-500/10 text-emerald-400"
      }`}
    >
      {transactionStatusLabels[status] ?? status}
    </span>
  );
}
