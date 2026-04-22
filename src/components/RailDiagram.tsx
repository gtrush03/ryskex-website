// Clean hero spotlight card — replaces the cluttered multi-node diagram.
// One moment: the 48-hour settlement SLA, presented as a premium stat card
// with a subtle connecting SVG rail behind the key moment.

import { motion } from "framer-motion";
import GlowCard from "@/components/ui/spotlight-card";
import { DURATION_SLOW, EASE_OUT_SOFT } from "@/motion/constants";

const MICRO_STATS = [
  { k: "RAIL", v: "Redbelly L1" },
  { k: "DOMICILE", v: "Vermont · cell" },
  { k: "WRAPPER", v: "144A-eligible" },
];

export default function RailDiagram() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION_SLOW, delay: 0.15, ease: EASE_OUT_SOFT }}
    >
      <GlowCard
        glowColor="gradient"
        customSize
        className="w-full !aspect-auto p-8 md:p-10"
      >
        {/* Live indicator */}
        <div className="relative z-10 mb-8 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{
                background: "var(--accent-2)",
                boxShadow: "0 0 12px var(--accent-2)",
                animation: "glow-pulse 2400ms var(--ease) infinite",
              }}
            />
            Live settlement
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
            EVENT 0x9a42…b112
          </span>
        </div>

        {/* The hero moment — 48h + label */}
        <div className="relative z-10">
          <div className="flex items-end gap-4">
            <div
              className="font-mono font-light leading-[0.85] tabular text-gradient"
              style={{
                fontSize: "clamp(92px, 14vw, 144px)",
                letterSpacing: "-0.045em",
                fontFeatureSettings: '"tnum", "ss01"',
              }}
            >
              48
            </div>
            <div
              className="pb-3 font-mono text-[18px] font-light uppercase tracking-[0.18em] text-muted md:text-[22px]"
              style={{ letterSpacing: "0.18em" }}
            >
              hours
            </div>
          </div>
          <p className="mt-6 max-w-[32ch] font-display text-[20px] italic leading-snug text-text md:text-[24px]">
            From trigger fire to settled capital —
            <br />
            every cell, every cedent.
          </p>
        </div>

        {/* Subtle rail track behind the micro-stats */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-x-8 bottom-[92px] z-0 h-1"
          viewBox="0 0 100 1"
          preserveAspectRatio="none"
        >
          <line
            x1="0"
            y1="0.5"
            x2="100"
            y2="0.5"
            stroke="var(--border)"
            strokeWidth="0.3"
            strokeDasharray="1 1"
          />
        </svg>

        {/* Bottom micro-stats */}
        <div className="relative z-10 mt-14 grid grid-cols-3 gap-4 border-t border-border pt-5 font-mono text-[10.5px]">
          {MICRO_STATS.map((s) => (
            <div key={s.k}>
              <div className="uppercase tracking-[0.18em] text-subtle">{s.k}</div>
              <div className="mt-1 text-text">{s.v}</div>
            </div>
          ))}
        </div>
      </GlowCard>
    </motion.div>
  );
}
