import { Menu, RefreshCw } from "lucide-react";

interface InstitutionsHeaderProps {
  totalInstitutions: number;
  loading: boolean;
  onOpenMenu: () => void;
  onRefresh: () => void;
}

export default function InstitutionsHeader({
  totalInstitutions,
  loading,
  onOpenMenu,
  onRefresh,
}: InstitutionsHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-3 border-b border-border px-4 py-4">
      <div className="min-w-0">
        <h1 className="truncate text-2xl font-semibold">Instituicoes</h1>
        <p className="text-sm text-muted-foreground">
          {totalInstitutions.toLocaleString("pt-BR")} instituicao(oes)
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={onRefresh}
          disabled={loading}
          aria-label="Atualizar instituicoes"
          className="rounded-lg p-2 transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
        </button>
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Abrir menu"
          className="rounded-lg p-2 hover:bg-muted lg:hidden"
        >
          <Menu size={22} />
        </button>
      </div>
    </header>
  );
}
