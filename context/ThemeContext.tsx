"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const USER_KEY = "money-magnet:user";

function normalizeTheme(theme?: string | null): Theme {
  return theme === "DARK" || theme === "dark" ? "dark" : "light";
}

function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "light";

  try {
    const user = JSON.parse(
      window.localStorage.getItem(USER_KEY) || "{}",
    ) as { theme?: string };

    return normalizeTheme(user.theme);
  } catch {
    return "light";
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    function syncTheme() {
      setThemeState(getStoredTheme());
    }

    void Promise.resolve().then(syncTheme);
  }, []);

  const value = useMemo(
    () => ({
      theme,
      setTheme(nextTheme: Theme) {
        setThemeState(nextTheme);
      },
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>
      <div
        data-theme={theme}
        className={`min-h-screen w-full bg-background text-foreground ${theme}  `}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme deve ser usado dentro de um ThemeProvider");
  }

  return context;
}
