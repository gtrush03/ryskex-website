import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";

export interface TrustStripProps {
  className?: string;
  /** When true, renders only the marquee (narrow variant). */
  compact?: boolean;
}

type Cohort = { label: string; value: string };
type Stat = { prefix?: string; value: number; suffix: string; caption: string };

const COHORTS: readonly Cohort[] = [
  { label: "Lloyd's Lab", value: "Cohort 2 & 5" },
  { label: "Vermont", value: "Sponsored Cell" },
  { label: "Redbelly", value: "Settlement L1" },
];

const STATS: readonly Stat[] = [
  { prefix: "$", value: 175, suffix: "T", caption: "Global capital" },
  { value: 350, suffix: "×", caption: "vs reinsurance pool" },
  { value: 83, suffix: "%", caption: "S&P 500 intangible" },
  { value: 48, suffix: "h", caption: "Settlement SLA" },
];

const PARTNERS: readonly string[] = [
  "LLOYD'S LAB",
  "REDBELLY NETWORK",
  "MUNICH RE AMERICA",
  "VERMONT CAPTIVE INSURANCE ASSOCIATION",
  "CONNECTICUT CAPTIVE INSURANCE FORUM",
  "ARX VERITAS",
  "CAPTIVE INTERNATIONAL",
  "REINSURANCE NEWS",
  "REINSURANCE NEWS",
];

function CountUp({ target, reduceMotion }: { target: number; reduceMotion: boolean }) {
  const mv = useMotionValue(reduceMotion ? target : 0);
  const display = useTransform(mv, (v) => Math.round(v).toLocaleString());
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  useEffect(() => {
    if (reduceMotion || !inView) return;
    const controls = animate(mv, target, { duration: 1.4, ease: [0.2, 0.6, 0.2, 1] });
    return () => controls.stop();
  }, [inView, mv, reduceMotion, target]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

function Marquee({ reduceMotion }: { reduceMotion: boolean }) {
  const [paused, setPaused] = useState(false);
  const track = [...PARTNERS, ...PARTNERS];
  const animationState = reduceMotion || paused ? "paused" : "running";

  return (
    <div
      className="relative overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex w-max items-center gap-12 font-mono text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--muted)] md:gap-16"
        style={{
          animation: "trust-marquee 48s linear infinite",
          animationPlayState: animationState,
        }}
      >
        {track.map((name, i) => (
          <span key={`${name}-${i}`} className="flex shrink-0 items-center gap-12 md:gap-16">
            <span>{name}</span>
            <span aria-hidden style={{ color: "var(--border-strong)" }}>·</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes trust-marquee { from { transform: translate3d(0,0,0); } to { transform: translate3d(-50%,0,0); } }`}</style>
    </div>
  );
}

export default function TrustStrip({ className, compact = false }: TrustStripProps) {
  const reduceMotion = useReducedMotion() ?? false;

  if (compact) {
    return (
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 8, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.5, ease: [0.2, 0.6, 0.2, 1] }}
        className={className}
      >
        <Marquee reduceMotion={reduceMotion} />
      </motion.div>
    );
  }

  return (
    <motion.section
      aria-label="Institutional credibility"
      initial={reduceMotion ? false : { opacity: 0, y: 8, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.5, ease: [0.2, 0.6, 0.2, 1] }}
      className={
        "relative " +
        "bg-[linear-gradient(180deg,rgba(13,18,32,0.4)_0%,rgba(13,18,32,0.18)_100%)] " +
        "backdrop-blur-md py-10 md:py-12 " +
        (className ?? "")
      }
    >
      {/* Top-only gradient hairline, faded at edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(122,167,246,0.42) 50%, transparent 100%)",
        }}
      />

      <div className="container-x flex flex-col gap-9 md:gap-10">
        {/* Layer 1 — cohort badges with smoother glass */}
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
          {COHORTS.map((c, i) => (
            <motion.li
              key={c.label}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, delay: 0.05 + i * 0.08, ease: [0.2, 0.6, 0.2, 1] }}
              className="relative flex items-center justify-between gap-4 overflow-hidden rounded-full px-5 py-3 md:px-6 md:py-3.5"
              style={{
                background:
                  "linear-gradient(180deg, rgba(244,245,248,0.06) 0%, rgba(244,245,248,0.02) 100%)",
                border: "1px solid rgba(244,245,248,0.10)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.08), 0 6px 24px -14px rgba(0,0,0,0.5)",
                backdropFilter: "blur(14px)",
              }}
            >
              {/* top bevel sheen */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-1/2"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 100%)",
                }}
              />
              <span className="relative flex items-center gap-3">
                <span
                  aria-hidden
                  className="glow-dot"
                  style={{ width: 6, height: 6, background: "var(--accent-2)" }}
                />
                <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--muted)]">
                  {c.label}
                </span>
              </span>
              <span className="relative font-display text-[17px] leading-none text-[color:var(--text)] md:text-[19px]">
                {c.value}
              </span>
            </motion.li>
          ))}
        </ul>

        {/* Layer 2 — big numbers, tighter rhythm, gradient-shifting */}
        <ul className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 md:gap-x-10">
          {STATS.map((s, i) => (
            <motion.li
              key={s.caption}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, delay: 0.05 + i * 0.06, ease: [0.2, 0.6, 0.2, 1] }}
              className="flex flex-col gap-2"
            >
              <div
                className="tabular font-mono leading-none"
                style={{
                  fontSize: "clamp(40px, 5.2vw, 60px)",
                  letterSpacing: "-0.03em",
                  backgroundImage:
                    "linear-gradient(96deg, #7AA7F6 0%, #5288F0 45%, #3FD582 100%)",
                  backgroundSize: "220% 100%",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  animation: reduceMotion
                    ? undefined
                    : `trust-number-shift 10s ease-in-out ${i * 0.4}s infinite alternate`,
                  filter: "drop-shadow(0 0 28px rgba(82,136,240,0.20))",
                }}
              >
                {s.prefix ?? ""}
                <CountUp target={s.value} reduceMotion={reduceMotion} />
                {s.suffix}
              </div>
              <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--muted)]">
                {s.caption}
              </div>
            </motion.li>
          ))}
        </ul>

        {/* Layer 3 — partner marquee */}
        <Marquee reduceMotion={reduceMotion} />
      </div>

      <style>{`
        @keyframes trust-number-shift {
          0%   { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
      `}</style>
    </motion.section>
  );
}
