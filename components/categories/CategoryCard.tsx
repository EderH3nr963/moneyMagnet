"use client";

import type { MouseEvent } from "react";

import { DynamicIcon } from "@/components/dashboard/DynamicIcon";
import type { Category } from "@/types/api";

interface CategoryCardProps {
  category: Category;
  onContextMenu: (event: MouseEvent<HTMLElement>, category: Category) => void;
}

export default function CategoryCard({
  category,
  onContextMenu,
}: CategoryCardProps) {
  const color = category.color || "#10b981";

  return (
    <article
      onContextMenu={(event) => onContextMenu(event, category)}
      className="min-w-0 rounded-xl border border-border p-4 transition duration-300 hover:scale-[101%] hover:border-primary/60"
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${color}20`, color }}
        >
          <DynamicIcon name={category.icon} size={24} />
        </div>
        <div className="min-w-0">
          <h3 className="truncate font-semibold">{category.name}</h3>
          <p className="truncate text-sm text-muted-foreground">
            {category.icon || "Sem icone"}
          </p>
        </div>
      </div>
      <div className="mt-4 flex min-w-0 items-center gap-2 text-xs text-muted-foreground">
        <span
          className="h-3 w-3 shrink-0 rounded-full border border-border"
          style={{ backgroundColor: color }}
        />
        <span className="min-w-0 truncate">{color}</span>
      </div>
    </article>
  );
}
