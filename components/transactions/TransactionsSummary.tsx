import { ArrowDown, ArrowUp, type LucideIcon, WalletCards } from "lucide-react";

import { formatCurrency } from "./transaction-formatters";

interface TransactionsSummaryProps {
  numberOfElements: number;
  income: number;
  expenses: number;
}

export default function TransactionsSummary({
  numberOfElements,
  income,
  expenses,
}: TransactionsSummaryProps) {
  return (
    <section className="mx-4 mt-4 grid gap-4 md:grid-cols-3">
      <SummaryCard
        label="Movimentações nesta página"
        value={numberOfElements.toLocaleString("pt-BR")}
        icon={WalletCards}
      />
      <SummaryCard
        label="Receitas nesta página"
        value={formatCurrency(income)}
        icon={ArrowUp}
        color="income"
      />
      <SummaryCard
        label="Despesas nesta página"
        value={formatCurrency(expenses)}
        icon={ArrowDown}
        color="expense"
      />
    </section>
  );
}

interface SummaryCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  color?: "default" | "income" | "expense";
}

function SummaryCard({
  label,
  value,
  icon: Icon,
  color = "default",
}: SummaryCardProps) {
  const colors = {
    default: "bg-primary/10 text-primary",
    income: "bg-emerald-500/10 text-emerald-500",
    expense: "bg-red-500/10 text-red-400",
  };

  return (
    <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-5">
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-2 text-2xl font-bold">{value}</p>
      </div>
      <div className={`rounded-xl p-3 ${colors[color]}`}>
        <Icon size={24} />
      </div>
    </div>
  );
}
