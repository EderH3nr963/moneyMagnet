export function formatCurrency(value: number): string {
  return `R$${value.toLocaleString("pt-BR")}`;
}
