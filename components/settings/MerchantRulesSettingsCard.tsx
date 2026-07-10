"use client";

import { ReceiptText, Trash2 } from "lucide-react";

import type { MerchantCategoryRule } from "@/types/api";
import SettingsSectionTitle from "./SettingsSectionTitle";

interface MerchantRulesSettingsCardProps {
  rules: MerchantCategoryRule[];
  loading: boolean;
  deletingRuleId: string | null;
  onDeleteRule: (ruleId: string) => void;
}

export default function MerchantRulesSettingsCard({
  rules,
  loading,
  deletingRuleId,
  onDeleteRule,
}: MerchantRulesSettingsCardProps) {
  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <SettingsSectionTitle
        icon={ReceiptText}
        title="Regras por merchant"
        description="Veja e remova categorias automaticas por merchant."
      />

      <div className="mt-5 grid gap-3">
        {loading ? (
          <div className="grid gap-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-16 animate-pulse rounded-lg border border-border bg-muted/30"
              />
            ))}
          </div>
        ) : rules.length ? (
          rules.map((rule) => (
            <div
              key={rule.id}
              className="flex flex-col gap-3 rounded-lg border border-border bg-background p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <p className="truncate font-medium">{rule.merchant}</p>
                <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor: rule.category?.color || "#71717a",
                    }}
                  />
                  <span className="truncate">
                    {rule.category?.name || "Sem categoria"}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onDeleteRule(rule.id)}
                disabled={deletingRuleId === rule.id}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-500/25 px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
              >
                <Trash2 size={16} />
                {deletingRuleId === rule.id ? "Removendo..." : "Excluir"}
              </button>
            </div>
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-border p-5 text-sm text-muted-foreground">
            Nenhuma regra por merchant criada ainda.
          </div>
        )}
      </div>
    </section>
  );
}
