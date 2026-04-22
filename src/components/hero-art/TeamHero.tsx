// Hero art for Team: 9 portrait-as-node avatars connected by an animated
// network, with Marcus central and glowing, rest gently floating.

import { motion, useReducedMotion } from "framer-motion";

interface Props {
  className?: string;
}

interface Node {
  id: string;
  initials: string;
  x: number;
  y: number;
  central?: boolean;
}

const NODES: Node[] = [
  { id: "ms", initials: "MS", x: 260, y: 160, central: true },
  { id: "sk", initials: "SK", x: 110, y: 80 },
  { id: "tw", initials: "TW", x: 410, y: 80 },
  { id: "yy", initials: "YY", x: 60, y: 200 },
  { id: "tg", initials: "TG", x: 460, y: 200 },
  { id: "sg", initials: "SG", x: 120, y: 260 },
  { id: "no", initials: "NO", x: 400, y: 270 },
  { id: "fo", initials: "FO", x: 220, y: 50 },
  { id: "sbi", initials: "SBI", x: 300, y: 270 },
];

// Edges primarily connect the central node with spokes, plus a few cross-links.
const EDGES: Array<[string, string]> = [
  ["ms", "sk"],
  ["ms", "tw"],
  ["ms", "yy"],
  ["ms", "tg"],
  ["ms", "sg"],
  ["ms", "no"],
  ["ms", "fo"],
  ["ms", "sbi"],
  ["sk", "fo"],
  ["tw", "fo"],
  ["yy", "sg"],
  ["tg", "no"],
  ["sg", "sbi"],
  ["no", "sbi"],
];

function seeded(i: number, salt: number): number {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export default function TeamHero({ className }: Props) {
  const reduce = useReducedMotion();
  const byId = (id: string) => NODES.find((n) => n.id === id)!;

  return (
    <svg viewBox="0 0 520 320" className={className} role="img" aria-label="Team network of 9 contributors">
      <defs>
        <radialGradient id="team-hero-bg" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#0F1A33" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#070B14" stopOpacity="1" />
        </radialGradient>
        <linearGradient id="team-hero-edge" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B72DE" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#2EC46E" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#3B72DE" stopOpacity="0.2" />
        </linearGradient>
        <radialGradient id="team-hero-node" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1D4A9A" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#070B14" stopOpacity="0.9" />
        </radialGradient>
        <radialGradient id="team-hero-central" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2EC46E" stopOpacity="0.5" />
          <stop offset="55%" stopColor="#1D4A9A" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#070B14" stopOpacity="0.95" />
        </radialGradient>
        <filter id="team-hero-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="520" height="320" fill="url(#team-hero-bg)" />

      <g>
        {EDGES.map(([a, b], i) => {
          const A = byId(a);
          const B = byId(b);
          return (
            <motion.line
              key={`${a}-${b}`}
              x1={A.x}
              y1={A.y}
              x2={B.x}
              y2={B.y}
              stroke="url(#team-hero-edge)"
              strokeWidth="0.8"
              opacity="0.65"
              initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, delay: 0.12 * i, ease: "easeOut" }}
            />
          );
        })}
      </g>

      {NODES.map((n, i) => {
        const radius = n.central ? 34 : 22;
        const bob = seeded(i, 9) * 6 + 3;
        const dur = 4 + seeded(i, 10) * 3;
        return (
          <motion.g
            key={n.id}
            animate={reduce ? undefined : { y: [0, -bob, 0] }}
            transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay: seeded(i, 11) * 2 }}
          >
            {n.central && (
              <>
                <circle cx={n.x} cy={n.y} r={radius + 14} fill="none" stroke="#2EC46E" strokeWidth="0.6" opacity="0.4">
                  {!reduce && (
                    <animate attributeName="r" values={`${radius + 10};${radius + 22};${radius + 10}`} dur="3s" repeatCount="indefinite" />
                  )}
                </circle>
                <circle cx={n.x} cy={n.y} r={radius + 6} fill="none" stroke="#2EC46E" strokeWidth="1" opacity="0.7" />
              </>
            )}
            <circle
              cx={n.x}
              cy={n.y}
              r={radius}
              fill={n.central ? "url(#team-hero-central)" : "url(#team-hero-node)"}
              stroke={n.central ? "#2EC46E" : "rgba(59,114,222,0.55)"}
              strokeWidth="1"
              filter="url(#team-hero-glow)"
            />
            <circle cx={n.x - radius * 0.35} cy={n.y - radius * 0.35} r={radius * 0.22} fill="#FFFFFF" opacity="0.12" />
            <text
              x={n.x}
              y={n.y + (n.central ? 4 : 3)}
              textAnchor="middle"
              fontSize={n.central ? 14 : 10}
              fontFamily="var(--font-mono)"
              fill="#F4F5F8"
              letterSpacing="1.6"
            >
              {n.initials}
            </text>
          </motion.g>
        );
      })}

      <g transform="translate(16 296)">
        <text fontSize="7" fontFamily="var(--font-mono)" fill="#8AB4F8" letterSpacing="2">
          NETWORK · 09 NODES · 14 LINKS
        </text>
      </g>
    </svg>
  );
}
