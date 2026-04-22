import { useTheme } from "@/lib/theme";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isLight = theme === "light";
  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:text-accent"
    >
      {isLight ? <Moon size={15} strokeWidth={1.75} /> : <Sun size={15} strokeWidth={1.75} />}
    </button>
  );
}
