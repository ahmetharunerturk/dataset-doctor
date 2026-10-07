"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type Theme = "system" | "light" | "dark";
type ResolvedTheme = "light" | "dark";

const STORAGE_KEY = "theme";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

/** Tiny external store so setTheme never needs setState-in-effect (lint rule). */
const listeners = new Set<() => void>();
function subscribeThemeStore(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
function emitThemeStore() {
  listeners.forEach((listener) => listener());
}

/**
 * Read the value written by the pre-paint theme script (lib/theme-script.ts).
 * Anything other than the three known values falls back to "system".
 */
function readStoredTheme(): Theme {
  if (typeof window === "undefined") return "system";
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (value === "light" || value === "dark" || value === "system") return value;
  } catch {
    /* storage unavailable — fall through to system */
  }
  return "system";
}

function getThemeSnapshot(): Theme {
  return readStoredTheme();
}

function systemTheme(): ResolvedTheme {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function applyTheme(resolved: ResolvedTheme) {
  const root = document.documentElement;
  root.classList.toggle("light", resolved === "light");
  root.classList.toggle("dark", resolved === "dark");
  root.style.colorScheme = resolved;
}

/**
 * Minimal class-based theme context. The pre-paint script (next/script
 * beforeInteractive) has already applied the correct theme before first paint,
 * so this provider only keeps state in sync, follows the OS while on
 * "system", and exposes setTheme for the toggle. Replaces next-themes, whose
 * client-rendered inline script re-created its <script> host element in dev
 * and triggered the React script-tag console warning.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  // External store: SSR and the first client render agree on "system" (no icon
  // flash), then the client snapshot reads localStorage — the same hydration-
  // safe shape the toggle already uses, and no setState-in-effect.
  const theme = useSyncExternalStore(
    subscribeThemeStore,
    getThemeSnapshot,
    () => "system" as Theme,
  );

  // Follow the OS only while the user hasn't chosen an explicit theme. The
  // pre-paint init script already applied the class, so nothing updates state.
  useEffect(() => {
    if (theme !== "system") return;
    const mql = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => {
      if (readStoredTheme() === "system") {
        applyTheme(mql.matches ? "light" : "dark");
      }
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable — the in-memory choice still applies */
    }
    emitThemeStore();
    applyTheme(next === "light" || next === "dark" ? next : systemTheme());
  }, []);

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
}
