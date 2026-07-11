"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Tags,
  Settings,
  Building2,
} from "lucide-react";
import Image from "next/image";

import Logo from "@/images/logo.png";
import { useSidebar } from "@/context/SidebarContext";

const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Transações",
    href: "/transactions",
    icon: ArrowLeftRight,
  },
  {
    title: "Instituições",
    href: "/banks",
    icon: Building2,
  },
  {
    title: "Categorias",
    href: "/categories",
    icon: Tags,
  }
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isOpen, setOpen } = useSidebar();

  if (pathname === "/auth" || pathname.startsWith("/auth/")) {
    return;
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
      fixed left-0 top-0 z-50 h-full w-72 shrink-0
      bg-card border-r border-border
      transition-transform duration-300

      lg:translate-x-0 lg:flex lg:h-screen lg:sticky

      ${isOpen ? "translate-x-0" : "-translate-x-full"}
    `}
      >        <div className=" w-full">
          <div className="flex h-20 items-center px-8">
            <Image src={Logo} alt="Logo da MoneyMagnet" className="w-10 h-10 rounded-lg" draggable={false} />

            <div className="ml-4">
              <h1 className="text-lg font-bold">MoneyMagnet</h1>
              <p className="text-sm text-muted-foreground">
                Gestão Financeira
              </p>
            </div>
          </div>

          <nav className="flex-1 space-y-2 p-5 relative">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href || pathname.startsWith(item.href + "/");

              return (
                <div key={item.href} className="relative">
                  {/* Barrinha fora do botão */}
                  {active && (
                    <span className="absolute -left-5 top-1/2 -translate-y-1/2 h-10 w-1 rounded-r-lg bg-emerald-500" />
                  )}

                  <Link
                    href={item.href}
                    className={`
                  group flex items-center gap-4 rounded-xl px-4 py-3
                  transition-all duration-200 group
                  ${active
                        ? "bg-emerald-500/15 text-emerald-500"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }
                `}
                  >
                    <Icon size={20} className="transition-transform group-hover:scale-110" />
                    <span className="font-medium">{item.title}</span>
                  </Link>
                </div>
              );
            })}
          </nav>

          <div className="border-t border-border p-5">
            <div className="relative">
              {(pathname === "/settings" ||
                pathname.startsWith("/settings/")) && (
                  <span className="absolute -left-5 top-1/2 h-10 w-1 -translate-y-1/2 rounded-r-lg bg-emerald-500" />
                )}

              <Link
                href="/settings"
                className={`group flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 ${pathname === "/settings" ||
                  pathname.startsWith("/settings/")
                  ? "bg-emerald-500/15 text-emerald-500"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
              >
                <Settings
                  size={20}
                  className="transition-transform group-hover:scale-110"
                />

                <span className="font-medium">Configurações</span>
              </Link>
            </div>
          </div>
        </div>

      </aside>
    </>
  );
}
