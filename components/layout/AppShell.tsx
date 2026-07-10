"use client";

import type { ReactNode } from "react";

import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import Sidebar from "./Sidebar";

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <Sidebar />
          <div className="min-w-0 flex-1 overflow-x-hidden">{children}</div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
