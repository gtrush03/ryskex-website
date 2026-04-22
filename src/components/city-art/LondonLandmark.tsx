// Stylized Tower Bridge — two Gothic towers, suspension span, pedestrian
// silhouettes, water reflection hint, cobalt wash. 320×180 viewBox.

import { motion, useReducedMotion } from "framer-motion";

interface Props {
  className?: string;
}

// Key structural paths drawn-in on scroll. Stagger index controls order.
const STROKES: { d: string; i: number }[] = [
  // Waterline
  { d: "M 10 150 L 310 150", i: 0 },
  // Left tower outline
  { d: "M 80 150 L 80 70 L 92 60 L 92 40 L 96 36 L 100 40 L 100 60 L 112 70 L 112 150 Z", i: 1 },
  // Right tower outline
  { d: "M 208 150 L 208 70 L 220 60 L 220 40 L 224 36 L 228 40 L 228 60 L 240 70 L 240 150 Z", i: 2 },
  // Central lower suspension deck
  { d: "M 112 110 L 208 110", i: 3 },
  // Upper walkway
  { d: "M 112 80 L 208 80", i: 3 },
  // Left suspension cable
  { d: "M 40 150 Q 76 118 112 110", i: 4 },
  // Right suspension cable
  { d: "M 280 150 Q 244 118 208 110", i: 4 },
  // Left approach
  { d: "M 10 150 L 80 150", i: 5 },
  // Right approach
  { d: "M 240 150 L 310 150", i: 5 },
];

// Pedestrian-silhouette stars along the span
const FIGURES = [
  { x: 128, y: 106 },
  { x: 148, y: 106 },
  { x: 172, y: 106 },
  { x: 192, y: 106 },
];

export default function LondonLandmark({ className }: Props) {
  const reduce = useReducedMotion();

  return (
    <svg
      viewBox="0 0 320 180"
      className={className}
      role="img"
      aria-label="Tower Bridge, London"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="london-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B72DE" />
          <stop offset="60%" stopColor="#5288F0" />
          <stop offset="100%" stopColor="#2EC46E" />
        </linearGradient>
        <radialGradient id="london-wash" cx="50%" cy="60%" r="55%">
          <stop offset="0%" stopColor="#3B72DE" stopOpacity="0.28" />
          <stop offset="70%" stopColor="#3B72DE" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#3B72DE" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="london-water" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3B72DE" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#3B72DE" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Ambient cobalt wash */}
      <motion.circle
        cx="160"
        cy="95"
        r="120"
        fill="url(#london-wash)"
        animate={reduce ? undefined : { opacity: [0.18, 0.3, 0.18] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Water reflection hint */}
      <rect x="0" y="150" width="320" height="26" fill="url(#london-water)" />
      <line x1="24" y1="158" x2="80" y2="158" stroke="#5288F0" strokeWidth="0.6" opacity="0.5" />
      <line x1="110" y1="162" x2="210" y2="162" stroke="#5288F0" strokeWidth="0.6" opacity="0.35" />
      <line x1="240" y1="158" x2="296" y2="158" stroke="#5288F0" strokeWidth="0.6" opacity="0.5" />

      {/* Structural strokes — draw in on viewport entry */}
      <g fill="none" stroke="url(#london-stroke)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
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

      {/* Gothic spire tips — filled dots */}
      <circle cx="96" cy="34" r="1.4" fill="#5288F0" />
      <circle cx="224" cy="34" r="1.4" fill="#2EC46E" />

      {/* Pedestrian-silhouette stars */}
      {FIGURES.map((f, i) => (
        <g key={i} opacity="0.8">
          <circle cx={f.x} cy={f.y - 2} r="0.9" fill="#F4F5F8" />
          <line x1={f.x} y1={f.y - 1} x2={f.x} y2={f.y + 2} stroke="#F4F5F8" strokeWidth="0.6" />
        </g>
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
        LDN
      </text>
    </svg>
  );
}
