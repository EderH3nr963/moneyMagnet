import { Building2, CreditCard, Landmark, WalletCards } from "lucide-react";

import { currencyFormatter } from "@/components/dashboard/dashboard-formatters";

interface InstitutionsSummaryProps {
  institutions: number;
  accounts: number;
  balance: number;
  creditLimit: number;
}

export default function InstitutionsSummary({
  institutions,
  accounts,
  balance,
  creditLimit,
}: InstitutionsSummaryProps) {
  const items = [
    {
      label: "Instituicoes",
      value: institutions.toLocaleString("pt-BR"),
      icon: Landmark,
    },
    {
      label: "Contas",
      value: accounts.toLocaleString("pt-BR"),
      icon: WalletCards,
    },
    {
      label: "Saldo",
      value: currencyFormatter.format(balance),
      icon: Building2,
    },
    {
      label: "Limite Total",
      value: currencyFormatter.format(creditLimit),
      icon: CreditCard,
    },
  ];

  return (
    <section className="m-3 grid gap-3 sm:m-4 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className="min-w-0 rounded-xl border border-border bg-card p-4 sm:rounded-2xl"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon size={20} />
              </div>
            </div>
            <p className="mt-3 break-words text-lg font-semibold sm:text-xl">
              {item.value}
            </p>
          </div>
        );
      })}
    </section>
  );
}
