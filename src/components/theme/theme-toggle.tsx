"use client";

import { Moon, Sun } from "lucide-react";
import { useCallback, useEffect, useSyncExternalStore } from "react";

import { cn } from "@/lib/utils";

import { THEME_STORAGE_KEY } from "./theme-constants";

type ResolvedTheme = "light" | "dark";

const DARK_QUERY = "(prefers-color-scheme: dark)";
const listeners = new Set<() => void>();

function readTheme(): ResolvedTheme {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

function setTheme(theme: ResolvedTheme) {
  document.documentElement.setAttribute("data-theme", theme);
  listeners.forEach((listener) => listener());
}

function hasStoredPreference() {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === "light" || value === "dark";
  } catch {
    return false;
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Açık/koyu tema geçişi. Kullanıcı seçim yapana kadar sistem teması izlenir. */
export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, readTheme, () => "light" as const);

  useEffect(() => {
    const media = matchMedia(DARK_QUERY);
    const onChange = () => {
      if (!hasStoredPreference()) setTheme(media.matches ? "dark" : "light");
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const toggle = useCallback(() => {
    const next: ResolvedTheme = readTheme() === "dark" ? "light" : "dark";
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Depolama kapalıysa tema yalnızca bu sayfada değişir.
    }
    setTheme(next);
  }, []);

  const isDark = theme === "dark";
  const Icon = isDark ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Açık temaya geç" : "Koyu temaya geç"}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-md border border-neutral-200 text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground dark:border-neutral-800",
        className,
      )}
    >
      <Icon className="size-4" aria-hidden />
    </button>
  );
}
