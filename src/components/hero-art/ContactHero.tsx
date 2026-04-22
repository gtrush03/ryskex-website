// Contact hero — two-office map: signal crossing the Atlantic between
// London and Hartford. Hairline longitudes, dashed great-circle arc,
// pulse dots at both endpoints, secondary desks (NYC, Berlin) as smaller
// waypoints. Cursor parallax drifts the map; crossing pulse always active.

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

interface Props {
  className?: string;
}

const VB_W = 640;
const VB_H = 340;

interface Pin {
  id: string;
  label: string;
  code: string;
  tz: string;
  x: number;
  y: number;
  primary?: boolean;
}

const PINS: Pin[] = [
  { id: "lon", label: "LONDON", code: "+44", tz: "GMT+0", x: 400, y: 150, primary: true },
  { id: "htf", label: "HARTFORD", code: "+1", tz: "GMT-5", x: 200, y: 172, primary: true },
  { id: "nyc", label: "NEW YORK", code: "+1", tz: "GMT-5", x: 180, y: 188 },
  { id: "ber", label: "BERLIN", code: "+49", tz: "GMT+1", x: 438, y: 142 },
];

interface ArcSpec {
  from: string;
  to: string;
  lift: number;
  major?: boolean;
}

const ARCS: ArcSpec[] = [
  { from: "htf", to: "lon", lift: 90, major: true },
  { from: "nyc", to: "ber", lift: 106 },
  { from: "htf", to: "ber", lift: 74 },
  { from: "nyc", to: "lon", lift: 80 },
  { from: "lon", to: "ber", lift: 40 },
];

function seeded(i: number, salt: number): number {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function arcPath(a: Pin, b: Pin, lift: number): string {
  const mx = (a.x + b.x) / 2;
  const my = Math.min(a.y, b.y) - lift;
  return `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;
}

export default function ContactHero({ className }: Props) {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 17, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 55, damping: 17, mass: 0.6 });
  const mapX = useTransform(sx, [-1, 1], [-7, 7]);
  const mapY = useTransform(sy, [-1, 1], [-5, 5]);
  const longX = useTransform(sx, [-1, 1], [3, -3]);
  const longY = useTransform(sy, [-1, 1], [2, -2]);
  const pinsX = useTransform(sx, [-1, 1], [-11, 11]);
  const pinsY = useTransform(sy, [-1, 1], [-8, 8]);

  useEffect(() => {
    if (reduce) return;
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const nmx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const nmy = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mx.set(Math.max(-1, Math.min(1, nmx)));
      my.set(Math.max(-1, Math.min(1, nmy)));
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

  const [pulseIdx, setPulseIdx] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setPulseIdx((p) => (p + 1) % ARCS.length), 4200);
    return () => clearInterval(t);
  }, [reduce]);

  const byId = (id: string) => PINS.find((p) => p.id === id)!;

  // Longitude hairlines across the frame
  const longitudes = Array.from({ length: 13 }, (_, i) => ({
    x: 40 + i * ((VB_W - 80) / 12),
    major: i % 3 === 0,
  }));

  // Starfield / dust particles for atmosphere
  const stars = Array.from({ length: 30 }, (_, i) => ({
    cx: 6 + seeded(i, 1) * (VB_W - 12),
    cy: 6 + seeded(i, 2) * (VB_H - 12),
    r: 0.3 + seeded(i, 3) * 0.9,
    dur: 2.4 + seeded(i, 4) * 3,
    delay: seeded(i, 5) * 3,
    opacity: 0.3 + seeded(i, 6) * 0.55,
  }));

  return (
    <div ref={containerRef} className={className} style={{ width: "100%", height: "100%" }}>
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        role="img"
        aria-label="RYSKEX two-desk map — London ↔ Hartford transatlantic signal"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <defs>
          <radialGradient id="contact-bg" cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor="#0F1D38" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#070B14" />
            <stop offset="100%" stopColor="#02050B" />
          </radialGradient>
          <radialGradient id="contact-vignette" cx="50%" cy="50%" r="70%">
            <stop offset="60%" stopColor="transparent" />
            <stop offset="100%" stopColor="#02040A" stopOpacity="0.9" />
          </radialGradient>
          <linearGradient id="contact-horizon" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1D4A9A" stopOpacity="0" />
            <stop offset="18%" stopColor="#3B72DE" stopOpacity="0.55" />
            <stop offset="82%" stopColor="#3B72DE" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#1D4A9A" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="contact-arc-major" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B72DE" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#2EC46E" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#3B72DE" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="contact-arc" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B72DE" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#7AA7F6" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#3B72DE" stopOpacity="0.1" />
          </linearGradient>
          <radialGradient id="contact-pin" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2EC46E" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#2EC46E" stopOpacity="0" />
          </radialGradient>
          <filter id="contact-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="contact-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>

        <rect width={VB_W} height={VB_H} fill="url(#contact-bg)" />

        {/* Starfield */}
        {stars.map((s, i) => (
          <circle key={`st${i}`} cx={s.cx} cy={s.cy} r={s.r} fill="#D6E1F5" opacity={s.opacity}>
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

        {/* Longitudes — hairline meridian grid */}
        <motion.g style={{ x: longX, y: longY }}>
          {longitudes.map((l, i) => (
            <g key={`lg${i}`}>
              <line
                x1={l.x}
                y1={40}
                x2={l.x}
                y2={VB_H - 40}
                stroke={l.major ? "#3B72DE" : "#3B72DE"}
                strokeWidth={l.major ? 0.55 : 0.3}
                opacity={l.major ? 0.38 : 0.2}
                strokeDasharray={l.major ? "0" : "1 4"}
              />
              {l.major && (
                <text
                  x={l.x}
                  y={30}
                  textAnchor="middle"
                  fontSize="5.5"
                  fontFamily="var(--font-mono)"
                  fill="#6A7A99"
                  letterSpacing="1.4"
                  opacity="0.6"
                >
                  {`${String((i - 6) * 15).padStart(3, "0")}°`}
                </text>
              )}
            </g>
          ))}
          {/* Latitudes — three subtle curves */}
          <path d={`M 40 120 Q ${VB_W / 2} 100 ${VB_W - 40} 120`} fill="none" stroke="#3B72DE" strokeWidth="0.4" strokeDasharray="2 5" opacity="0.28" />
          <path d={`M 40 170 Q ${VB_W / 2} 150 ${VB_W - 40} 170`} fill="none" stroke="#3B72DE" strokeWidth="0.4" strokeDasharray="2 5" opacity="0.28" />
          <path d={`M 40 220 Q ${VB_W / 2} 200 ${VB_W - 40} 220`} fill="none" stroke="#3B72DE" strokeWidth="0.4" strokeDasharray="2 5" opacity="0.28" />
        </motion.g>

        {/* Horizon — abstract ocean arc */}
        <motion.g style={{ x: mapX, y: mapY }}>
          <path d="M 20 250 Q 320 80 620 250" fill="none" stroke="url(#contact-horizon)" strokeWidth="1.3" opacity="0.85" />
          <path d="M 40 270 Q 320 120 600 270" fill="none" stroke="#3B72DE" strokeWidth="0.5" strokeDasharray="2 5" opacity="0.45" />
          <path d="M 60 290 Q 320 160 580 290" fill="none" stroke="#3B72DE" strokeWidth="0.4" strokeDasharray="1 6" opacity="0.3" />

          {/* Great-circle arcs */}
          {ARCS.map((a, i) => {
            const A = byId(a.from);
            const B = byId(a.to);
            const d = arcPath(A, B, a.lift);
            const isMajor = a.major;
            return (
              <g key={`ar${i}`}>
                <path
                  d={d}
                  fill="none"
                  stroke={isMajor ? "url(#contact-arc-major)" : "url(#contact-arc)"}
                  strokeWidth={isMajor ? 1.25 : 0.85}
                  opacity={isMajor ? 0.9 : 0.55}
                  strokeDasharray={isMajor ? "0" : "4 5"}
                  strokeLinecap="round"
                />
                {isMajor && (
                  <path
                    d={d}
                    fill="none"
                    stroke="#7AA7F6"
                    strokeWidth="2.2"
                    opacity="0.15"
                    filter="url(#contact-soft)"
                    strokeLinecap="round"
                  />
                )}
                {!reduce && isMajor && (
                  <path
                    d={d}
                    fill="none"
                    stroke="#CBDDFB"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeDasharray="4 160"
                    filter="url(#contact-glow)"
                  >
                    <animate attributeName="stroke-dashoffset" from="0" to="-164" dur="5.6s" repeatCount="indefinite" />
                  </path>
                )}
              </g>
            );
          })}

          {/* Persistent major crossing pulse */}
          {!reduce && (
            <circle r="3.2" fill="#2EC46E" filter="url(#contact-glow)">
              <animateMotion
                dur="3.4s"
                repeatCount="indefinite"
                path={arcPath(byId(ARCS[0].from), byId(ARCS[0].to), ARCS[0].lift)}
              />
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.12;0.88;1" dur="3.4s" repeatCount="indefinite" />
            </circle>
          )}

          {/* Rotating pulse on the currently active secondary arc */}
          {!reduce && (
            <g key={pulseIdx}>
              <circle r="2.4" fill="#7AA7F6" filter="url(#contact-glow)">
                <animateMotion
                  dur="2.8s"
                  repeatCount="1"
                  path={arcPath(byId(ARCS[pulseIdx].from), byId(ARCS[pulseIdx].to), ARCS[pulseIdx].lift)}
                />
                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="2.8s" repeatCount="1" />
              </circle>
            </g>
          )}
        </motion.g>

        {/* Pins — London + Hartford primary, NYC + Berlin secondary */}
        <motion.g style={{ x: pinsX, y: pinsY }}>
          {PINS.map((p) => (
            <g key={p.id}>
              {/* Halo */}
              <circle cx={p.x} cy={p.y} r={p.primary ? 22 : 14} fill={p.primary ? "#2EC46E" : "#3B72DE"} opacity={p.primary ? 0.12 : 0.1} filter="url(#contact-soft)" />
              {/* Outer ring */}
              <circle cx={p.x} cy={p.y} r={p.primary ? 10 : 7} fill="none" stroke={p.primary ? "#2EC46E" : "#3B72DE"} strokeWidth="0.8" opacity="0.55" />
              {/* Pulse ring */}
              {!reduce && (
                <circle cx={p.x} cy={p.y} r={p.primary ? 6 : 4} fill="none" stroke={p.primary ? "#2EC46E" : "#7AA7F6"} strokeWidth="0.8">
                  <animate attributeName="r" from={String(p.primary ? 6 : 4)} to={String(p.primary ? 20 : 14)} dur="2.6s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.85" to="0" dur="2.6s" repeatCount="indefinite" />
                </circle>
              )}
              {/* Core */}
              <circle cx={p.x} cy={p.y} r={p.primary ? 5 : 3.2} fill={p.primary ? "#2EC46E" : "#7AA7F6"} filter="url(#contact-glow)" />
              <circle cx={p.x} cy={p.y} r={p.primary ? 1.8 : 1.2} fill="#070B14" />

              {/* Label */}
              <text
                x={p.x}
                y={p.y - (p.primary ? 18 : 14)}
                textAnchor="middle"
                fontSize={p.primary ? 9.5 : 7.5}
                fontFamily="var(--font-mono)"
                fill="#F4F5F8"
                letterSpacing={p.primary ? "2.4" : "1.8"}
                fontWeight="500"
                paintOrder="stroke"
                stroke="#03060C"
                strokeWidth="1.1"
                strokeLinejoin="round"
              >
                {p.label}
              </text>
              <text
                x={p.x}
                y={p.y - (p.primary ? 6 : 4)}
                textAnchor="middle"
                fontSize={p.primary ? 6.2 : 5.5}
                fontFamily="var(--font-mono)"
                fill={p.primary ? "#2EC46E" : "#7AA7F6"}
                letterSpacing="1.6"
                opacity="0.85"
              >
                {p.code} · {p.tz}
              </text>

              {/* Desk tag for primary pins */}
              {p.primary && (
                <g transform={`translate(${p.x - 28} ${p.y + 14})`}>
                  <rect x="0" y="0" width="56" height="12" rx="2" fill="#0A1326" stroke="rgba(46,196,110,0.5)" strokeWidth="0.6" />
                  <text
                    x="28"
                    y="8.5"
                    textAnchor="middle"
                    fontSize="6"
                    fontFamily="var(--font-mono)"
                    fill="#C7D4F0"
                    letterSpacing="1.8"
                  >
                    DESK · 24/5
                  </text>
                </g>
              )}
            </g>
          ))}
        </motion.g>

        <rect width={VB_W} height={VB_H} fill="url(#contact-vignette)" pointerEvents="none" />

        {/* Signal chip — top left */}
        <g transform="translate(20 20)">
          <rect x="0" y="0" width="160" height="30" rx="3.5" fill="#0A1326" opacity="0.92" stroke="rgba(46,196,110,0.55)" strokeWidth="0.8" />
          <rect x="1" y="1" width="158" height="12" rx="3" fill="rgba(255,255,255,0.04)" />
          <circle cx="11" cy="15" r="2.6" fill="#2EC46E" filter="url(#contact-glow)">
            {!reduce && <animate attributeName="opacity" values="0.5;1;0.5" dur="1.6s" repeatCount="indefinite" />}
          </circle>
          <text x="21" y="10" fontSize="6" fontFamily="var(--font-mono)" fill="#8AB4F8" letterSpacing="1.8">
            SIGNAL · LIVE
          </text>
          <text x="21" y="23" fontSize="7" fontFamily="var(--font-mono)" fill="#C7D4F0" letterSpacing="2">
            HARTFORD ↔ LONDON
          </text>
        </g>

        {/* Desks chip — top right */}
        <g transform={`translate(${VB_W - 180} 20)`}>
          <rect x="0" y="0" width="160" height="30" rx="3.5" fill="#0A1326" opacity="0.92" stroke="rgba(59,114,222,0.5)" strokeWidth="0.8" />
          <rect x="1" y="1" width="158" height="12" rx="3" fill="rgba(255,255,255,0.04)" />
          <text x="11" y="10" fontSize="6" fontFamily="var(--font-mono)" fill="#8AB4F8" letterSpacing="1.8">
            DESKS · 02 PRIMARY
          </text>
          <text x="11" y="23" fontSize="7" fontFamily="var(--font-mono)" fill="#C7D4F0" letterSpacing="1.8">
            +44 · +1 · +49
          </text>
        </g>

        {/* Footer readout */}
        <g transform={`translate(20 ${VB_H - 20})`} opacity="0.8">
          <text fontSize="6.5" fontFamily="var(--font-mono)" fill="#6A7A99" letterSpacing="1.8">
            LLOYD'S · HARTFORD · BERLIN · NEW YORK — ALL TIMES UTC
          </text>
        </g>
        <g transform={`translate(${VB_W - 80} ${VB_H - 20})`} opacity="0.7">
          <text fontSize="6.5" fontFamily="var(--font-mono)" fill="#2EC46E" letterSpacing="1.8">
            Δ 71ms
          </text>
        </g>

        {/* Corner crosshairs */}
        {[
          [24, 66],
          [VB_W - 24, 66],
          [24, VB_H - 38],
          [VB_W - 24, VB_H - 38],
        ].map(([x, y], i) => (
          <g key={`cr${i}`} stroke="#3B72DE" strokeWidth="0.55" opacity="0.42">
            <line x1={x - 7} y1={y} x2={x + 7} y2={y} />
            <line x1={x} y1={y - 7} x2={x} y2={y + 7} />
            <circle cx={x} cy={y} r="1.8" fill="none" />
          </g>
        ))}
      </svg>
    </div>
  );
}
