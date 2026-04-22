// Hero art for About: an orbital system with Mission, Vision and Technology
// as three planets circling a luminous core, with trailing arcs and stars.

import { motion, useReducedMotion } from "framer-motion";

interface Props {
  className?: string;
}

const CX = 200;
const CY = 200;

const PLANETS = [
  { id: "mission", color: "#3B72DE", radius: 80, duration: 22, size: 7, label: "MISSION", offset: 0 },
  { id: "vision", color: "#2EC46E", radius: 120, duration: 34, size: 6, label: "VISION", offset: 120 },
  { id: "technology", color: "#1D4A9A", radius: 160, duration: 48, size: 8, label: "TECHNOLOGY", offset: 240 },
];

function seeded(i: number, salt: number): number {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export default function AboutHero({ className }: Props) {
  const reduce = useReducedMotion();
  const stars = Array.from({ length: 26 }, (_, i) => ({
    cx: 10 + seeded(i, 1) * 380,
    cy: 10 + seeded(i, 2) * 380,
    r: 0.3 + seeded(i, 3) * 0.9,
    delay: seeded(i, 4) * 3,
    dur: 2 + seeded(i, 5) * 2,
  }));

  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label="Mission · Vision · Technology orbital">
      <defs>
        <radialGradient id="about-hero-space" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#0F1A33" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#070B14" stopOpacity="1" />
        </radialGradient>
        <radialGradient id="about-hero-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="25%" stopColor="#2EC46E" stopOpacity="0.85" />
          <stop offset="60%" stopColor="#3B72DE" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#070B14" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="about-hero-trail-0" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3B72DE" stopOpacity="0" />
          <stop offset="80%" stopColor="#3B72DE" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#3B72DE" stopOpacity="0" />
        </radialGradient>
        <filter id="about-hero-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="about-hero-coreglow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
      </defs>

      <rect width="400" height="400" fill="url(#about-hero-space)" />
      {stars.map((s, i) => (
        <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="#C7D4F0" opacity="0.7">
          {!reduce && (
            <animate attributeName="opacity" values="0.15;0.85;0.15" dur={`${s.dur}s`} begin={`${s.delay}s`} repeatCount="indefinite" />
          )}
        </circle>
      ))}

      {PLANETS.map((p) => (
        <circle
          key={`orbit-${p.id}`}
          cx={CX}
          cy={CY}
          r={p.radius}
          fill="none"
          stroke={p.color}
          strokeWidth="0.4"
          opacity="0.2"
          strokeDasharray="2 4"
        />
      ))}

      <circle cx={CX} cy={CY} r="40" fill="url(#about-hero-core)" filter="url(#about-hero-coreglow)" opacity="0.9" />
      <motion.circle
        cx={CX}
        cy={CY}
        r="22"
        fill="url(#about-hero-core)"
        animate={reduce ? undefined : { scale: [1, 1.12, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: `${CX}px ${CY}px` }}
      />
      <circle cx={CX} cy={CY} r="6" fill="#FFFFFF" opacity="0.95" />

      {PLANETS.map((p, idx) => (
        <motion.g
          key={p.id}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
          initial={{ rotate: p.offset }}
          animate={reduce ? { rotate: p.offset } : { rotate: p.offset + 360 }}
          transition={{ duration: p.duration, repeat: Infinity, ease: "linear" }}
        >
          <path
            d={`M ${CX + p.radius} ${CY} A ${p.radius} ${p.radius} 0 0 1 ${CX + p.radius * Math.cos(-Math.PI / 1.2)} ${
              CY + p.radius * Math.sin(-Math.PI / 1.2)
            }`}
            fill="none"
            stroke={p.color}
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.45"
          />
          <g transform={`translate(${CX + p.radius} ${CY})`} filter="url(#about-hero-glow)">
            <circle cx="0" cy="0" r={p.size + 3} fill={p.color} opacity="0.25" />
            <circle cx="0" cy="0" r={p.size} fill={p.color} />
            <circle cx={-p.size * 0.35} cy={-p.size * 0.35} r={p.size * 0.3} fill="#FFFFFF" opacity="0.6" />
          </g>
          <text
            x={CX + p.radius + p.size + 8}
            y={CY + 3}
            fontSize="8"
            fontFamily="var(--font-mono)"
            fill="#C7D4F0"
            letterSpacing="2.2"
            opacity="0.85"
            transform={`rotate(${-p.offset - (reduce ? 0 : 0)} ${CX + p.radius} ${CY})`}
          >
            {p.label}
          </text>
          {idx === 0 && !reduce && (
            <circle cx={CX + p.radius} cy={CY} r="2" fill="#FFFFFF" opacity="0.8">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="1.8s" repeatCount="indefinite" />
            </circle>
          )}
        </motion.g>
      ))}
    </svg>
  );
}
