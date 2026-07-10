
import type { Account } from "@/types/api";
import {
  accountTypeLabels,
  currencyFormatter,
} from "../dashboard/dashboard-formatters";

export default function AccountSummary({ account }: { account: Account }) {
  return (
    <div className="min-w-0 rounded-xl border border-border bg-background p-4">
      <p className="truncate font-medium">{account.name}</p>
      <p className="mt-1 truncate text-xs text-muted-foreground">
        {account.number || accountTypeLabels[account.type] || account.type}
      </p>
      <p className="mt-3 break-words text-base font-semibold sm:text-lg">
        {currencyFormatter.format(account.balance)}
      </p>
    </div>
  );
}
