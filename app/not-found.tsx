// app/not-found.tsx

import Link from "next/link";
import Image from "next/image";

import NotFoundIcon from "@/icons/not_found_icon.svg";

export default function NotFound() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background px-6">
      <Image src={NotFoundIcon} alt="" className="h-[50vh] w-auto"/>

      <h1 className="mt-6 text-5xl font-bold text-foreground">
        Página não encontrada
      </h1>

      <p className="mt-4 max-w-md text-center text-muted-foreground">
        A página que você está procurando não existe ou foi movida.
      </p>

      <Link
        href="/"
        className="mt-8 rounded-xl bg-emerald-700 px-6 py-3 font-medium text-primary-foreground transition hover:opacity-90 duration-300 hover:scale-110"
      >
        Voltar para o Dashboard
      </Link>
    </main>
  );
}