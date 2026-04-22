// Team hero — 9 operators as a network of nodes connected by hairline
// edges. Marcus (MS) central, the rest orbit. Greyscale baseline with
// cobalt highlights that propagate toward the cursor. Cursor-aware
// parallax drifts the whole mesh; edges shimmer with data pulses.

import { useEffect, useRef } from "react";
import type { MotionValue } from "framer-motion";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

interface Props {
  className?: string;
}

const VB_W = 540;
const VB_H = 340;

interface Node {
  id: string;
  initials: string;
  name: string;
  role: string;
  x: number;
  y: number;
  central?: boolean;
}

const NODES: Node[] = [
  { id: "ms", initials: "MS", name: "Marcus Schmalbach", role: "CEO", x: 270, y: 170, central: true },
  { id: "sk", initials: "SK", name: "Simon Kolkmann", role: "CTO", x: 120, y: 80 },
  { id: "tw", initials: "TW", name: "Tatjana Winter", role: "BD", x: 420, y: 80 },
  { id: "yy", initials: "YY", name: "Yue Yin", role: "RISK", x: 70, y: 205 },
  { id: "tg", initials: "TG", name: "Tobias Gurtzick", role: "ARCH", x: 470, y: 205 },
  { id: "sg", initials: "SG", name: "Suneetha Gurtzick", role: "AI", x: 130, y: 280 },
  { id: "no", initials: "NO", name: "Nils Ossenbrink", role: "ADV", x: 410, y: 280 },
  { id: "fo", initials: "FO", name: "Franziska Oschmann", role: "RSCH", x: 230, y: 52 },
  { id: "sbi", initials: "SBI", name: "Sara Braulik Ibañez", role: "DSGN", x: 310, y: 292 },
];

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
  ["sk", "yy"],
  ["tw", "tg"],
];

function seeded(i: number, salt: number): number {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function dist(ax: number, ay: number, bx: number, by: number) {
  return Math.hypot(ax - bx, ay - by);
}

export default function TeamHero({ className }: Props) {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const byId = (id: string) => NODES.find((n) => n.id === id)!;

  const rawX = useMotionValue(VB_W / 2);
  const rawY = useMotionValue(VB_H / 2);
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);
  const sx = useSpring(nx, { stiffness: 55, damping: 16, mass: 0.6 });
  const sy = useSpring(ny, { stiffness: 55, damping: 16, mass: 0.6 });
  const meshX = useTransform(sx, [-1, 1], [-6, 6]);
  const meshY = useTransform(sy, [-1, 1], [-4, 4]);

  const cursorX = useSpring(rawX, { stiffness: 60, damping: 20, mass: 0.5 });
  const cursorY = useSpring(rawY, { stiffness: 60, damping: 20, mass: 0.5 });

  useEffect(() => {
    if (reduce) return;
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width) * VB_W;
      const py = ((e.clientY - rect.top) / rect.height) * VB_H;
      rawX.set(px);
      rawY.set(py);
      const nmx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const nmy = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      nx.set(Math.max(-1, Math.min(1, nmx)));
      ny.set(Math.max(-1, Math.min(1, nmy)));
    };
    const onLeave = () => {
      rawX.set(VB_W / 2);
      rawY.set(VB_H / 2);
      nx.set(0);
      ny.set(0);
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [rawX, rawY, nx, ny, reduce]);

  const stars = Array.from({ length: 22 }, (_, i) => ({
    cx: 6 + seeded(i, 1) * (VB_W - 12),
    cy: 6 + seeded(i, 2) * (VB_H - 12),
    r: 0.3 + seeded(i, 3) * 0.85,
    dur: 2.4 + seeded(i, 4) * 3,
    delay: seeded(i, 5) * 3,
    opacity: 0.3 + seeded(i, 6) * 0.5,
  }));

  return (
    <div ref={containerRef} className={className} style={{ width: "100%", height: "100%" }}>
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        role="img"
        aria-label="RYSKEX team — 9 operators in a connected network"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <defs>
          <radialGradient id="team-bg" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor="#0F1A33" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#070B14" stopOpacity="1" />
          </radialGradient>
          <radialGradient id="team-vignette" cx="50%" cy="50%" r="70%">
            <stop offset="60%" stopColor="transparent" />
            <stop offset="100%" stopColor="#02040A" stopOpacity="0.85" />
          </radialGradient>
          <linearGradient id="team-edge" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B72DE" stopOpacity="0.12" />
            <stop offset="50%" stopColor="#7AA7F6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#3B72DE" stopOpacity="0.12" />
          </linearGradient>
          <radialGradient id="team-node" cx="45%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#2B3954" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#131B2E" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#070B14" stopOpacity="0.95" />
          </radialGradient>
          <radialGradient id="team-node-hot" cx="45%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#3B72DE" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#1D4A9A" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#070B14" stopOpacity="0.95" />
          </radialGradient>
          <radialGradient id="team-central" cx="45%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#7AA7F6" stopOpacity="0.7" />
            <stop offset="45%" stopColor="#1D4A9A" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#070B14" stopOpacity="0.95" />
          </radialGradient>
          <filter id="team-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="team-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        <rect width={VB_W} height={VB_H} fill="url(#team-bg)" />

        <motion.g style={{ x: meshX, y: meshY }}>
          {/* Soft starfield particles */}
          {stars.map((s, i) => (
            <circle key={`sp${i}`} cx={s.cx} cy={s.cy} r={s.r} fill="#D6E1F5" opacity={s.opacity}>
              {!reduce && (
                <animate
                  attributeName="opacity"
                  values={`${(s.opacity * 0.2).toFixed(2)};${s.opacity.toFixed(2)};${(s.opacity * 0.2).toFixed(2)}`}
                  dur={`${s.dur}s`}
                  begin={`${s.delay}s`}
                  repeatCount="indefinite"
                />
              )}
            </circle>
          ))}

          {/* Faint radial lattice */}
          <g opacity="0.18" stroke="#3B72DE" strokeWidth="0.22" fill="none">
            <circle cx={270} cy={170} r="60" strokeDasharray="1 4" />
            <circle cx={270} cy={170} r="110" strokeDasharray="1 4" />
            <circle cx={270} cy={170} r="160" strokeDasharray="1 4" />
          </g>

          {/* Edges — baseline + travelling pulse */}
          {EDGES.map(([a, b], i) => {
            const A = byId(a);
            const B = byId(b);
            const d = `M ${A.x} ${A.y} L ${B.x} ${B.y}`;
            return (
              <g key={`e${i}`}>
                <motion.line
                  x1={A.x}
                  y1={A.y}
                  x2={B.x}
                  y2={B.y}
                  stroke="url(#team-edge)"
                  strokeWidth="0.85"
                  opacity="0.6"
                  initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.4, delay: 0.1 * i, ease: "easeOut" }}
                />
                {!reduce && i % 2 === 0 && (
                  <circle r="1.6" fill="#7AA7F6" opacity="0" filter="url(#team-glow)">
                    <animateMotion
                      dur={`${5 + (i % 4)}s`}
                      begin={`${(i * 0.4) % 3}s`}
                      repeatCount="indefinite"
                      path={d}
                    />
                    <animate
                      attributeName="opacity"
                      values="0;0.85;0.85;0"
                      keyTimes="0;0.18;0.82;1"
                      dur={`${5 + (i % 4)}s`}
                      begin={`${(i * 0.4) % 3}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
              </g>
            );
          })}

          {/* Nodes */}
          {NODES.map((n, i) => (
            <TeamNode
              key={n.id}
              n={n}
              i={i}
              reduce={!!reduce}
              cursorX={cursorX}
              cursorY={cursorY}
            />
          ))}
        </motion.g>

        <rect width={VB_W} height={VB_H} fill="url(#team-vignette)" pointerEvents="none" />

        {/* Network chip — bottom left */}
        <g transform="translate(18 306)">
          <rect x="0" y="0" width="156" height="24" rx="3" fill="#0A1326" opacity="0.88" stroke="rgba(59,114,222,0.45)" strokeWidth="0.7" />
          <circle cx="10" cy="12" r="2.4" fill="#2EC46E" filter="url(#team-glow)">
            {!reduce && <animate attributeName="opacity" values="0.5;1;0.5" dur="1.6s" repeatCount="indefinite" />}
          </circle>
          <text x="20" y="9" fontSize="6" fontFamily="var(--font-mono)" fill="#8AB4F8" letterSpacing="1.8">
            NETWORK · 09 NODES · 16 LINKS
          </text>
          <text x="20" y="19" fontSize="6" fontFamily="var(--font-mono)" fill="#6A7A99" letterSpacing="1.4">
            OPERATORS · LLOYD'S LAB · BERLIN
          </text>
        </g>

        {/* Cursor proximity readout */}
        <g transform={`translate(${VB_W - 118} 306)`}>
          <rect x="0" y="0" width="100" height="24" rx="3" fill="#0A1326" opacity="0.88" stroke="rgba(46,196,110,0.45)" strokeWidth="0.7" />
          <text x="50" y="9" textAnchor="middle" fontSize="6" fontFamily="var(--font-mono)" fill="#8AB4F8" letterSpacing="1.8">
            PROXIMITY · LIVE
          </text>
          <text x="50" y="19" textAnchor="middle" fontSize="6" fontFamily="var(--font-mono)" fill="#2EC46E" letterSpacing="1.6">
            HOVER NODE
          </text>
        </g>

        {/* Corner framing */}
        {[
          [20, 20],
          [VB_W - 20, 20],
        ].map(([x, y], i) => (
          <g key={`cf${i}`} stroke="#3B72DE" strokeWidth="0.5" opacity="0.35">
            <line x1={x - 7} y1={y} x2={x + 7} y2={y} />
            <line x1={x} y1={y - 7} x2={x} y2={y + 7} />
          </g>
        ))}
      </svg>
    </div>
  );
}

// Per-node subcomponent — hooks called at top level.
interface TeamNodeProps {
  n: Node;
  i: number;
  reduce: boolean;
  cursorX: MotionValue<number>;
  cursorY: MotionValue<number>;
}

function TeamNode({ n, i, reduce, cursorX, cursorY }: TeamNodeProps) {
  const radius = n.central ? 34 : 22;
  const bob = seeded(i, 9) * 5 + 2;
  const dur = 4 + seeded(i, 10) * 3;

  const nodeHotOpacity = useTransform<number, number>([cursorX, cursorY], (vals) => {
    const [cxv, cyv] = vals as number[];
    const d = dist(cxv, cyv, n.x, n.y);
    const t = Math.max(0, 1 - d / 120);
    return t * (n.central ? 0.9 : 0.85);
  });

  const nodeRingOpacity = useTransform<number, number>([cursorX, cursorY], (vals) => {
    const [cxv, cyv] = vals as number[];
    const d = dist(cxv, cyv, n.x, n.y);
    return Math.max(0, 1 - d / 90) * 0.9;
  });

  return (
    <motion.g
      animate={reduce ? undefined : { y: [0, -bob, 0] }}
      transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay: seeded(i, 11) * 2 }}
    >
      {n.central && (
        <>
          <circle cx={n.x} cy={n.y} r={radius + 18} fill="none" stroke="#7AA7F6" strokeWidth="0.4" opacity="0.4" strokeDasharray="2 4" />
          <circle cx={n.x} cy={n.y} r={radius + 8} fill="none" stroke="#3B72DE" strokeWidth="0.85" opacity="0.7" />
          {!reduce && (
            <circle cx={n.x} cy={n.y} r={radius + 12} fill="none" stroke="#3B72DE" strokeWidth="0.65" opacity="0.5">
              <animate attributeName="r" values={`${radius + 8};${radius + 22};${radius + 8}`} dur="3.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;0;0.6" dur="3.4s" repeatCount="indefinite" />
            </circle>
          )}
        </>
      )}

      <motion.circle
        cx={n.x}
        cy={n.y}
        r={radius + 6}
        fill="none"
        stroke="#3B72DE"
        strokeWidth="0.8"
        style={{ opacity: nodeRingOpacity }}
      />

      <circle
        cx={n.x}
        cy={n.y}
        r={radius}
        fill={n.central ? "url(#team-central)" : "url(#team-node)"}
        stroke={n.central ? "#7AA7F6" : "rgba(140,150,170,0.55)"}
        strokeWidth="0.95"
        filter="url(#team-glow)"
      />

      <motion.circle cx={n.x} cy={n.y} r={radius} fill="url(#team-node-hot)" style={{ opacity: nodeHotOpacity }} />

      <circle cx={n.x - radius * 0.35} cy={n.y - radius * 0.4} r={radius * 0.22} fill="#FFFFFF" opacity="0.12" />

      <text
        x={n.x}
        y={n.y + (n.central ? 4 : 3)}
        textAnchor="middle"
        fontSize={n.central ? 13 : 10}
        fontFamily="var(--font-mono)"
        fill="#F4F5F8"
        letterSpacing="1.8"
        fontWeight={n.central ? "500" : "400"}
        paintOrder="stroke"
        stroke="#03060C"
        strokeWidth="0.85"
        strokeLinejoin="round"
      >
        {n.initials}
      </text>

      <text
        x={n.x}
        y={n.y + radius + 10}
        textAnchor="middle"
        fontSize="6.2"
        fontFamily="var(--font-mono)"
        fill="#8AB4F8"
        letterSpacing="1.8"
        opacity="0.85"
      >
        {n.role}
      </text>

      {n.central && (
        <g>
          <path
            d={`M ${n.x - 14} ${n.y - radius - 6} L ${n.x - 8} ${n.y - radius - 14} L ${n.x} ${n.y - radius - 6} L ${n.x + 8} ${n.y - radius - 14} L ${n.x + 14} ${n.y - radius - 6}`}
            fill="none"
            stroke="#2EC46E"
            strokeWidth="0.8"
            strokeLinejoin="round"
            opacity="0.85"
          />
          <circle cx={n.x - 8} cy={n.y - radius - 14} r="1.2" fill="#2EC46E" />
          <circle cx={n.x + 8} cy={n.y - radius - 14} r="1.2" fill="#2EC46E" />
        </g>
      )}
    </motion.g>
  );
}
