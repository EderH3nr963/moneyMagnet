import { Menu } from "lucide-react";

interface DashboardHeaderProps {
  onOpenMenu: () => void;
}

export default function DashboardHeader({ onOpenMenu }: DashboardHeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-border px-4 py-4">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>

      <button
        type="button"
        onClick={onOpenMenu}
        aria-label="Abrir menu"
        className="rounded-lg p-2 hover:bg-muted lg:hidden"
      >
        <Menu size={22} />
      </button>
    </header>
  );
}
