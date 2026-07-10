import Image from "next/image";
import { Building2 } from "lucide-react";

import type { Account } from "@/types/api";
import { accountTypeLabels, currencyFormatter } from "./dashboard-formatters";

interface LinkedAccountsCardProps {
  accounts: Account[];
}

export default function LinkedAccountsCard({
  accounts,
}: LinkedAccountsCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="mb-4 flex items-center gap-2">
        <Building2 className="text-primary" size={20} />
        <h2 className="font-semibold">Contas vinculadas</h2>
      </div>

      <div className="max-h-131 space-y-3 overflow-y-auto pr-2">
        {accounts.length ? (
          accounts.slice(0, 7).map((account) => (
            <LinkedAccountItem key={account.id} account={account} />
          ))
        ) : (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Nenhuma conta vinculada.
          </p>
        )}
      </div>
    </div>
  );
}

function LinkedAccountItem({ account }: { account: Account }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-border p-4">
      <div className="min-h-11 min-w-11">
        {account.institutionLogoUrl ? (
          <Image
            src={account.institutionLogoUrl}
            alt={account.name}
            width={44}
            height={44}
            className="select-none"
            draggable={false}
          />
        ) : (
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Building2 size={22} />
          </div>
        )}
      </div>

      <div className="flex min-w-0 w-full flex-col">
        <p className="truncate font-medium">{account.name}</p>
        <p className="truncate text-xs text-muted-foreground">
          {account.institutionName} ·{" "}
          {accountTypeLabels[account.type] ?? account.type}
        </p>
      </div>

      <span className="shrink-0 text-sm font-semibold">
        {currencyFormatter.format(account.balance)}
      </span>
    </div>
  );
}
