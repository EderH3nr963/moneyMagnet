"use client";

import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

type SidebarContextType = {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export function SidebarProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setOpen] = useState(false);

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        setOpen,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error(
      "useSidebar deve ser usado dentro de um SidebarProvider"
    );
  }

  return context;
}