import type { LucideIcon } from "lucide-react";

interface SettingsSectionTitleProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function SettingsSectionTitle({
  icon: Icon,
  title,
  description,
}: SettingsSectionTitleProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon size={20} />
      </div>
      <div>
        <h2 className="font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
