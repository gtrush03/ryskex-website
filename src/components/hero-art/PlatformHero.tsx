// Platform hero — parametric exchange schematic.
// Clean engineering lines, technical grid, flowing capital between
// CEDENT → EXCHANGE CORE → CAPITAL, live VUCAWRI ticker, settlement chip,
// trigger waveform, cursor-aware parallax drift on the core engine.

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

interface Props {
  className?: string;
}

const VB_W = 560;
const VB_H = 360;

const HUBS = [
  { id: "cedent", label: "CEDENT", sub: "CAPTIVE / CELL", x: 88, y: 180, r: 44 },
  { id: "core", label: "EXCHANGE CORE", sub: "RYSKEX RAIL", x: 280, y: 180, r: 60 },
  { id: "capital", label: "CAPITAL", sub: "144A BUYERS", x: 472, y: 180, r: 44 },
] as const;

function seeded(i: number, salt: number): number {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

// Triangular waveform sample — evokes parametric trigger / index.
function triggerWave(x: number): number {
  const t = (x + 40) * 0.045;
  return (
    Math.sin(t) * 6 +
    Math.sin(t * 2.3) * 3 +
    Math.sin(t * 4.7) * 1.4
  );
}

export default function PlatformHero({ className }: Props) {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  // Cursor-aware parallax — each layer drifts a different amount.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });
  const coreX = useTransform(sx, [-1, 1], [-6, 6]);
  const coreY = useTransform(sy, [-1, 1], [-4, 4]);
  const ringX = useTransform(sx, [-1, 1], [-12, 12]);
  const ringY = useTransform(sy, [-1, 1], [-8, 8]);
  const gridX = useTransform(sx, [-1, 1], [2, -2]);
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

  // Live VUCAWRI tick.
  const [vuca, setVuca] = useState(0.617);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => {
      setVuca((v) => {
        const next = v + (Math.random() - 0.5) * 0.012;
        return Math.max(0.55, Math.min(0.7, next));
      });
    }, 1200);
    return () => clearInterval(t);
  }, [reduce]);

  // Basis-risk floor histogram bars.
  const bars = Array.from({ length: 18 }, (_, i) => ({
    x: 40 + i * 14,
    h: 6 + Math.abs(triggerWave(i * 14)) * 1.2 + seeded(i, 3) * 4,
    delay: i * 0.08,
  }));

  // Capital flows — CEDENT→CORE→CAPITAL and a feedback return stream.
  const flows = [
    { from: HUBS[0], to: HUBS[1], delay: 0.0, bow: -70, color: "#7AA7F6" },
    { from: HUBS[0], to: HUBS[1], delay: 1.6, bow: 60, color: "#3B72DE" },
    { from: HUBS[1], to: HUBS[2], delay: 0.6, bow: -70, color: "#2EC46E" },
    { from: HUBS[1], to: HUBS[2], delay: 2.2, bow: 60, color: "#3FD582" },
    { from: HUBS[2], to: HUBS[1], delay: 1.2, bow: 86, color: "#7AA7F6" },
  ];

  return (
    <div ref={containerRef} className={className} style={{ width: "100%", height: "100%" }}>
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        role="img"
        aria-label="RYSKEX parametric exchange schematic — cedent, exchange core, capital"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <defs>
          <linearGradient id="plat-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#070B14" />
            <stop offset="50%" stopColor="#0A1326" />
            <stop offset="100%" stopColor="#050812" />
          </linearGradient>
          <radialGradient id="plat-vignette" cx="50%" cy="50%" r="70%">
            <stop offset="60%" stopColor="transparent" />
            <stop offset="100%" stopColor="#02040A" stopOpacity="0.85" />
          </radialGradient>
          <linearGradient id="plat-rail" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B72DE" stopOpacity="0.15" />
            <stop offset="35%" stopColor="#3B72DE" stopOpacity="0.8" />
            <stop offset="65%" stopColor="#2EC46E" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#2EC46E" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="plat-flow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B72DE" stopOpacity="0" />
            <stop offset="50%" stopColor="#7AA7F6" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#2EC46E" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="plat-hubfill" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1D4A9A" stopOpacity="0.7" />
            <stop offset="65%" stopColor="#0A1326" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#070B14" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="plat-core-spec" cx="40%" cy="35%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.22" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <filter id="plat-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="plat-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
          <clipPath id="plat-floor-clip">
            <rect x="32" y="296" width="496" height="36" rx="2" />
          </clipPath>
        </defs>

        {/* Background + engineering grid */}
        <rect width={VB_W} height={VB_H} fill="url(#plat-bg)" />
        <motion.g style={{ x: gridX, y: gridY }} opacity="0.22">
          {Array.from({ length: 36 }, (_, i) => (
            <line key={`gx${i}`} x1={i * 16} y1={0} x2={i * 16} y2={VB_H} stroke="#3B72DE" strokeWidth={i % 4 === 0 ? 0.4 : 0.22} opacity={i % 4 === 0 ? 0.6 : 0.32} />
          ))}
          {Array.from({ length: 24 }, (_, i) => (
            <line key={`gy${i}`} x1={0} y1={i * 16} x2={VB_W} y2={i * 16} stroke="#3B72DE" strokeWidth={i % 4 === 0 ? 0.4 : 0.22} opacity={i % 4 === 0 ? 0.6 : 0.32} />
          ))}
        </motion.g>
        <rect width={VB_W} height={VB_H} fill="url(#plat-vignette)" pointerEvents="none" />

        {/* Corner crosshairs — technical drawing marks */}
        {[
          [24, 24],
          [VB_W - 24, 24],
          [24, VB_H - 24],
          [VB_W - 24, VB_H - 24],
        ].map(([x, y], i) => (
          <g key={`cross${i}`} stroke="#3B72DE" strokeWidth="0.6" opacity="0.45">
            <line x1={x - 7} y1={y} x2={x + 7} y2={y} />
            <line x1={x} y1={y - 7} x2={x} y2={y + 7} />
            <circle cx={x} cy={y} r="2.2" fill="none" />
          </g>
        ))}

        {/* Central rail — the exchange spine */}
        <g>
          <line x1={HUBS[0].x} y1={180} x2={HUBS[2].x} y2={180} stroke="url(#plat-rail)" strokeWidth="1.6" />
          <line x1={HUBS[0].x} y1={180} x2={HUBS[2].x} y2={180} stroke="#3B72DE" strokeWidth="0.4" strokeDasharray="2 5" opacity="0.55" />
          {/* rail tick marks */}
          {Array.from({ length: 25 }, (_, i) => {
            const x = HUBS[0].x + i * ((HUBS[2].x - HUBS[0].x) / 24);
            const major = i % 4 === 0;
            return (
              <line
                key={`rt${i}`}
                x1={x}
                y1={180 - (major ? 6 : 3)}
                x2={x}
                y2={180 + (major ? 6 : 3)}
                stroke={major ? "#7AA7F6" : "#3B72DE"}
                strokeWidth={major ? 0.55 : 0.3}
                opacity={major ? 0.6 : 0.35}
              />
            );
          })}
        </g>

        {/* Capital flows — quadratic arcs with travelling packets */}
        {flows.map((f, i) => {
          const mxp = (f.from.x + f.to.x) / 2;
          const myp = 180 + f.bow;
          const d = `M ${f.from.x} ${f.from.y} Q ${mxp} ${myp} ${f.to.x} ${f.to.y}`;
          return (
            <g key={`flow${i}`}>
              <path d={d} fill="none" stroke={f.color} strokeWidth="1.4" opacity="0.12" filter="url(#plat-soft)" />
              <path d={d} fill="none" stroke="url(#plat-flow)" strokeWidth="0.9" opacity="0.55" strokeLinecap="round" />
              {!reduce && (
                <path d={d} fill="none" stroke="#CBDDFB" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="3 140" filter="url(#plat-glow)">
                  <animate attributeName="stroke-dashoffset" from="0" to="-143" dur="5.4s" begin={`${f.delay}s`} repeatCount="indefinite" />
                </path>
              )}
              {!reduce && (
                <circle r="2.6" fill={f.color} filter="url(#plat-glow)">
                  <animateMotion dur="5.4s" begin={`${f.delay}s`} repeatCount="indefinite" path={d} />
                  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.12;0.88;1" dur="5.4s" begin={`${f.delay}s`} repeatCount="indefinite" />
                </circle>
              )}
            </g>
          );
        })}

        {/* Hubs — CEDENT and CAPITAL (outer) */}
        {[HUBS[0], HUBS[2]].map((hub) => {
          const accent = "#3B72DE";
          return (
            <g key={hub.id}>
              {[1.6, 1.3, 1].map((s, i) => (
                <circle
                  key={i}
                  cx={hub.x}
                  cy={hub.y}
                  r={hub.r * s}
                  fill="none"
                  stroke={accent}
                  strokeWidth={i === 2 ? 1 : 0.45}
                  opacity={i === 2 ? 0.85 : 0.22}
                  strokeDasharray={i === 0 ? "2 4" : "0"}
                />
              ))}
              <circle cx={hub.x} cy={hub.y} r={hub.r * 0.62} fill="url(#plat-hubfill)" opacity="0.85" />
              {/* spoke armature */}
              {Array.from({ length: 8 }, (_, i) => {
                const a = (Math.PI / 4) * i;
                return (
                  <line
                    key={i}
                    x1={hub.x + Math.cos(a) * (hub.r * 0.22)}
                    y1={hub.y + Math.sin(a) * (hub.r * 0.22)}
                    x2={hub.x + Math.cos(a) * (hub.r * 0.6)}
                    y2={hub.y + Math.sin(a) * (hub.r * 0.6)}
                    stroke={accent}
                    strokeWidth="0.4"
                    opacity="0.42"
                  />
                );
              })}
              <circle cx={hub.x} cy={hub.y} r="3.6" fill={accent} filter="url(#plat-glow)" />
              <text
                x={hub.x}
                y={hub.y + hub.r + 22}
                textAnchor="middle"
                fontSize="9"
                fontFamily="var(--font-mono)"
                fill="#C7D4F0"
                letterSpacing="2.4"
                paintOrder="stroke"
                stroke="#03060C"
                strokeWidth="1"
                strokeLinejoin="round"
              >
                {hub.label}
              </text>
              <text
                x={hub.x}
                y={hub.y + hub.r + 33}
                textAnchor="middle"
                fontSize="6.5"
                fontFamily="var(--font-mono)"
                fill="#6A7A99"
                letterSpacing="1.8"
              >
                {hub.sub}
              </text>
            </g>
          );
        })}

        {/* Exchange Core — cursor-responsive center engine */}
        <motion.g style={{ x: coreX, y: coreY }}>
          <motion.g
            style={{ originX: `${HUBS[1].x}px`, originY: `${HUBS[1].y}px`, transformBox: "fill-box" }}
            animate={reduce ? undefined : { scale: [1, 1.04, 1] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Outer rotating ticks */}
            <motion.g
              style={{ originX: `${HUBS[1].x}px`, originY: `${HUBS[1].y}px` }}
              animate={reduce ? undefined : { rotate: 360 }}
              transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
            >
              <circle cx={HUBS[1].x} cy={HUBS[1].y} r={HUBS[1].r * 1.55} fill="none" stroke="#3B72DE" strokeWidth="0.35" opacity="0.35" strokeDasharray="3 4" />
              {Array.from({ length: 32 }, (_, i) => {
                const a = (i / 32) * Math.PI * 2;
                const rr = HUBS[1].r * 1.55;
                const major = i % 4 === 0;
                const len = major ? 6 : 2.5;
                return (
                  <line
                    key={`otick${i}`}
                    x1={HUBS[1].x + Math.cos(a) * rr}
                    y1={HUBS[1].y + Math.sin(a) * rr}
                    x2={HUBS[1].x + Math.cos(a) * (rr + len)}
                    y2={HUBS[1].y + Math.sin(a) * (rr + len)}
                    stroke={major ? "#7AA7F6" : "#3B72DE"}
                    strokeWidth={major ? 0.55 : 0.3}
                    opacity={major ? 0.6 : 0.35}
                  />
                );
              })}
            </motion.g>

            <motion.g style={{ x: ringX, y: ringY }}>
              <circle cx={HUBS[1].x} cy={HUBS[1].y} r={HUBS[1].r * 1.3} fill="none" stroke="#2EC46E" strokeWidth="0.45" opacity="0.35" strokeDasharray="1 3" />
              <circle cx={HUBS[1].x} cy={HUBS[1].y} r={HUBS[1].r * 1.15} fill="none" stroke="#2EC46E" strokeWidth="0.6" opacity="0.55" />
            </motion.g>

            <circle cx={HUBS[1].x} cy={HUBS[1].y} r={HUBS[1].r} fill="#0A1326" stroke="#2EC46E" strokeWidth="1.1" opacity="0.95" />
            <circle cx={HUBS[1].x} cy={HUBS[1].y} r={HUBS[1].r} fill="url(#plat-hubfill)" opacity="0.9" />
            <circle cx={HUBS[1].x} cy={HUBS[1].y} r={HUBS[1].r} fill="url(#plat-core-spec)" />

            {/* Internal compass armature */}
            {Array.from({ length: 12 }, (_, i) => {
              const a = (Math.PI / 6) * i;
              const major = i % 3 === 0;
              return (
                <line
                  key={`cspoke${i}`}
                  x1={HUBS[1].x + Math.cos(a) * (HUBS[1].r * 0.18)}
                  y1={HUBS[1].y + Math.sin(a) * (HUBS[1].r * 0.18)}
                  x2={HUBS[1].x + Math.cos(a) * (HUBS[1].r * (major ? 0.7 : 0.55))}
                  y2={HUBS[1].y + Math.sin(a) * (HUBS[1].r * (major ? 0.7 : 0.55))}
                  stroke={major ? "#2EC46E" : "#3B72DE"}
                  strokeWidth={major ? 0.55 : 0.32}
                  opacity={major ? 0.7 : 0.4}
                />
              );
            })}

            {/* Inner crystal diamond */}
            <g transform={`translate(${HUBS[1].x} ${HUBS[1].y})`}>
              <polygon points="0,-18 16,0 0,18 -16,0" fill="none" stroke="#2EC46E" strokeWidth="0.9" opacity="0.85" />
              <polygon points="0,-12 10,0 0,12 -10,0" fill="none" stroke="#7AA7F6" strokeWidth="0.7" opacity="0.7" />
              <circle r="4.2" fill="#2EC46E" filter="url(#plat-glow)">
                {!reduce && <animate attributeName="opacity" values="0.55;1;0.55" dur="1.8s" repeatCount="indefinite" />}
              </circle>
              <circle r="1.4" fill="#F4F5F8" />
            </g>

            {/* Radial "trigger armed" sweep */}
            {!reduce && (
              <motion.g
                style={{ originX: `${HUBS[1].x}px`, originY: `${HUBS[1].y}px` }}
                animate={{ rotate: 360 }}
                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
              >
                <path
                  d={`M ${HUBS[1].x} ${HUBS[1].y} L ${HUBS[1].x + HUBS[1].r} ${HUBS[1].y} A ${HUBS[1].r} ${HUBS[1].r} 0 0 0 ${HUBS[1].x + HUBS[1].r * Math.cos(-Math.PI / 5)} ${HUBS[1].y + HUBS[1].r * Math.sin(-Math.PI / 5)} Z`}
                  fill="#2EC46E"
                  opacity="0.12"
                />
              </motion.g>
            )}
          </motion.g>

          <text
            x={HUBS[1].x}
            y={HUBS[1].y + HUBS[1].r + 22}
            textAnchor="middle"
            fontSize="9"
            fontFamily="var(--font-mono)"
            fill="#F4F5F8"
            letterSpacing="2.6"
            paintOrder="stroke"
            stroke="#03060C"
            strokeWidth="1.1"
            strokeLinejoin="round"
          >
            EXCHANGE CORE
          </text>
          <text
            x={HUBS[1].x}
            y={HUBS[1].y + HUBS[1].r + 33}
            textAnchor="middle"
            fontSize="6.5"
            fontFamily="var(--font-mono)"
            fill="#6A7A99"
            letterSpacing="1.8"
          >
            RYSKEX RAIL
          </text>
        </motion.g>

        {/* Trigger waveform strip — bottom */}
        <g transform="translate(0 260)" opacity="0.88">
          <line x1="32" y1="0" x2="528" y2="0" stroke="#3B72DE" strokeWidth="0.4" opacity="0.5" strokeDasharray="1 4" />
          <path
            d={`M 32 0 ${Array.from({ length: 120 }, (_, i) => {
              const x = 32 + i * ((528 - 32) / 119);
              const y = triggerWave(x);
              return `L ${x.toFixed(2)} ${y.toFixed(2)}`;
            }).join(" ")}`}
            fill="none"
            stroke="#2EC46E"
            strokeWidth="1.1"
            opacity="0.8"
            filter="url(#plat-glow)"
          />
          <text x="32" y="-8" fontSize="6.5" fontFamily="var(--font-mono)" fill="#8AB4F8" letterSpacing="1.8">
            TRIGGER · PARAMETRIC INDEX · LIVE
          </text>
          <text x="528" y="-8" textAnchor="end" fontSize="6.5" fontFamily="var(--font-mono)" fill="#6A7A99" letterSpacing="1.4">
            Δ 00.0312
          </text>
        </g>

        {/* Basis-risk histogram floor */}
        <g clipPath="url(#plat-floor-clip)">
          <rect x="32" y="296" width="496" height="36" fill="#0A1326" opacity="0.5" />
          {bars.map((b, i) => (
            <g key={`bar${i}`}>
              <rect x={b.x} y={332 - b.h} width="8" height={b.h} fill="#3B72DE" opacity="0.55" />
              <rect x={b.x} y={332 - b.h} width="8" height="1" fill="#2EC46E" opacity="0.85" />
              {!reduce && (
                <rect x={b.x} y={332 - b.h - 2} width="8" height="2" fill="#2EC46E" opacity="0">
                  <animate attributeName="opacity" values="0;0.7;0" dur="1.6s" begin={`${b.delay}s`} repeatCount="indefinite" />
                </rect>
              )}
            </g>
          ))}
        </g>

        {/* VUCAWRI live chip — top-left */}
        <g transform="translate(16 16)">
          <rect x="0" y="0" width="140" height="32" rx="4" fill="#0A1326" opacity="0.92" stroke="rgba(59,114,222,0.5)" strokeWidth="0.8" />
          <rect x="1" y="1" width="138" height="14" rx="3" fill="rgba(255,255,255,0.04)" />
          <circle cx="10" cy="10" r="2.6" fill="#2EC46E" filter="url(#plat-glow)">
            {!reduce && <animate attributeName="opacity" values="0.5;1;0.5" dur="1.6s" repeatCount="indefinite" />}
          </circle>
          <text x="20" y="12" fontSize="6.5" fontFamily="var(--font-mono)" fill="#8AB4F8" letterSpacing="2">
            VUCAWRI · LIVE
          </text>
          <text x="10" y="26" fontSize="11" fontFamily="var(--font-mono)" fill="#2EC46E" letterSpacing="2.4" fontWeight="500">
            {vuca.toFixed(3)}
          </text>
          <text x="96" y="26" fontSize="6.5" fontFamily="var(--font-mono)" fill="#6A7A99" letterSpacing="1.4">
            ±0.008
          </text>
        </g>

        {/* Settlement chip — top-right */}
        <g transform={`translate(${VB_W - 156} 16)`}>
          <rect x="0" y="0" width="140" height="32" rx="4" fill="#0A1326" opacity="0.92" stroke="rgba(46,196,110,0.45)" strokeWidth="0.8" />
          <rect x="1" y="1" width="138" height="14" rx="3" fill="rgba(255,255,255,0.04)" />
          <text x="10" y="12" fontSize="6.5" fontFamily="var(--font-mono)" fill="#8AB4F8" letterSpacing="2">
            T+48H SETTLEMENT
          </text>
          <text x="10" y="26" fontSize="7" fontFamily="var(--font-mono)" fill="#C7D4F0" letterSpacing="2">
            ISDA · FIX 5.0 · SOL
          </text>
        </g>

        {/* Flow direction arrowheads */}
        <g opacity="0.7">
          <polygon points={`${HUBS[1].x - HUBS[1].r - 4},180 ${HUBS[1].x - HUBS[1].r - 10},176 ${HUBS[1].x - HUBS[1].r - 10},184`} fill="#2EC46E" />
          <polygon points={`${HUBS[2].x - HUBS[2].r - 4},180 ${HUBS[2].x - HUBS[2].r - 10},176 ${HUBS[2].x - HUBS[2].r - 10},184`} fill="#2EC46E" />
        </g>
      </svg>
    </div>
  );
}
