"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, CreditCard, Landmark, Menu, Wallet } from "lucide-react";

import TransactionsHistory from "@/components/transactions/TransactionsHistory";
import {
  accountTypeLabels,
  currencyFormatter,
} from "@/components/dashboard/dashboard-formatters";
import { useSidebar } from "@/context/SidebarContext";
import {
  InstitutionAccountType,
  useInstitutionProfile,
} from "@/hooks/useInstitutionProfile";
import AccountSummary from "@/components/institutions/AccountSummary";
import ProfileMetric from "@/components/institutions/ProfileMetric";
import InstitutionAvatar from "@/components/institutions/InstitutionAvatar";
import { useCategories } from "@/hooks/useCategories";

const TABS: Array<{
  value: InstitutionAccountType;
  label: string;
  icon: typeof Wallet;
}> = [
  { value: "CHECKING", label: "Corrente", icon: Wallet },
  { value: "SAVINGS", label: "Poupanca", icon: Landmark },
  { value: "CREDIT", label: "Credito", icon: CreditCard },
];

export default function InstitutionProfilePage() {
  const params = useParams<{ institutionId: string }>();
  const router = useRouter();
  const { setOpen } = useSidebar();
  const {
    profile,
    transactionsPage,
    accountType,
    page,
    size,
    loadingProfile,
    loadingTransactions,
    error,
    changeAccountType,
    changeTransactionCategory,
    changePage,
    changePageSize,
  } = useInstitutionProfile(params.institutionId);
  const {
    categories,
    loading: loadingCategories,
    error: categoriesError,
  } = useCategories();

  const accountsByType = profile?.accounts.filter(
    (account) => account.type === accountType,
  ) ?? [];
  const totalBalance = accountsByType.reduce(
    (total, account) => total + (account.balance ?? 0),
    0,
  );

  const primaryColor = profile?.primaryColor ? `#${profile?.primaryColor}` : "#10B981";

  return (
    <main className="w-full max-w-full overflow-x-hidden">
      <header className="flex items-center justify-between gap-3 border-b border-border px-4 py-4">
        <button
          type="button"
          onClick={() => router.push("/institutions")}
          className="inline-flex min-w-0 items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm transition hover:bg-muted"
        >
          <ArrowLeft size={16} />
          Voltar
        </button>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Abrir menu"
          className="rounded-lg p-2 hover:bg-muted lg:hidden"
        >
          <Menu size={22} />
        </button>
      </header>

      {error && (
        <div
          role="alert"
          className="mx-4 mt-4 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-400"
        >
          {error}
        </div>
      )}

      {categoriesError && (
        <div
          role="alert"
          className="mx-4 mt-4 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-400"
        >
          {categoriesError}
        </div>
      )}

      <section className="m-3 overflow-hidden rounded-xl border border-border bg-card sm:m-4 sm:rounded-2xl">
        <div
          className="h-36"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}55)`,
          }}
        />
        <div className="px-4 pb-5 sm:px-5">
          <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex min-w-0 items-end gap-3 sm:gap-4">
              <InstitutionAvatar
                name={profile?.name ?? "Instituicao"}
                logoUrl={profile?.logoUrl ?? null}
              />
              <div className="min-w-0 pt-1">
                <p className="text-sm text-muted-foreground">Instituicao</p>
                <h1 className="truncate text-xl font-semibold sm:text-2xl">
                  {loadingProfile ? "Carregando..." : profile?.name}
                </h1>
              </div>
            </div>
            <div className="grid w-full grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:w-auto sm:min-w-80">
              <ProfileMetric
                label="Contas"
                value={(profile?.accounts.length ?? 0).toLocaleString("pt-BR")}
              />
              <ProfileMetric
                label="Saldo da aba"
                value={currencyFormatter.format(totalBalance)}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="m-3 rounded-xl border border-border bg-card p-3 sm:m-4 sm:rounded-2xl sm:p-4">
        <div className="flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const active = tab.value === accountType;

            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => changeAccountType(tab.value)}
                className={`inline-flex h-10 min-w-0 items-center gap-2 rounded-lg px-3 text-sm font-medium transition hover:cursor-pointer sm:px-4 ${
                  active
                    ? "text-primary-foreground"
                    : "border border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
                style={{
                  backgroundColor: active ? `${primaryColor}` : "transparent",
                }}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {accountsByType.length ? (
            accountsByType.map((account) => (
              <AccountSummary key={account.id} account={account} />
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              Nenhuma conta do tipo {accountTypeLabels[accountType]?.toLowerCase()}.
            </p>
          )}
        </div>
      </section>

      <TransactionsHistory
        transactionsPage={transactionsPage}
        categories={categories}
        page={page}
        size={size}
        loading={loadingTransactions || loadingCategories}
        updating={loadingTransactions}
        onCategoryChange={changeTransactionCategory}
        onPageChange={changePage}
        onPageSizeChange={changePageSize}
      />
    </main>
  );
}
