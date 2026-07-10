import type { Transaction } from "@/types/api";

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export const transactionStatusLabels: Record<string, string> = {
  POSTED: "Efetivada",
  PENDING: "Pendente",
};

export function formatCurrency(amount: number, currency = "BRL") {
  try {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency,
    }).format(amount);
  } catch {
    return new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
    }).format(amount);
  }
}

export function formatTransactionDate(transaction: Transaction) {
  return dateFormatter.format(
    new Date(transaction.paymentDate ?? transaction.date),
  );
}

export function getTransactionTitle(transaction: Transaction) {
  return transaction.merchant || transaction.description || "Transação";
}
