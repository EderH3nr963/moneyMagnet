import { ReceiptText } from "lucide-react";

import type { Transaction } from "@/types/api";
import { DynamicIcon } from "./DynamicIcon";
import { currencyFormatter, shortDateFormatter } from "./dashboard-formatters";

interface RecentTransactionsCardProps {
  transactions: Transaction[];
}

export default function RecentTransactionsCard({
  transactions,
}: RecentTransactionsCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="mb-4 flex items-center gap-2">
        <ReceiptText className="text-primary" size={20} />
        <h2 className="font-semibold">Últimas transações</h2>
      </div>

      <div className="space-y-3">
        {transactions.length ? (
          transactions.slice(0, 7).map((transaction) => (
            <RecentTransactionItem
              key={transaction.id}
              transaction={transaction}
            />
          ))
        ) : (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Nenhuma transação recente.
          </p>
        )}
      </div>
    </div>
  );
}

function RecentTransactionItem({ transaction }: { transaction: Transaction }) {
  const credit = transaction.type === "CREDIT";

  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-border p-4">
      <div className="flex min-h-11 min-w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-300 group-hover:-translate-y-1">
        <DynamicIcon name={transaction.category?.icon} size={22} />
      </div>

      <div className="flex min-w-0 w-full flex-col">
        <p className="truncate font-medium">
          {transaction.merchant || transaction.description}
        </p>
        <p className="text-xs text-muted-foreground">
          {shortDateFormatter.format(new Date(transaction.date))}
          {transaction.category && (
            <span
              style={{
                backgroundColor: `${transaction.category.color || "#f0f0f0"}20`,
                color: transaction.category.color || "#6b7280",
              }}
              className="ml-2 rounded-lg px-2 py-0.5"
            >
              {transaction.category.name}
            </span>
          )}
        </p>
      </div>

      <span
        className={`shrink-0 text-sm font-semibold ${
          credit ? "text-emerald-500" : ""
        }`}
      >
        {credit ? "+" : ""}
        {currencyFormatter.format(Math.abs(transaction.amount))}
      </span>
    </div>
  );
}
