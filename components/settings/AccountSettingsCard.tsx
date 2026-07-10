"use client";

import { LogOut, Trash2 } from "lucide-react";

import type { User } from "@/types/api";
import SettingsSectionTitle from "./SettingsSectionTitle";

interface AccountSettingsCardProps {
  user: User | null;
  deleteConfirmation: string;
  canDelete: boolean;
  deleting: boolean;
  onDeleteConfirmationChange: (value: string) => void;
  onLogout: () => void;
  onDeleteAccount: () => void;
}

export default function AccountSettingsCard({
  user,
  deleteConfirmation,
  canDelete,
  deleting,
  onDeleteConfirmationChange,
  onLogout,
  onDeleteAccount,
}: AccountSettingsCardProps) {
  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <SettingsSectionTitle
        icon={Trash2}
        title="Conta"
        description="Sair ou remover sua conta."
      />
      <div className="mt-5 grid gap-4">
        <div className="rounded-lg border border-border bg-background p-4">
          <p className="font-medium">{user?.username || "Usuario"}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {user?.email || "Carregando..."}
          </p>
          <button
            type="button"
            onClick={onLogout}
            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm transition hover:bg-muted"
          >
            <LogOut size={16} />
            Sair da conta
          </button>
        </div>

        <div className="rounded-lg border border-red-500/25 bg-red-500/5 p-4">
          <p className="font-medium text-red-400">Deletar conta</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Digite DELETAR para confirmar a remocao da sua conta.
          </p>
          <input
            value={deleteConfirmation}
            onChange={(event) => onDeleteConfirmationChange(event.target.value)}
            disabled={deleting}
            className="mt-3 h-10 w-full rounded-lg border border-border bg-background px-3 outline-none transition focus:border-red-400 disabled:opacity-60"
          />
          <button
            type="button"
            onClick={onDeleteAccount}
            disabled={!canDelete || deleting}
            className="mt-3 inline-flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2 size={16} />
            {deleting ? "Deletando..." : "Deletar minha conta"}
          </button>
        </div>
      </div>
    </section>
  );
}
