import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE_OUT_SOFT } from "@/motion/constants";

const SESSION_KEY = "ryskex-intro-played";
const DURATION_MS = 900;
const REDUCED_DURATION_MS = 350;

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
          className="fixed inset-0 z-[100] cursor-pointer overflow-hidden bg-[#040711]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.15 : 0.28, ease: EASE_OUT_SOFT }}
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          {/* Soft cobalt halo behind the logo — ties the logo to the header's pill glow */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute"
            style={{
              top: 28,
              left: 24,
              width: 200,
              height: 72,
              background:
                "radial-gradient(60% 140% at 50% 50%, rgba(59,114,222,0.45) 0%, rgba(59,114,222,0.12) 45%, transparent 75%)",
              filter: "blur(14px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduce ? 0.1 : 0.25, ease: EASE_OUT_SOFT }}
          />

          {/* The header logo — matches Wordmark's inverted styling + position */}
          <motion.div
            className="absolute"
            style={{ top: 44, left: 28 }}
            initial={{ opacity: 0, x: reduce ? 0 : -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: reduce ? 0.2 : 0.42, ease: EASE_OUT_SOFT }}
          >
            <img
              src="/riskex-logo.svg"
              alt="RYSKEX"
              width={240}
              height={48}
              className="block h-7 w-auto select-none invert md:h-8"
              draggable={false}
            />
          </motion.div>

          {/* Hairline cobalt sweep — subtle motion cue */}
          {!reduce && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute"
              style={{
                top: 84,
                left: 28,
                height: 1,
                width: 140,
                background:
                  "linear-gradient(90deg, #3B72DE 0%, #2EC46E 60%, transparent 100%)",
                transformOrigin: "left center",
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.7 }}
              transition={{ duration: 0.4, delay: 0.18, ease: EASE_OUT_SOFT }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
