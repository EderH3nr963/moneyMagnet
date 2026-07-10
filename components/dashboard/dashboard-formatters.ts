import type { DashboardMetric } from "@/types/api";

export const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export const shortDateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
});

export const accountTypeLabels: Record<string, string> = {
  CHECKING: "Conta corrente",
  SAVINGS: "Poupança",
  CREDIT: "Crédito",
  LOAN: "Empréstimo",
  INVESTMENT: "Investimento",
  WALLET: "Carteira",
  PREPAID: "Pré-paga",
  OTHER: "Outra",
};

export function formatMetric(metric: DashboardMetric) {
  return {
    value: currencyFormatter.format(metric.amount),
    percentage: `${Math.abs(metric.percentageChange).toLocaleString("pt-BR", {
      maximumFractionDigits: 1,
    })}%`,
    positive: metric.percentageChange >= 0,
  };
}
