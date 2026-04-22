// How It Works hero — 4-stage pipeline: SCOPE · STRUCTURE · PLACE · SETTLE.
// Nodes connected by animated rail with travelling contract capsules,
// step markers, directional arrows, station bay telemetry, and
// cursor-aware parallax drift on the full pipeline.

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

interface Props {
  className?: string;
}

const VB_W = 640;
const VB_H = 280;
const RAIL_Y = 120;

interface Station {
  id: "scope" | "structure" | "place" | "settle";
  label: string;
  sub: string;
  stepNum: string;
  x: number;
}

const STATIONS: Station[] = [
  { id: "scope", label: "SCOPE", sub: "EXPOSURE MAPPED", stepNum: "01", x: 92 },
  { id: "structure", label: "STRUCTURE", sub: "TRIGGER DEFINED", stepNum: "02", x: 248 },
  { id: "place", label: "PLACE", sub: "CAPITAL MATCHED", stepNum: "03", x: 404 },
  { id: "settle", label: "SETTLE", sub: "PAYOUT WIRED", stepNum: "04", x: 560 },
];

function seeded(i: number, salt: number): number {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function StationIcon({ id, cx, cy, reduce }: { id: string; cx: number; cy: number; reduce: boolean }) {
  if (id === "scope") {
    // Crosshair + scope reticle
    return (
      <g transform={`translate(${cx} ${cy})`}>
        <circle r="14" fill="none" stroke="#3B72DE" strokeWidth="0.6" opacity="0.55" />
        <circle r="9" fill="none" stroke="#3B72DE" strokeWidth="0.45" opacity="0.45" />
        <line x1="-18" y1="0" x2="-6" y2="0" stroke="#7AA7F6" strokeWidth="1" />
        <line x1="6" y1="0" x2="18" y2="0" stroke="#7AA7F6" strokeWidth="1" />
        <line x1="0" y1="-18" x2="0" y2="-6" stroke="#7AA7F6" strokeWidth="1" />
        <line x1="0" y1="6" x2="0" y2="18" stroke="#7AA7F6" strokeWidth="1" />
        <motion.circle
          r="4"
          fill="none"
          stroke="#2EC46E"
          strokeWidth="1"
          initial={{ r: 4, opacity: 0.9 }}
          animate={reduce ? undefined : { r: [4, 10, 4], opacity: [0.9, 0, 0.9] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
        />
        <circle r="2.2" fill="#2EC46E" />
      </g>
    );
  }
  if (id === "structure") {
    // Nested contract brackets
    return (
      <g transform={`translate(${cx} ${cy})`}>
        <rect x="-16" y="-14" width="32" height="28" rx="2" fill="none" stroke="#3B72DE" strokeWidth="1" />
        <rect x="-11" y="-9" width="22" height="18" rx="1.5" fill="none" stroke="#7AA7F6" strokeWidth="0.6" opacity="0.6" />
        <line x1="-8" y1="-4" x2="8" y2="-4" stroke="#7AA7F6" strokeWidth="0.6" opacity="0.8" />
        <line x1="-8" y1="0" x2="4" y2="0" stroke="#7AA7F6" strokeWidth="0.55" opacity="0.65" />
        <line x1="-8" y1="4" x2="6" y2="4" stroke="#7AA7F6" strokeWidth="0.55" opacity="0.65" />
        <circle cx="0" cy="0" r="2.8" fill="#2EC46E">
          {!reduce && <animate attributeName="opacity" values="0.55;1;0.55" dur="1.6s" repeatCount="indefinite" />}
        </circle>
      </g>
    );
  }
  if (id === "place") {
    // Radial match wheel
    return (
      <g transform={`translate(${cx} ${cy})`}>
        <circle r="14" fill="none" stroke="#3B72DE" strokeWidth="0.55" opacity="0.45" />
        <motion.g
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "0px 0px" }}
        >
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <line
              key={a}
              x1="0"
              y1="0"
              x2={Math.cos((a * Math.PI) / 180) * 13}
              y2={Math.sin((a * Math.PI) / 180) * 13}
              stroke="#7AA7F6"
              strokeWidth="0.9"
              strokeLinecap="round"
              opacity="0.7"
            />
          ))}
        </motion.g>
        <circle r="4.6" fill="#070B14" stroke="#2EC46E" strokeWidth="1" />
        <circle r="1.6" fill="#2EC46E" />
      </g>
    );
  }
  // settle — vault / ledger
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <rect x="-14" y="-12" width="28" height="24" rx="2" fill="none" stroke="#3B72DE" strokeWidth="1" />
      <rect x="-10" y="-8" width="20" height="16" rx="1.5" fill="none" stroke="#7AA7F6" strokeWidth="0.55" opacity="0.6" />
      <motion.g
        style={{ transformOrigin: "0px 0px" }}
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <line x1="0" y1="0" x2="0" y2="-6" stroke="#2EC46E" strokeWidth="1.2" strokeLinecap="round" />
      </motion.g>
      <circle r="1.6" fill="#2EC46E" />
      <text y="-16" textAnchor="middle" fontSize="5.5" fontFamily="var(--font-mono)" fill="#7AA7F6" letterSpacing="1.2" opacity="0.7">
        ▲ WIRED
      </text>
    </g>
  );
}

export default function HowItWorksHero({ className }: Props) {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  // Cursor parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 16, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 55, damping: 16, mass: 0.6 });
  const pipelineX = useTransform(sx, [-1, 1], [-4, 4]);
  const pipelineY = useTransform(sy, [-1, 1], [-3, 3]);
  const gridX = useTransform(sx, [-1, 1], [3, -3]);
  const gridY = useTransform(sy, [-1, 1], [2, -2]);

  useEffect(() => {
    if (reduce) return;
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mx.set(Math.max(-1, Math.min(1, nx)));
      my.set(Math.max(-1, Math.min(1, ny)));
    };
    const onLeave = () => {
      mx.set(0);
      my.set(0);
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [mx, my, reduce]);

  // T-minus countdown
  const [count, setCount] = useState(172800);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setCount((c) => (c <= 0 ? 172800 : c - 1)), 60);
    return () => clearInterval(t);
  }, [reduce]);
  const h = Math.floor(count / 3600);
  const m = Math.floor((count % 3600) / 60);
  const s = count % 60;
  const stamp = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;

  // Ambient data particles travelling the rail
  const particles = Array.from({ length: 8 }, (_, i) => ({
    dur: 6 + seeded(i, 3) * 3,
    delay: seeded(i, 4) * 6,
    size: 0.9 + seeded(i, 5) * 0.6,
  }));

  return (
    <div ref={containerRef} className={className} style={{ width: "100%", height: "100%" }}>
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        role="img"
        aria-label="Four-stage pipeline — scope, structure, place, settle"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <defs>
          <linearGradient id="how-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#070B14" />
            <stop offset="50%" stopColor="#0A1326" />
            <stop offset="100%" stopColor="#050812" />
          </linearGradient>
          <radialGradient id="how-vignette" cx="50%" cy="50%" r="70%">
            <stop offset="55%" stopColor="transparent" />
            <stop offset="100%" stopColor="#02040A" stopOpacity="0.85" />
          </radialGradient>
          <linearGradient id="how-rail" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B72DE" stopOpacity="0.15" />
            <stop offset="30%" stopColor="#3B72DE" stopOpacity="0.75" />
            <stop offset="70%" stopColor="#2EC46E" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#2EC46E" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="how-capsule" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B72DE" />
            <stop offset="100%" stopColor="#2EC46E" />
          </linearGradient>
          <linearGradient id="how-capsule-hi" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <filter id="how-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="how-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <filter id="how-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.6" result="b" />
            <feOffset in="b" dy="2" result="o" />
            <feMerge>
              <feMergeNode in="o" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width={VB_W} height={VB_H} fill="url(#how-bg)" />
        <motion.g style={{ x: gridX, y: gridY }} opacity="0.18" stroke="#3B72DE" strokeWidth="0.28">
          {Array.from({ length: 40 }, (_, i) => (
            <line key={`gx${i}`} x1={i * 16} y1={0} x2={i * 16} y2={VB_H} opacity={i % 4 === 0 ? 0.55 : 0.3} />
          ))}
          {Array.from({ length: 18 }, (_, i) => (
            <line key={`gy${i}`} x1={0} y1={i * 16} x2={VB_W} y2={i * 16} opacity={i % 4 === 0 ? 0.55 : 0.3} />
          ))}
        </motion.g>
        <rect width={VB_W} height={VB_H} fill="url(#how-vignette)" pointerEvents="none" />

        {/* Corner framing */}
        {[
          [24, 24],
          [VB_W - 24, 24],
          [24, VB_H - 24],
          [VB_W - 24, VB_H - 24],
        ].map(([x, y], i) => (
          <g key={`cr${i}`} stroke="#3B72DE" strokeWidth="0.55" opacity="0.4">
            <line x1={x - 7} y1={y} x2={x + 7} y2={y} />
            <line x1={x} y1={y - 7} x2={x} y2={y + 7} />
          </g>
        ))}

        <motion.g style={{ x: pipelineX, y: pipelineY }}>
          {/* Rail — full pipeline spine */}
          <line x1="36" y1={RAIL_Y} x2={VB_W - 36} y2={RAIL_Y} stroke="url(#how-rail)" strokeWidth="1.8" />
          <line x1="36" y1={RAIL_Y} x2={VB_W - 36} y2={RAIL_Y} stroke="#3B72DE" strokeWidth="0.35" strokeDasharray="2 6" opacity="0.55" />
          {/* Rail tick marks */}
          {Array.from({ length: 41 }, (_, i) => {
            const x = 36 + i * ((VB_W - 72) / 40);
            const major = i % 5 === 0;
            return (
              <line
                key={`rtk${i}`}
                x1={x}
                y1={RAIL_Y - (major ? 5 : 2.5)}
                x2={x}
                y2={RAIL_Y + (major ? 5 : 2.5)}
                stroke={major ? "#7AA7F6" : "#3B72DE"}
                strokeWidth={major ? 0.5 : 0.3}
                opacity={major ? 0.55 : 0.32}
              />
            );
          })}

          {/* Directional arrows between stations */}
          {[0, 1, 2].map((i) => {
            const x = (STATIONS[i].x + STATIONS[i + 1].x) / 2;
            return (
              <g key={`arrow${i}`}>
                <polygon
                  points={`${x - 4},${RAIL_Y - 4} ${x + 5},${RAIL_Y} ${x - 4},${RAIL_Y + 4}`}
                  fill="#2EC46E"
                  opacity="0.75"
                  filter="url(#how-glow)"
                />
              </g>
            );
          })}

          {/* Stations */}
          {STATIONS.map((st, idx) => (
            <g key={st.id}>
              {/* Soft glow pad */}
              <circle cx={st.x} cy={RAIL_Y} r="38" fill="#3B72DE" opacity="0.08" filter="url(#how-soft)" />
              {/* Station body */}
              <circle cx={st.x} cy={RAIL_Y} r="30" fill="#0A1326" stroke="rgba(59,114,222,0.55)" strokeWidth="0.9" />
              <circle cx={st.x} cy={RAIL_Y} r="30" fill="url(#how-vignette)" opacity="0.3" />
              <circle cx={st.x} cy={RAIL_Y} r="26" fill="none" stroke="#3B72DE" strokeWidth="0.35" opacity="0.45" strokeDasharray="1 3" />

              <StationIcon id={st.id} cx={st.x} cy={RAIL_Y} reduce={!!reduce} />

              {/* Step number chip */}
              <g transform={`translate(${st.x - 22} ${RAIL_Y - 44})`}>
                <rect x="0" y="0" width="28" height="12" rx="2.5" fill="#0A1326" stroke="rgba(46,196,110,0.55)" strokeWidth="0.6" />
                <text
                  x="14"
                  y="9"
                  textAnchor="middle"
                  fontSize="7"
                  fontFamily="var(--font-mono)"
                  fill="#2EC46E"
                  letterSpacing="1.6"
                  fontWeight="500"
                >
                  {st.stepNum}
                </text>
              </g>

              {/* Label */}
              <text
                x={st.x}
                y={RAIL_Y + 54}
                textAnchor="middle"
                fontSize="9.5"
                fontFamily="var(--font-mono)"
                fill="#F4F5F8"
                letterSpacing="2.8"
                fontWeight="500"
                paintOrder="stroke"
                stroke="#03060C"
                strokeWidth="1.1"
                strokeLinejoin="round"
              >
                {st.label}
              </text>
              <text
                x={st.x}
                y={RAIL_Y + 66}
                textAnchor="middle"
                fontSize="6.5"
                fontFamily="var(--font-mono)"
                fill="#6A7A99"
                letterSpacing="1.8"
              >
                {st.sub}
              </text>

              {/* Progress bar under station */}
              <rect x={st.x - 28} y={RAIL_Y + 74} width="56" height="3" rx="1.5" fill="#0A1326" stroke="rgba(59,114,222,0.3)" strokeWidth="0.4" />
              {!reduce && (
                <rect x={st.x - 28} y={RAIL_Y + 74} width="56" height="3" rx="1.5" fill="#2EC46E" opacity="0.88">
                  <animate attributeName="width" values="0;56;56;0" dur="4.2s" begin={`${idx * 0.85}s`} repeatCount="indefinite" />
                </rect>
              )}

              {/* Telemetry ticks above station */}
              {Array.from({ length: 6 }, (_, i) => (
                <line
                  key={`ttk${idx}${i}`}
                  x1={st.x - 15 + i * 6}
                  y1={RAIL_Y - 58}
                  x2={st.x - 15 + i * 6}
                  y2={RAIL_Y - 58 + (i % 2 === 0 ? 3 : 1.6)}
                  stroke="#3B72DE"
                  strokeWidth="0.4"
                  opacity="0.45"
                />
              ))}
            </g>
          ))}

          {/* Contract capsules travelling the rail */}
          {!reduce &&
            [0, 1, 2].map((i) => (
              <motion.g
                key={`caps${i}`}
                initial={{ x: 36, opacity: 0 }}
                animate={{ x: [36, VB_W - 72], opacity: [0, 1, 1, 1, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "linear", delay: i * 2.3, times: [0, 0.08, 0.5, 0.92, 1] }}
                filter="url(#how-shadow)"
              >
                <rect x="-16" y={RAIL_Y - 9} width="32" height="18" rx="9" fill="url(#how-capsule)" opacity="0.95" />
                <rect x="-14" y={RAIL_Y - 7} width="28" height="7" rx="3.5" fill="url(#how-capsule-hi)" />
                <text y={RAIL_Y + 3} textAnchor="middle" fontSize="6" fontFamily="var(--font-mono)" fill="#03060C" letterSpacing="1.2" fontWeight="600">
                  RX-{String(100 + i * 37).padStart(3, "0")}
                </text>
              </motion.g>
            ))}

          {/* Ambient data particles — small dots zipping the rail */}
          {!reduce &&
            particles.map((p, i) => (
              <circle key={`dp${i}`} r={p.size} fill="#7AA7F6" opacity="0" filter="url(#how-glow)">
                <animateMotion dur={`${p.dur}s`} begin={`${p.delay}s`} repeatCount="indefinite" path={`M 36 ${RAIL_Y - 18} L ${VB_W - 36} ${RAIL_Y - 18}`} />
                <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.15;0.85;1" dur={`${p.dur}s`} begin={`${p.delay}s`} repeatCount="indefinite" />
              </circle>
            ))}
        </motion.g>

        {/* T-minus chip — top right */}
        <g transform={`translate(${VB_W - 92} 22)`}>
          <rect x="0" y="0" width="76" height="28" rx="3.5" fill="#0A1326" stroke="rgba(46,196,110,0.55)" strokeWidth="0.8" />
          <rect x="1" y="1" width="74" height="12" rx="3" fill="rgba(255,255,255,0.04)" />
          <text x="38" y="10" textAnchor="middle" fontSize="6" fontFamily="var(--font-mono)" fill="#8AB4F8" letterSpacing="1.8">
            T-MINUS
          </text>
          <text x="38" y="22" textAnchor="middle" fontSize="9" fontFamily="var(--font-mono)" fill="#2EC46E" letterSpacing="2" fontWeight="500">
            {stamp}
          </text>
        </g>

        {/* Pipeline label — top left */}
        <g transform="translate(22 22)">
          <rect x="0" y="0" width="140" height="28" rx="3.5" fill="#0A1326" stroke="rgba(59,114,222,0.5)" strokeWidth="0.8" />
          <circle cx="10" cy="14" r="2.6" fill="#2EC46E" filter="url(#how-glow)">
            {!reduce && <animate attributeName="opacity" values="0.5;1;0.5" dur="1.6s" repeatCount="indefinite" />}
          </circle>
          <text x="20" y="11" fontSize="6.5" fontFamily="var(--font-mono)" fill="#8AB4F8" letterSpacing="2">
            PIPELINE · 04 STAGES
          </text>
          <text x="20" y="22" fontSize="6.5" fontFamily="var(--font-mono)" fill="#C7D4F0" letterSpacing="1.8">
            CONTRACT IN FLIGHT
          </text>
        </g>

        {/* Footer ledger line */}
        <g transform={`translate(22 ${VB_H - 18})`} opacity="0.7">
          <text fontSize="6.5" fontFamily="var(--font-mono)" fill="#6A7A99" letterSpacing="1.8">
            SCOPE → STRUCTURE → PLACE → SETTLE · T+48H TERMINAL · ISDA COMPLIANT
          </text>
        </g>
      </svg>
    </div>
  );
}
