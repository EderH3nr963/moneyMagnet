import { Building2 } from "lucide-react";
import Image from "next/image";

export default function InstitutionAvatar({
  name,
  logoUrl,
}: {
  name: string;
  logoUrl: string | null;
}) {
  if (logoUrl) {
    return (
      <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border border-border bg-card p-3 shadow-lg">
        <Image
          src={logoUrl}
          alt={name}
          width={72}
          height={72}
          className="h-full w-full object-contain"
          draggable={false}
        />
      </div>
    );
  }

  return (
    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border border-border bg-card text-primary shadow-lg">
      <Building2 size={40} />
    </div>
  );
}