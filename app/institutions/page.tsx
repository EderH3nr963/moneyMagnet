"use client";

import InstitutionsHeader from "@/components/institutions/InstitutionsHeader";
import InstitutionsList from "@/components/institutions/InstitutionsList";
import InstitutionsSummary from "@/components/institutions/InstitutionsSummary";
import { useSidebar } from "@/context/SidebarContext";
import { useInstitutions } from "@/hooks/useInstitutions";

export default function InstitutionsPage() {
  const { setOpen } = useSidebar();
  const {
    institutions,
    totals,
    loading,
    error,
    search,
    setSearch,
    refresh,
  } = useInstitutions();

  return (
    <main className="w-full max-w-full overflow-x-hidden">
      <InstitutionsHeader
        totalInstitutions={totals.institutions}
        loading={loading}
        onOpenMenu={() => setOpen(true)}
        onRefresh={refresh}
      />

      {error && (
        <div
          role="alert"
          className="mx-4 mt-4 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-400"
        >
          {error}
        </div>
      )}

      <InstitutionsSummary
        institutions={totals.institutions}
        accounts={totals.accounts}
        balance={totals.balance}
        creditLimit={totals.creditLimit}
      />

      <InstitutionsList
        institutions={institutions}
        search={search}
        loading={loading}
        onSearchChange={setSearch}
      />
    </main>
  );
}
