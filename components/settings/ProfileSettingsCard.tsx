"use client";

import type { FormEvent } from "react";
import { Save, UserRound } from "lucide-react";

import SettingsSectionTitle from "./SettingsSectionTitle";

interface ProfileSettingsCardProps {
  username: string;
  email: string;
  loading: boolean;
  saving: boolean;
  onUsernameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function ProfileSettingsCard({
  username,
  email,
  loading,
  saving,
  onUsernameChange,
  onEmailChange,
  onSubmit,
}: ProfileSettingsCardProps) {
  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <SettingsSectionTitle
        icon={UserRound}
        title="Perfil"
        description="Atualize seus dados principais."
      />
      <form onSubmit={onSubmit} className="mt-5 grid gap-4">
        <label className="grid gap-2 text-sm">
          Nome de usuario
          <input
            value={username}
            onChange={(event) => onUsernameChange(event.target.value)}
            minLength={3}
            maxLength={17}
            required
            disabled={loading || saving}
            className="h-10 rounded-lg border border-border bg-background px-3 outline-none transition focus:border-primary disabled:opacity-60"
          />
        </label>
        <label className="grid gap-2 text-sm">
          Email
          <input
            value={email}
            onChange={(event) => onEmailChange(event.target.value)}
            type="email"
            required
            disabled={loading || saving}
            className="h-10 rounded-lg border border-border bg-background px-3 outline-none transition focus:border-primary disabled:opacity-60"
          />
        </label>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading || saving}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
          >
            <Save size={16} />
            {saving ? "Salvando..." : "Salvar perfil"}
          </button>
        </div>
      </form>
    </section>
  );
}
