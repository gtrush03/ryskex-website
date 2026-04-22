import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE_OUT_SOFT } from "@/motion/constants";

const SESSION_KEY = "ryskex-intro-played";
const DURATION_MS = 600;
const REDUCED_DURATION_MS = 280;

export default function Intro() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return sessionStorage.getItem(SESSION_KEY) !== "1";
    } catch {
      return true;
    }
  });
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (!visible) return;
    const dismiss = () => {
      try { sessionStorage.setItem(SESSION_KEY, "1"); } catch {}
      setVisible(false);
    };
    const duration = reduce ? REDUCED_DURATION_MS : DURATION_MS;
    timers.current.push(window.setTimeout(dismiss, duration));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") dismiss();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [visible, reduce]);

  const skip = () => {
    try { sessionStorage.setItem(SESSION_KEY, "1"); } catch {}
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          role="dialog"
          aria-label="RYSKEX intro"
          aria-modal="true"
          onClick={skip}
          className="fixed inset-0 z-[100] flex cursor-pointer items-center justify-center overflow-hidden bg-[#040711]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03, filter: "blur(6px)" }}
          transition={{ duration: reduce ? 0.18 : 0.26, ease: EASE_OUT_SOFT }}
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          {/* Deep radial cobalt bloom — cinematic backdrop */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 55% 40% at 50% 50%, rgba(59,114,222,0.45) 0%, rgba(59,114,222,0.12) 35%, transparent 65%)",
            }}
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduce ? 0.2 : 0.34, ease: EASE_OUT_SOFT }}
          />

          {/* Fine grid texture for depth — fades with the bloom */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
              maskImage:
                "radial-gradient(ellipse 60% 45% at 50% 50%, black 0%, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 60% 45% at 50% 50%, black 0%, transparent 75%)",
              opacity: 0.08,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.08 }}
            transition={{ duration: reduce ? 0.15 : 0.3, ease: EASE_OUT_SOFT }}
          />

          {/* Tight logo halo — white lift behind the dark-on-light logo */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute"
            style={{
              width: 360,
              height: 120,
              background:
                "radial-gradient(55% 90% at 50% 50%, rgba(255,255,255,0.22) 0%, rgba(122,167,246,0.10) 45%, transparent 75%)",
              filter: "blur(18px)",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduce ? 0.18 : 0.32, ease: EASE_OUT_SOFT }}
          />

          {/* The logo — centered, slightly larger than header for presence */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-3"
            initial={{ opacity: 0, scale: 1.08, filter: reduce ? "blur(0px)" : "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: reduce ? 0.22 : 0.38, ease: EASE_OUT_SOFT }}
          >
            <img
              src="/riskex-logo.svg"
              alt="RYSKEX"
              width={420}
              height={84}
              className="block h-12 w-auto select-none invert md:h-16"
              draggable={false}
              style={{ filter: "drop-shadow(0 2px 24px rgba(59,114,222,0.45))" }}
            />

            {/* Cobalt→green hairline signature */}
            {!reduce && (
              <motion.div
                aria-hidden
                className="h-px w-28 md:w-40"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, #3B72DE 35%, #2EC46E 65%, transparent 100%)",
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 0.8 }}
                transition={{ duration: 0.28, delay: 0.22, ease: EASE_OUT_SOFT }}
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
