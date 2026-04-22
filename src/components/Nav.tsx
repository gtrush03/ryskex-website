import { NavLink, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowRight } from "@/components/icons/brand";
import Wordmark from "./Wordmark";
import ThemeToggle from "./ThemeToggle";
import { nav } from "@/lib/data";
import { cn } from "@/lib/cn";

const DESKTOP_MIN = 768;

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hideOnScroll, setHide] = useState(false);
  const [open, setOpen] = useState(false);

  // Use refs for values that don't need to trigger re-renders.
  // This kills the scroll-event glitch — we only setState when the boolean
  // state actually flips, not on every scroll pixel.
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const isDesktop = () =>
      typeof window !== "undefined" &&
      window.matchMedia(`(min-width: ${DESKTOP_MIN}px)`).matches;

    const update = () => {
      const y = window.scrollY;
      const nextScrolled = y > 12;
      const nextHide = isDesktop() ? y > 240 && y > lastY.current : false;
      setScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));
      setHide((prev) => (prev === nextHide ? prev : nextHide));
      lastY.current = y;
      ticking.current = false;
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []); // mount only — refs carry the mutable state

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-0 z-[100] flex justify-center px-3 pt-3 transition-transform duration-300 motion-reduce:transition-none md:pt-4",
        hideOnScroll && "md:-translate-y-[110%]"
      )}
      style={{ transitionTimingFunction: "var(--ease)", willChange: "transform" }}
    >
      <header
        className={cn(
          "glass relative flex h-14 w-full max-w-[1080px] items-center justify-between rounded-full px-3 pr-2 transition-all duration-300 motion-reduce:transition-none md:h-[60px] md:px-6 md:pr-3",
          scrolled &&
            "md:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.65),0_0_0_1px_rgba(82,136,240,0.18)]",
          // Mobile pill shadow: drop + cobalt rim (both themes). White underglow
          // only reads on dark — gated via the light: variant below.
          scrolled &&
            "shadow-[0_8px_32px_-12px_rgba(0,0,0,0.55),0_0_0_1px_rgba(82,136,240,0.22),0_0_24px_-6px_rgba(255,255,255,0.18)]",
          scrolled &&
            "light:shadow-[0_8px_32px_-12px_rgba(0,0,0,0.18),0_0_0_1px_rgba(29,74,154,0.24)]"
        )}
        style={{
          background: scrolled
            ? "linear-gradient(180deg, var(--glass-top-highlight) 0%, var(--accent-soft) 100%), var(--glass-deep)"
            : undefined,
          backdropFilter: scrolled ? "blur(42px) saturate(1.5)" : undefined,
          WebkitBackdropFilter: scrolled ? "blur(42px) saturate(1.5)" : undefined,
          willChange: "background, box-shadow",
        }}
      >
        <Wordmark />

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 md:flex">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "relative text-[13px] font-medium text-muted transition-colors hover:text-text",
                  isActive && "text-text"
                )
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <span
                      aria-hidden
                      className="absolute -bottom-2 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-accent"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1 md:gap-2">
          <ThemeToggle />
          <Link
            to="/contact"
            className="hidden h-9 items-center gap-1.5 rounded-full bg-accent px-4 text-[12.5px] font-medium text-accent-fg transition-colors hover:bg-accent-hover md:inline-flex"
          >
            Request a cell
            <ArrowRight size={13} strokeWidth={2} />
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-muted transition-colors hover:text-text md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {open && (
        <div
          className="glass absolute left-3 right-3 top-[calc(100%+12px)] rounded-2xl p-4 shadow-[0_16px_48px_-16px_rgba(0,0,0,0.6),0_0_0_1px_var(--accent-ring)] md:hidden"
          style={{
            background:
              "linear-gradient(180deg, var(--glass-top-highlight) 0%, var(--accent-soft) 100%), var(--glass-deep)",
            backdropFilter: "blur(42px) saturate(1.5)",
            WebkitBackdropFilter: "blur(42px) saturate(1.5)",
          }}
        >
          <div className="flex flex-col">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center text-[15px] font-medium text-text"
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-accent text-[14px] font-medium text-accent-fg"
            >
              Request a cell
              <ArrowRight size={14} strokeWidth={2} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
