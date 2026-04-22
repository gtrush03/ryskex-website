import { useTheme } from "@/lib/theme";
import { Sun, Moon } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isLight = theme === "light";
  const reduced = useReducedMotion();

  // Icon swap: cross-fade with a small rotation so the change reads
  // as a deliberate transition instead of a pop. Disabled under
  // prefers-reduced-motion (the AnimatePresence below honors it too).
  const spring = reduced
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 520, damping: 28, mass: 0.6 };

  return (
    <button
      onClick={toggle}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      aria-pressed={isLight}
      type="button"
      className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full text-muted transition-colors hover:text-accent"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isLight ? "moon" : "sun"}
          initial={reduced ? { opacity: 0 } : { opacity: 0, rotate: -35, scale: 0.7 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, rotate: 0, scale: 1 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, rotate: 35, scale: 0.7 }}
          transition={spring}
          className="inline-flex"
          aria-hidden
        >
          {isLight ? (
            <Moon size={15} strokeWidth={1.75} />
          ) : (
            <Sun size={15} strokeWidth={1.75} />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
