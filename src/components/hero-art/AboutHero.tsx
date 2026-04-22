// About hero — institutional mission seal: a founding-era medallion with
// three luminous pillars (MISSION · VISION · TECHNOLOGY), editorial
// cartography beneath, a data-lineage ribbon spiralling out, warm cobalt
// with a subtle gold inflection, and cursor-aware parallax on the core seal.

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

interface Props {
  className?: string;
}

const VB = 480;
const CX = VB / 2;
const CY = VB / 2;
const R_SEAL = 140;

interface Pillar {
  id: string;
  label: string;
  sub: string;
  angle: number;
  color: string;
}

const PILLARS: Pillar[] = [
  { id: "mission", label: "MISSION", sub: "RAIL / CAPITAL", angle: -90, color: "#3B72DE" },
  { id: "vision", label: "VISION", sub: "TRADABLE PERILS", angle: 30, color: "#2EC46E" },
  { id: "technology", label: "TECHNOLOGY", sub: "PARAMETRIC CORE", angle: 150, color: "#C9A25E" },
];

function seeded(i: number, salt: number): number {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function polar(cx: number, cy: number, r: number, a: number) {
  const rad = (a * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export default function AboutHero({ className }: Props) {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 18, mass: 0.7 });
  const sy = useSpring(my, { stiffness: 50, damping: 18, mass: 0.7 });
  const sealX = useTransform(sx, [-1, 1], [-5, 5]);
  const sealY = useTransform(sy, [-1, 1], [-4, 4]);
  const ringX = useTransform(sx, [-1, 1], [-10, 10]);
  const ringY = useTransform(sy, [-1, 1], [-8, 8]);
  const starfieldX = useTransform(sx, [-1, 1], [4, -4]);
  const starfieldY = useTransform(sy, [-1, 1], [3, -3]);

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

  // Dense starfield background
  const stars = Array.from({ length: 54 }, (_, i) => ({
    cx: 6 + seeded(i, 1) * (VB - 12),
    cy: 6 + seeded(i, 2) * (VB - 12),
    r: 0.25 + seeded(i, 3) * 1.1,
    delay: seeded(i, 4) * 4,
    dur: 2.4 + seeded(i, 5) * 3,
    opacity: 0.35 + seeded(i, 6) * 0.55,
  }));

  // Editorial timeline dates around the lower arc — founding to vision
  const eras = ["2022", "2023", "2024", "2025", "2026", "2027"];

  return (
    <div ref={containerRef} className={className} style={{ width: "100%", height: "100%" }}>
      <svg
        viewBox={`0 0 ${VB} ${VB}`}
        role="img"
        aria-label="RYSKEX institutional seal — mission, vision, technology"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <defs>
          <radialGradient id="about-space" cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor="#0F1D38" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#070B14" />
            <stop offset="100%" stopColor="#02050B" />
          </radialGradient>
          <radialGradient id="about-goldglow" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#E8C988" stopOpacity="0.22" />
            <stop offset="50%" stopColor="#C9A25E" stopOpacity="0.08" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="about-cobaltglow" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#3B72DE" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#3B72DE" stopOpacity="0.05" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="about-core" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#F2E2BE" stopOpacity="0.9" />
            <stop offset="25%" stopColor="#C9A25E" stopOpacity="0.65" />
            <stop offset="60%" stopColor="#3B72DE" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#070B14" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="about-coreinner" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#E8C988" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#3B72DE" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="about-ribbon" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B72DE" stopOpacity="0" />
            <stop offset="45%" stopColor="#7AA7F6" stopOpacity="0.75" />
            <stop offset="55%" stopColor="#E8C988" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#2EC46E" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="about-rule" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C9A25E" stopOpacity="0" />
            <stop offset="50%" stopColor="#C9A25E" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#C9A25E" stopOpacity="0" />
          </linearGradient>
          <filter id="about-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.8" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="about-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
          <filter id="about-softlg" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="22" />
          </filter>
          <filter id="about-grain" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="7" />
            <feColorMatrix values="0 0 0 0 0.78  0 0 0 0 0.63  0 0 0 0 0.37  0 0 0 0.14 0" />
            <feComposite in2="SourceGraphic" operator="in" />
          </filter>
          <clipPath id="about-seal-clip">
            <circle cx={CX} cy={CY} r={R_SEAL} />
          </clipPath>
          <path id="about-upper-arc" d={`M ${CX - R_SEAL - 24} ${CY} A ${R_SEAL + 24} ${R_SEAL + 24} 0 0 1 ${CX + R_SEAL + 24} ${CY}`} />
          <path id="about-lower-arc" d={`M ${CX - R_SEAL - 24} ${CY} A ${R_SEAL + 24} ${R_SEAL + 24} 0 0 0 ${CX + R_SEAL + 24} ${CY}`} />
        </defs>

        {/* Deep space ground */}
        <rect width={VB} height={VB} fill="url(#about-space)" />
        <rect width={VB} height={VB} fill="url(#about-cobaltglow)" opacity="0.85" />
        <rect width={VB} height={VB} fill="url(#about-goldglow)" opacity="0.9" />

        {/* Starfield */}
        <motion.g style={{ x: starfieldX, y: starfieldY }}>
          {stars.map((s, i) => (
            <circle key={`s${i}`} cx={s.cx} cy={s.cy} r={s.r} fill={i % 7 === 0 ? "#E8C988" : "#D6E1F5"} opacity={s.opacity}>
              {!reduce && (
                <animate
                  attributeName="opacity"
                  values={`${(s.opacity * 0.25).toFixed(2)};${s.opacity.toFixed(2)};${(s.opacity * 0.25).toFixed(2)}`}
                  dur={`${s.dur}s`}
                  begin={`${s.delay}s`}
                  repeatCount="indefinite"
                />
              )}
            </circle>
          ))}
        </motion.g>

        {/* Outer atmospheric bloom */}
        <circle cx={CX} cy={CY} r={R_SEAL + 44} fill="#3B72DE" opacity="0.12" filter="url(#about-softlg)" />
        <circle cx={CX} cy={CY} r={R_SEAL + 28} fill="#C9A25E" opacity="0.08" filter="url(#about-soft)" />

        {/* Upper curved text — editorial */}
        <text fontSize="9.5" fontFamily="var(--font-serif, var(--font-mono))" fill="#E8C988" letterSpacing="5.4" fontWeight="500">
          <textPath href="#about-upper-arc" startOffset="50%" textAnchor="middle">
            RYSKEX · PARAMETRIC RISK EXCHANGE
          </textPath>
        </text>

        {/* Lower curved timeline — eras */}
        <text fontSize="7.5" fontFamily="var(--font-mono)" fill="#7AA7F6" letterSpacing="3.4">
          <textPath href="#about-lower-arc" startOffset="50%" textAnchor="middle">
            {eras.join(" · ")}
          </textPath>
        </text>

        {/* Counter-rotating cartographic ring */}
        <motion.g
          style={{ originX: `${CX}px`, originY: `${CY}px` }}
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
        >
          <circle cx={CX} cy={CY} r={R_SEAL + 18} fill="none" stroke="#C9A25E" strokeWidth="0.35" opacity="0.6" strokeDasharray="2 4" />
          {Array.from({ length: 72 }, (_, i) => {
            const a = (i / 72) * 360 - 90;
            const major = i % 9 === 0;
            const inner = R_SEAL + 18;
            const outer = R_SEAL + 18 + (major ? 6 : 2.5);
            const p1 = polar(CX, CY, inner, a);
            const p2 = polar(CX, CY, outer, a);
            return <line key={`ring${i}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={major ? "#E8C988" : "#C9A25E"} strokeWidth={major ? 0.55 : 0.3} opacity={major ? 0.75 : 0.4} />;
          })}
        </motion.g>

        {/* Secondary inner ring — opposite rotation */}
        <motion.g
          style={{ originX: `${CX}px`, originY: `${CY}px` }}
          animate={reduce ? undefined : { rotate: -360 }}
          transition={{ duration: 240, repeat: Infinity, ease: "linear" }}
        >
          <motion.g style={{ x: ringX, y: ringY }}>
            <circle cx={CX} cy={CY} r={R_SEAL + 8} fill="none" stroke="#3B72DE" strokeWidth="0.5" opacity="0.55" />
            <circle cx={CX} cy={CY} r={R_SEAL + 4} fill="none" stroke="#3B72DE" strokeWidth="0.35" opacity="0.35" strokeDasharray="1 3" />
          </motion.g>
        </motion.g>

        {/* The Seal — core medallion */}
        <motion.g style={{ x: sealX, y: sealY }}>
          {/* Seal face */}
          <circle cx={CX} cy={CY} r={R_SEAL} fill="#0A1326" stroke="#C9A25E" strokeWidth="1.2" opacity="0.92" />
          <circle cx={CX} cy={CY} r={R_SEAL} fill="url(#about-core)" opacity="0.55" />

          <g clipPath="url(#about-seal-clip)">
            {/* Subtle paper grain */}
            <circle cx={CX} cy={CY} r={R_SEAL} fill="#C9A25E" filter="url(#about-grain)" opacity="0.5" />
            {/* Parallels for cartographic feel */}
            {Array.from({ length: 9 }, (_, i) => {
              const lat = -60 + i * 15;
              const rx = R_SEAL * Math.cos((lat * Math.PI) / 180);
              const cy = CY - R_SEAL * Math.sin((lat * Math.PI) / 180) * 0.35;
              return (
                <ellipse
                  key={`par${i}`}
                  cx={CX}
                  cy={cy}
                  rx={Math.max(0.1, rx)}
                  ry={Math.max(0.1, rx * 0.15)}
                  fill="none"
                  stroke="#3B72DE"
                  strokeWidth="0.35"
                  opacity={0.25 + 0.25 * (1 - Math.abs(lat) / 90)}
                  strokeDasharray="1 3"
                />
              );
            })}
            {Array.from({ length: 12 }, (_, i) => {
              const rot = (180 / 12) * i;
              return (
                <ellipse
                  key={`mer${i}`}
                  cx={CX}
                  cy={CY}
                  rx={R_SEAL}
                  ry={R_SEAL * Math.abs(Math.cos((rot * Math.PI) / 180))}
                  fill="none"
                  stroke="#3B72DE"
                  strokeWidth="0.3"
                  opacity={0.22}
                  transform={`rotate(${rot} ${CX} ${CY})`}
                />
              );
            })}

            {/* Horizontal editorial rule */}
            <line x1={CX - R_SEAL * 0.78} y1={CY + 58} x2={CX + R_SEAL * 0.78} y2={CY + 58} stroke="url(#about-rule)" strokeWidth="0.8" />
            <line x1={CX - R_SEAL * 0.72} y1={CY + 62} x2={CX + R_SEAL * 0.72} y2={CY + 62} stroke="url(#about-rule)" strokeWidth="0.4" opacity="0.6" />

            {/* Est. engraving */}
            <text x={CX} y={CY + 76} textAnchor="middle" fontSize="8" fontFamily="var(--font-serif, var(--font-mono))" fill="#E8C988" letterSpacing="3.4" fontStyle="italic">
              EST · LLOYD'S LAB
            </text>
            <text x={CX} y={CY + 90} textAnchor="middle" fontSize="6.5" fontFamily="var(--font-mono)" fill="#8AB4F8" letterSpacing="2.4">
              COHORTS II & V
            </text>
          </g>

          {/* Inner luminous core */}
          <circle cx={CX} cy={CY - 22} r="32" fill="url(#about-coreinner)" filter="url(#about-soft)" opacity="0.9" />
          <motion.circle
            cx={CX}
            cy={CY - 22}
            r="16"
            fill="url(#about-coreinner)"
            animate={reduce ? undefined : { scale: [1, 1.12, 1], opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: `${CX}px ${CY - 22}px` }}
          />
          <circle cx={CX} cy={CY - 22} r="3.5" fill="#FFFFFF" />

          {/* Three pillars — small glyph rods emanating from the core */}
          {PILLARS.map((p, i) => {
            const base = polar(CX, CY - 22, 42, p.angle);
            const tip = polar(CX, CY - 22, 78, p.angle);
            const labelPt = polar(CX, CY - 22, 108, p.angle);
            return (
              <g key={p.id}>
                <line x1={base.x} y1={base.y} x2={tip.x} y2={tip.y} stroke={p.color} strokeWidth="1.25" opacity="0.9" strokeLinecap="round" />
                <circle cx={tip.x} cy={tip.y} r="3.4" fill={p.color} filter="url(#about-glow)" />
                <circle cx={tip.x} cy={tip.y} r="1.5" fill="#FFFFFF" opacity="0.85" />
                {!reduce && (
                  <circle cx={tip.x} cy={tip.y} r="3.4" fill="none" stroke={p.color} strokeWidth="0.7">
                    <animate attributeName="r" from="3.4" to="12" dur="2.8s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.7" to="0" dur="2.8s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
                  </circle>
                )}
                <text
                  x={labelPt.x}
                  y={labelPt.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="8"
                  fontFamily="var(--font-mono)"
                  fill="#F4F5F8"
                  letterSpacing="2.6"
                  fontWeight="500"
                  paintOrder="stroke"
                  stroke="#03060C"
                  strokeWidth="1.1"
                  strokeLinejoin="round"
                >
                  {p.label}
                </text>
                <text
                  x={labelPt.x}
                  y={labelPt.y + 10}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="6"
                  fontFamily="var(--font-mono)"
                  fill={p.color}
                  letterSpacing="1.8"
                  opacity="0.85"
                >
                  {p.sub}
                </text>
              </g>
            );
          })}

          {/* Compass rose marks at seal edge */}
          {[0, 90, 180, 270].map((a) => {
            const o = polar(CX, CY, R_SEAL - 6, a - 90);
            const i = polar(CX, CY, R_SEAL - 14, a - 90);
            return (
              <g key={`cr${a}`}>
                <line x1={i.x} y1={i.y} x2={o.x} y2={o.y} stroke="#E8C988" strokeWidth="0.9" opacity="0.85" />
                <circle cx={o.x} cy={o.y} r="1.4" fill="#E8C988" />
              </g>
            );
          })}
        </motion.g>

        {/* Lineage ribbon — a flowing dashed spiral of data lineage */}
        {!reduce && (
          <g opacity="0.55">
            <path
              id="about-lineage"
              d={`M ${CX - R_SEAL - 60} ${CY + 160} Q ${CX} ${CY + 220} ${CX + R_SEAL + 60} ${CY + 160}`}
              fill="none"
              stroke="url(#about-ribbon)"
              strokeWidth="1.1"
              strokeDasharray="3 6"
            />
            <circle r="2" fill="#E8C988" filter="url(#about-glow)">
              <animateMotion
                dur="9s"
                repeatCount="indefinite"
                path={`M ${CX - R_SEAL - 60} ${CY + 160} Q ${CX} ${CY + 220} ${CX + R_SEAL + 60} ${CY + 160}`}
              />
            </circle>
          </g>
        )}

        {/* Mission plaque — bottom */}
        <g transform={`translate(${CX - 110} ${VB - 48})`}>
          <rect x="0" y="0" width="220" height="30" rx="4" fill="#0A1326" opacity="0.92" stroke="rgba(200,162,94,0.4)" strokeWidth="0.7" />
          <line x1="10" y1="10" x2="210" y2="10" stroke="url(#about-rule)" strokeWidth="0.4" opacity="0.6" />
          <text x="110" y="18" textAnchor="middle" fontSize="6.5" fontFamily="var(--font-mono)" fill="#8AB4F8" letterSpacing="2.4">
            THE RAIL BETWEEN CAPTIVES
          </text>
          <text x="110" y="26" textAnchor="middle" fontSize="7" fontFamily="var(--font-serif, var(--font-mono))" fill="#E8C988" letterSpacing="2.6" fontStyle="italic">
            AND GLOBAL CAPITAL
          </text>
        </g>
      </svg>
    </div>
  );
}
