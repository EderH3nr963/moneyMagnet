import Link from "next/link";
import {
  ArrowLeftRight,
  Building2,
  Landmark,
  LoaderCircle,
  Tags,
} from "lucide-react";

interface QuickActionsProps {
  onConnectBank: () => void;
  connectingBank?: boolean;
}

const quickActions = [
  {
    title: "Historico de transacoes",
    description: "Revise movimentacoes e ajuste categorias",
    href: "/transactions",
    icon: ArrowLeftRight,
  },
  {
    title: "Categorias",
    description: "Crie, edite e organize classificacoes",
    href: "/categories",
    icon: Tags,
  },
  {
    title: "Instituicoes",
    description: "Veja bancos, contas e cartoes conectados",
    href: "/institutions",
    icon: Building2,
  },
];

export default function QuickActions({
  onConnectBank,
  connectingBank = false,
}: QuickActionsProps) {
  return (
    <div className="grid gap-3">
      <button
        type="button"
        onClick={onConnectBank}
        disabled={connectingBank}
        className="group flex items-center gap-4 rounded-xl border border-primary/30 bg-primary/5 p-4 text-left transition-all duration-300 hover:cursor-pointer hover:border-primary hover:bg-primary/10 disabled:cursor-wait disabled:opacity-60"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-300 group-hover:-translate-y-1">
          {connectingBank ? (
            <LoaderCircle className="animate-spin" size={22} />
          ) : (
            <Landmark size={22} />
          )}
        </div>
        <div className="min-w-0">
          <h3 className="font-medium">
            {connectingBank ? "Preparando conexao..." : "Conectar banco"}
          </h3>
          <p className="text-sm text-muted-foreground">
            Sincronize uma nova instituicao financeira
          </p>
        </div>
      </button>

      {quickActions.map((action) => {
        const Icon = action.icon;

        return (
          <Link
            key={action.href}
            href={action.href}
            className="group flex items-center gap-4 rounded-xl border border-border p-4 transition-all duration-300 hover:border-primary hover:bg-accent"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-300 group-hover:-translate-y-1">
              <Icon size={22} />
            </div>
            <div className="min-w-0">
              <h3 className="font-medium">{action.title}</h3>
              <p className="text-sm text-muted-foreground">
                {action.description}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
