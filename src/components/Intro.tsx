import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE_OUT_SOFT, EASE_IN_OUT } from "@/motion/constants";

const SESSION_KEY = "ryskex-intro-played";

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
    const duration = reduce ? 900 : 3200;
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
          aria-label="RYSKEX intro animation"
          aria-modal="true"
          onClick={skip}
          className="fixed inset-0 z-[100] flex cursor-pointer items-center justify-center overflow-hidden bg-[#040711]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }}
          transition={{ duration: reduce ? 0.35 : 0.7, ease: EASE_OUT_SOFT }}
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          {/* Deep radial cobalt glow — the "event horizon" the site emerges from */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 45% at 50% 50%, rgba(59,114,222,0.35) 0%, rgba(59,114,222,0.08) 40%, transparent 70%)",
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduce ? 0.3 : 1.1, ease: EASE_OUT_SOFT }}
          />

          {/* Ambient noise + grid texture for depth */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
              maskImage:
                "radial-gradient(ellipse 70% 55% at 50% 50%, black 0%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 55% at 50% 50%, black 0%, transparent 80%)",
            }}
          />

          {/* Orbital rings — draw-in from the brand mark */}
          <svg
            aria-hidden
            viewBox="0 0 800 800"
            className="pointer-events-none absolute h-[min(90vw,720px)] w-[min(90vw,720px)]"
          >
            <defs>
              <linearGradient id="intro-ring" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#3B72DE" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#7AA7F6" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#2EC46E" stopOpacity="0.6" />
              </linearGradient>
              <radialGradient id="intro-core" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                <stop offset="45%" stopColor="#7AA7F6" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#3B72DE" stopOpacity="0" />
              </radialGradient>
              <filter id="intro-glow">
                <feGaussianBlur stdDeviation="6" />
              </filter>
            </defs>

            {[1, 2, 3].map((i) => (
              <motion.circle
                key={i}
                cx={400}
                cy={400}
                r={120 + i * 90}
                fill="none"
                stroke="url(#intro-ring)"
                strokeWidth="0.8"
                strokeDasharray="3 6"
                initial={{ opacity: 0, rotate: -40, scale: 0.85 }}
                animate={{ opacity: 0.7, rotate: 0, scale: 1 }}
                transition={{ duration: reduce ? 0.4 : 1.6, delay: reduce ? 0 : 0.2 + i * 0.12, ease: EASE_OUT_SOFT }}
                style={{ transformOrigin: "400px 400px" }}
              />
            ))}

            {/* Draw-in ticks around the outer ring */}
            {!reduce &&
              [...Array(24)].map((_, i) => {
                const a = (i / 24) * Math.PI * 2 - Math.PI / 2;
                const r1 = 384;
                const r2 = 398;
                return (
                  <motion.line
                    key={i}
                    x1={400 + Math.cos(a) * r1}
                    y1={400 + Math.sin(a) * r1}
                    x2={400 + Math.cos(a) * r2}
                    y2={400 + Math.sin(a) * r2}
                    stroke="#7AA7F6"
                    strokeWidth="0.7"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ duration: 0.3, delay: 0.6 + (i / 24) * 0.6, ease: EASE_OUT_SOFT }}
                  />
                );
              })}

            {/* Core light — the seed */}
            <motion.circle
              cx={400}
              cy={400}
              r={60}
              fill="url(#intro-core)"
              filter="url(#intro-glow)"
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{
                opacity: [0, 1, 0.9],
                scale: [0.3, 1.1, 1],
              }}
              transition={{
                duration: reduce ? 0.3 : 1.2,
                ease: EASE_OUT_SOFT,
                times: [0, 0.6, 1],
              }}
            />

            {/* Orbiting particle — the "signal" */}
            {!reduce && (
              <motion.circle
                cx={400}
                cy={400}
                r={3.4}
                fill="#F4F5F8"
                filter="url(#intro-glow)"
                initial={{ rotate: -90 }}
                animate={{ rotate: 270 }}
                transition={{ duration: 2.6, ease: EASE_IN_OUT, delay: 0.4 }}
                style={{ transformOrigin: "400px 400px", translate: "210px 0" }}
              />
            )}
          </svg>

          {/* Wordmark + tagline */}
          <div className="relative z-10 flex flex-col items-center gap-5 px-6 text-center">
            <motion.div
              className="overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: reduce ? 0 : 0.9, ease: EASE_OUT_SOFT }}
            >
              <motion.h1
                initial={{ y: reduce ? 0 : 44, letterSpacing: reduce ? "0.18em" : "0.42em", filter: reduce ? "blur(0px)" : "blur(6px)", opacity: 0 }}
                animate={{ y: 0, letterSpacing: "0.18em", filter: "blur(0px)", opacity: 1 }}
                transition={{ duration: reduce ? 0.35 : 1.3, delay: reduce ? 0 : 0.95, ease: EASE_OUT_SOFT }}
                className="font-[Instrument_Serif,serif] text-5xl leading-none text-[#F4F5F8] md:text-7xl"
                style={{ textShadow: "0 2px 24px rgba(59,114,222,0.5)" }}
              >
                RYSKEX
              </motion.h1>
            </motion.div>

            {/* Cobalt hairline sweep */}
            <motion.div
              aria-hidden
              className="h-px w-40 md:w-56"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, #3B72DE 30%, #2EC46E 70%, transparent 100%)",
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: reduce ? 0.3 : 0.9, delay: reduce ? 0.1 : 1.4, ease: EASE_OUT_SOFT }}
            />

            <motion.p
              initial={{ opacity: 0, y: reduce ? 0 : 8 }}
              animate={{ opacity: 0.88, y: 0 }}
              transition={{ duration: reduce ? 0.3 : 0.7, delay: reduce ? 0.1 : 1.55, ease: EASE_OUT_SOFT }}
              className="font-[Geist,system-ui] text-xs uppercase tracking-[0.42em] text-[#9AA1B2] md:text-sm"
            >
              Truth from the machine
            </motion.p>
          </div>

          {/* Bottom meta — hub codes */}
          <motion.div
            aria-hidden
            className="absolute bottom-10 left-1/2 flex -translate-x-1/2 gap-4 font-mono text-[10px] uppercase tracking-[0.32em] text-[#5B6785] md:text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduce ? 0.25 : 0.6, delay: reduce ? 0.2 : 1.9 }}
          >
            <span>LDN</span>
            <span className="text-[#3B72DE]">·</span>
            <span>HFD</span>
            <span className="text-[#3B72DE]">·</span>
            <span>NYC</span>
            <span className="text-[#3B72DE]">·</span>
            <span>BER</span>
          </motion.div>

          {/* Skip hint — bottom right */}
          <motion.button
            type="button"
            onClick={(e) => { e.stopPropagation(); skip(); }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: reduce ? 0 : 1.8 }}
            className="absolute bottom-8 right-8 font-mono text-[10px] uppercase tracking-[0.28em] text-[#7A8399] hover:text-[#F4F5F8] md:text-xs"
            aria-label="Skip intro animation"
          >
            Skip ›
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
