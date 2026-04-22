// Connecticut State Capitol + Hartford skyline — centered dome flanked by
// institutional buildings. 320×180 viewBox. Green wash to differentiate.

import { motion, useReducedMotion } from "framer-motion";

interface Props {
  className?: string;
}

// Key structural paths drawn-in on scroll. Stagger index controls order.
const STROKES: { d: string; i: number }[] = [
  // Ground baseline
  { d: "M 10 150 L 310 150", i: 0 },
  // Left skyline block A
  { d: "M 32 150 L 32 108 L 58 108 L 58 150", i: 1 },
  // Left skyline block B (taller)
  { d: "M 60 150 L 60 88 L 84 88 L 84 150", i: 1 },
  // Left mid block
  { d: "M 86 150 L 86 98 L 108 98 L 108 150", i: 2 },
  // Capitol base
  { d: "M 118 150 L 118 112 L 202 112 L 202 150", i: 2 },
  // Capitol portico columns ledge
  { d: "M 126 112 L 126 100 L 194 100 L 194 112", i: 3 },
  // Capitol drum
  { d: "M 140 100 L 140 86 L 180 86 L 180 100", i: 3 },
  // Capitol dome arc
  { d: "M 140 86 Q 160 54 180 86", i: 4 },
  // Lantern + spire
  { d: "M 156 66 L 156 58 L 164 58 L 164 66", i: 5 },
  { d: "M 160 58 L 160 46", i: 5 },
  // Right mid block
  { d: "M 212 150 L 212 98 L 232 98 L 232 150", i: 2 },
  // Right skyline block A (taller)
  { d: "M 234 150 L 234 86 L 260 86 L 260 150", i: 1 },
  // Right skyline block B
  { d: "M 262 150 L 262 104 L 290 104 L 290 150", i: 1 },
];

// Column hints inside capitol portico
const COLUMNS = [134, 144, 154, 166, 176, 186];

// Window dots (skyline)
const WINDOWS = [
  { x: 40, y: 118 }, { x: 48, y: 118 }, { x: 40, y: 130 }, { x: 48, y: 130 },
  { x: 68, y: 100 }, { x: 76, y: 100 }, { x: 68, y: 120 }, { x: 76, y: 120 },
  { x: 220, y: 110 }, { x: 220, y: 124 },
  { x: 242, y: 100 }, { x: 252, y: 100 }, { x: 242, y: 120 }, { x: 252, y: 120 },
  { x: 270, y: 116 }, { x: 280, y: 116 }, { x: 270, y: 130 }, { x: 280, y: 130 },
];

export default function HartfordLandmark({ className }: Props) {
  const reduce = useReducedMotion();

  return (
    <svg
      viewBox="0 0 320 180"
      className={className}
      role="img"
      aria-label="Connecticut State Capitol, Hartford"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="hartford-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B72DE" />
          <stop offset="55%" stopColor="#5288F0" />
          <stop offset="100%" stopColor="#2EC46E" />
        </linearGradient>
        <radialGradient id="hartford-wash" cx="50%" cy="58%" r="55%">
          <stop offset="0%" stopColor="#2EC46E" stopOpacity="0.26" />
          <stop offset="70%" stopColor="#2EC46E" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#2EC46E" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hartford-ground" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2EC46E" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#2EC46E" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Ambient green wash */}
      <motion.circle
        cx="160"
        cy="95"
        r="120"
        fill="url(#hartford-wash)"
        animate={reduce ? undefined : { opacity: [0.18, 0.3, 0.18] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Ground haze */}
      <rect x="0" y="150" width="320" height="26" fill="url(#hartford-ground)" />
      <line x1="24" y1="158" x2="296" y2="158" stroke="#2EC46E" strokeWidth="0.5" opacity="0.35" />

      {/* Structural strokes — draw in on viewport entry */}
      <g fill="none" stroke="url(#hartford-stroke)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        {STROKES.map((s, idx) => (
          <motion.path
            key={idx}
            d={s.d}
            initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1.2, delay: reduce ? 0 : s.i * 0.12, ease: "easeOut" }}
          />
        ))}
      </g>

      {/* Portico columns */}
      <g stroke="#5288F0" strokeWidth="0.6" opacity="0.55">
        {COLUMNS.map((x) => (
          <line key={x} x1={x} y1="112" x2={x} y2="100" />
        ))}
      </g>

      {/* Spire tip */}
      <circle cx="160" cy="44" r="1.4" fill="#2EC46E" />

      {/* Window dots */}
      {WINDOWS.map((w, i) => (
        <rect key={i} x={w.x} y={w.y} width="1.4" height="1.4" fill="#F4F5F8" opacity="0.55" />
      ))}

      {/* Monogram */}
      <text
        x="302"
        y="172"
        fontSize="8"
        fontFamily="var(--font-mono), ui-monospace, monospace"
        fill="#F4F5F8"
        opacity="0.55"
        letterSpacing="1.6"
        textAnchor="end"
      >
        HFD
      </text>
    </svg>
  );
}
