import Image from "next/image";
import Link from "next/link";
import { Building2, Search } from "lucide-react";

import {
  accountTypeLabels,
  currencyFormatter,
} from "@/components/dashboard/dashboard-formatters";
import type { InstitutionGroup } from "@/hooks/useInstitutions";
import type { Account } from "@/types/api";

interface InstitutionsListProps {
  institutions: InstitutionGroup[];
  search: string;
  loading: boolean;
  onSearchChange: (value: string) => void;
}

export default function InstitutionsList({
  institutions,
  search,
  loading,
  onSearchChange,
}: InstitutionsListProps) {
  return (
    <section className="m-3 min-w-0 rounded-xl border border-border bg-card sm:m-4 sm:rounded-2xl">
      <div className="flex flex-col gap-3 border-b border-border p-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-semibold">Instituicoes conectadas</h2>
          <p className="text-sm text-muted-foreground">
            {institutions.length.toLocaleString("pt-BR")} resultado(s)
          </p>
        </div>
        <label className="relative w-full md:max-w-xs">
          <Search
            size={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Buscar"
            className="h-10 w-full rounded-lg border border-border bg-background pl-10 pr-3 text-sm outline-none transition focus:border-primary"
          />
        </label>
      </div>

      {loading ? (
        <div className="grid gap-4 p-4 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-48 animate-pulse rounded-xl border border-border bg-muted/30"
            />
          ))}
        </div>
      ) : institutions.length ? (
        <div className="grid gap-3 p-3 sm:gap-4 sm:p-4 xl:grid-cols-2">
          {institutions.map((institution) => (
            <Link
              key={institution.id}
              href={`/banks/${institution.id}`}
              className="block rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <InstitutionCard institution={institution} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex min-h-80 flex-col items-center justify-center px-4 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Building2 size={24} />
          </div>
          <h3 className="font-semibold">Nenhuma instituicao encontrada</h3>
          <p className="mt-1 max-w-md text-sm text-muted-foreground">
            As instituicoes aparecem aqui quando existem contas conectadas.
          </p>
        </div>
      )}
    </section>
  );
}

function InstitutionCard({ institution }: { institution: InstitutionGroup }) {
  return (
    <article className="min-w-0 rounded-xl border border-border p-4 transition duration-300 hover:border-primary/60 hover:scale-[101%]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <InstitutionLogo
            name={institution.name}
            logoUrl={institution.logoUrl}
          />
          <div className="min-w-0">
            <h3 className="truncate font-semibold">{institution.name}</h3>
            <p className="text-sm text-muted-foreground">
              {institution.accounts.length.toLocaleString("pt-BR")} conta(s)
            </p>
          </div>
        </div>
        <div className="min-w-0 sm:shrink-0 sm:text-right">
          <p className="text-xs text-muted-foreground">Saldo</p>
          <p className="break-words-word font-semibold">
            {currencyFormatter.format(institution.totalBalance)}
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {institution.accounts.map((account) => (
          <AccountRow key={account.id} account={account} />
        ))}
      </div>
    </article>
  );
}

function AccountRow({ account }: { account: Account }) {
  return (
    <div className="flex flex-col gap-2 rounded-lg bg-muted/30 px-3 py-3 min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-between min-[420px]:gap-4">
      <div className="min-w-0 not-lg:max-w-60">
        <p className="truncate text-sm font-medium">{account.name}</p>
        <p className="truncate text-xs text-muted-foreground">
          {accountTypeLabels[account.type] ?? account.type}
          {account.number ? ` - ${account.number}` : ""}
        </p>
      </div>
      <span className="break-words-word text-sm font-semibold min-[420px]:shrink-0">
        {currencyFormatter.format(account.balance)}
      </span>
    </div>
  );
}

function InstitutionLogo({
  name,
  logoUrl,
}: {
  name: string;
  logoUrl: string | null;
}) {
  if (logoUrl) {
    return (
      <Image
        src={logoUrl}
        alt={name}
        width={44}
        height={44}
        className="h-11 w-11 shrink-0 rounded-lg object-contain"
        draggable={false}
      />
    );
  }

  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
      <Building2 size={22} />
    </div>
  );
}
