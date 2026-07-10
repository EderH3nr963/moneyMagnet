"use client";

import { MonitorCog, Moon, Sun } from "lucide-react";

import SettingsSectionTitle from "./SettingsSectionTitle";

interface AppearanceSettingsCardProps {
  theme: "light" | "dark";
  saving: boolean;
  onThemeChange: (theme: "light" | "dark") => void;
}

export default function AppearanceSettingsCard({
  theme,
  saving,
  onThemeChange,
}: AppearanceSettingsCardProps) {
  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <SettingsSectionTitle
        icon={MonitorCog}
        title="Aparencia"
        description="Escolha como o app deve aparecer."
      />
      <div className="mt-5 grid grid-cols-2 gap-2 rounded-xl border border-border bg-background p-1">
        <ThemeButton
          active={theme === "light"}
          icon={Sun}
          label="Claro"
          disabled={saving}
          onClick={() => onThemeChange("light")}
        />
        <ThemeButton
          active={theme === "dark"}
          icon={Moon}
          label="Escuro"
          disabled={saving}
          onClick={() => onThemeChange("dark")}
        />
      </div>
    </section>
  );
}

function ThemeButton({
  active,
  icon: Icon,
  label,
  disabled,
  onClick,
}: {
  active: boolean;
  icon: typeof Sun;
  label: string;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex h-10 items-center justify-center gap-2 rounded-lg text-sm font-medium transition disabled:opacity-50 ${
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
    >
      <Icon size={16} />
      {label}
    </button>
  );
}
