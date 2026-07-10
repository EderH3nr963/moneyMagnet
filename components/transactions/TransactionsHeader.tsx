import { Menu } from "lucide-react";

interface TransactionsHeaderProps {
  totalElements: number;
  onOpenMenu: () => void;
}

export default function TransactionsHeader({
  totalElements,
  onOpenMenu,
}: TransactionsHeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-border px-4 py-4">
      <div>
        <h1 className="text-2xl font-semibold">Transações</h1>
        <p className="text-sm text-muted-foreground">
          {totalElements.toLocaleString("pt-BR")} movimentações
        </p>
      </div>
      <div className="flex items-center gap-2">
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
