import { useEffect, useState, useCallback } from "react";

// Dark-first. "light" is the non-default (adds .light class to <html>).
type Theme = "dark" | "light";
const KEY = "ryskex-theme";

function read(): Theme {
  if (typeof window === "undefined") return "dark";
  const saved = window.localStorage.getItem(KEY) as Theme | null;
  return saved === "light" ? "light" : "dark";
}

function write(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("light", theme === "light");
  root.style.colorScheme = theme;
  window.localStorage.setItem(KEY, theme);
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => read());
  useEffect(() => { write(theme); }, [theme]);
  const toggle = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);
  return { theme, setTheme, toggle };
}
