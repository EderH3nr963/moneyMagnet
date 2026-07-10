"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { WalletCards } from "lucide-react";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <main className="flex min-h-screen w-full items-center justify-center px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-xl">
        <div className="mb-8 flex items-center gap-3">
          <Link
            href="/auth/login"
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary transition hover:bg-primary/20"
            aria-label="Ir para login"
          >
            <WalletCards size={26} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">MoneyMagnet</h1>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>

        {children}

        {footer && (
          <div className="mt-6 border-t border-border pt-5 text-center text-sm text-muted-foreground">
            {footer}
          </div>
        )}
      </section>
    </main>
  );
}

