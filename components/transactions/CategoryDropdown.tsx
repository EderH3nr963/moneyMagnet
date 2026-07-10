"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

import type { Category } from "@/types/api";

interface CategoryDropdownProps {
  categories: Category[];
  value: Category | null;
  disabled?: boolean;
  onChange: (categoryId: string) => void;
}

export default function CategoryDropdown({
  categories,
  value,
  disabled = false,
  onChange,
}: CategoryDropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selectedColor = value?.color || "#71717a";

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  function selectCategory(categoryId: string) {
    onChange(categoryId);
    setOpen(false);
  }

  return (
    <div ref={rootRef} className="relative w-full min-[420px]:w-48 min-[420px]:max-w-full">
      <button
        type="button"
        disabled={disabled || !categories.length}
        onClick={() => setOpen((current) => !current)}
        className="flex h-9 w-full items-center justify-between gap-2 rounded-lg border border-border bg-background px-3 text-left text-sm transition hover:border-primary/70 disabled:cursor-not-allowed disabled:opacity-50"
        aria-expanded={open}
      >
        <span className="flex min-w-0 items-center gap-2">
          <span
            className="h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: selectedColor }}
          />
          <span className="truncate">
            {value?.name || "Sem categoria"}
          </span>
        </span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-muted-foreground transition ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-10 z-40 max-h-72 w-[min(16rem,calc(100vw-2rem))] overflow-y-auto rounded-lg border border-border bg-card p-1 shadow-xl min-[420px]:w-64">
          {categories.map((category) => {
            const active = category.id === value?.id;
            const color = category.color || "#71717a";

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => selectCategory(category.id)}
                className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition hover:bg-muted ${
                  active ? "bg-muted text-foreground" : "text-muted-foreground"
                }`}
              >
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="min-w-0 flex-1 truncate">{category.name}</span>
                {active && <Check size={16} className="shrink-0 text-primary" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
