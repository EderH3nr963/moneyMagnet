import { ArrowDown, ArrowUp, Wallet } from "lucide-react";

import type { DashboardResponse } from "@/types/api";
import SummaryCard from "./SummaryCard";
import { formatMetric } from "./dashboard-formatters";

interface DashboardSummaryProps {
  summary: DashboardResponse["summary"];
}

export default function DashboardSummary({ summary }: DashboardSummaryProps) {
  const totalBalance = formatMetric(summary.totalBalance);
  const income = formatMetric(summary.income);
  const expenses = formatMetric(summary.expenses);

  return (
    <section className="mx-4 mt-4 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <SummaryCard title="Saldo total" icon={Wallet} {...totalBalance} />
      <SummaryCard
        title="Receitas"
        icon={ArrowUp}
        variant="income"
        {...income}
      />
      <SummaryCard
        title="Despesas"
        icon={ArrowDown}
        variant="expense"
        {...expenses}
      />
    </section>
  );
}
