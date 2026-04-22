// Premium brand globe — tilted 23°, volumetric atmosphere, specular rim,
// great-circle arcs between financial hubs, dense starfield + Milky Way cloud,
// orbiting satellites, LIVE chip. Static wireframe keeps pins aligned.

import { motion, useReducedMotion } from "framer-motion";

interface Props {
  className?: string;
}

const CX = 260;
const CY = 260;
const R = 180;
const TILT = 23; // Earth's axial tilt for astronomical feel

const OFFICES = [
  { city: "LONDON", code: "LDN", lat: 51.5, lon: -0.1 },
  { city: "HARTFORD", code: "HFD", lat: 41.76, lon: -72.67 },
  { city: "NEW YORK", code: "NYC", lat: 40.71, lon: -74.0 },
  { city: "BERLIN", code: "BER", lat: 52.52, lon: 13.4 },
  { city: "ZURICH", code: "ZRH", lat: 47.37, lon: 8.54 },
  { city: "TOKYO", code: "TYO", lat: 35.68, lon: 139.69 },
  { city: "HONG KONG", code: "HKG", lat: 22.32, lon: 114.17 },
  { city: "SINGAPORE", code: "SGP", lat: 1.35, lon: 103.82 },
];

// Pairs of hubs that get a great-circle arc drawn between them.
const ARCS: [string, string][] = [
  ["LONDON", "NEW YORK"],
  ["NEW YORK", "HARTFORD"],
  ["LONDON", "ZURICH"],
  ["ZURICH", "BERLIN"],
  ["TOKYO", "HONG KONG"],
  ["HONG KONG", "SINGAPORE"],
  ["LONDON", "TOKYO"],
];

function seeded(i: number, salt: number): number {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function project(lat: number, lon: number) {
  const latR = (lat * Math.PI) / 180;
  // Rotate projection so Atlantic-ish longitudes face us.
  const lonR = ((lon + 30) * Math.PI) / 180;
  const x = CX + R * 0.94 * Math.cos(latR) * Math.sin(lonR);
  const y = CY - R * 0.94 * Math.sin(latR);
  const z = Math.cos(latR) * Math.cos(lonR);
  return { x, y, z };
}

// Build an SVG quadratic arc between two surface points — the control point
// is lifted toward the viewer to suggest a great-circle bowing outward.
function arcPath(ax: number, ay: number, bx: number, by: number) {
  const mx = (ax + bx) / 2;
  const my = (ay + by) / 2;
  const dx = bx - ax;
  const dy = by - ay;
  const dist = Math.hypot(dx, dy);
  // Control offset perpendicular (toward top), scaled by distance
  const lift = Math.min(85, dist * 0.38);
  // Normal pointing generally upward (toward viewer)
  const nx = -dy / dist;
  const ny = dx / dist;
  // Ensure the arc bows "up" (negative y)
  const sign = ny < 0 ? 1 : -1;
  const cx = mx + nx * lift * sign;
  const cy = my + ny * lift * sign;
  return `M ${ax.toFixed(2)} ${ay.toFixed(2)} Q ${cx.toFixed(2)} ${cy.toFixed(2)} ${bx.toFixed(2)} ${by.toFixed(2)}`;
}

export default function HomeHero({ className }: Props) {
  const reduce = useReducedMotion();

  // Dense starfield — more stars, size + brightness variation
  const stars = Array.from({ length: 90 }, (_, i) => ({
    cx: 6 + seeded(i, 1) * 508,
    cy: 6 + seeded(i, 2) * 508,
    r: 0.25 + seeded(i, 3) * 1.35,
    delay: seeded(i, 4) * 4,
    dur: 2.4 + seeded(i, 5) * 3,
    opacity: 0.35 + seeded(i, 6) * 0.6,
  }));

  const projected = OFFICES.map((o) => ({ ...o, ...project(o.lat, o.lon) })).sort(
    (a, b) => a.z - b.z
  );

  const hubMap = new Map(projected.map((p) => [p.city, p]));

  const arcs = ARCS.map(([a, b], i) => {
    const A = hubMap.get(a);
    const B = hubMap.get(b);
    if (!A || !B) return null;
    // Only draw when both endpoints are on visible hemisphere
    if (A.z < 0.1 || B.z < 0.1) return null;
    return {
      id: `${a}-${b}`,
      d: arcPath(A.x, A.y, B.x, B.y),
      delay: i * 0.4,
    };
  }).filter(Boolean) as { id: string; d: string; delay: number }[];

  return (
    <svg
      viewBox="0 0 520 520"
      className={className}
      role="img"
      aria-label="RYSKEX global exchange — financial hubs connected across a tilted wireframe globe"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
    >
      <defs>
        <radialGradient id="home-hero-space" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="#0F1D38" stopOpacity="0.95" /><stop offset="55%" stopColor="#070B14" /><stop offset="100%" stopColor="#02050B" />
        </radialGradient>
        <radialGradient id="home-hero-milky" cx="72%" cy="22%" r="55%">
          <stop offset="0%" stopColor="#7AA7F6" stopOpacity="0.22" /><stop offset="45%" stopColor="#3B72DE" stopOpacity="0.08" /><stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="home-hero-milky-2" cx="22%" cy="82%" r="50%">
          <stop offset="0%" stopColor="#2EC46E" stopOpacity="0.10" /><stop offset="60%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="home-hero-halo" cx="50%" cy="50%" r="58%">
          <stop offset="58%" stopColor="transparent" /><stop offset="78%" stopColor="#3B72DE" stopOpacity="0.38" /><stop offset="92%" stopColor="#2EC46E" stopOpacity="0.10" /><stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="home-hero-sphere" cx="36%" cy="32%" r="68%">
          <stop offset="0%" stopColor="#2B5AA8" stopOpacity="0.55" /><stop offset="30%" stopColor="#153570" stopOpacity="0.72" /><stop offset="65%" stopColor="#0A1A38" stopOpacity="0.88" /><stop offset="100%" stopColor="#03071A" stopOpacity="0.98" />
        </radialGradient>
        <radialGradient id="home-hero-rim" cx="50%" cy="50%" r="50%">
          <stop offset="88%" stopColor="transparent" /><stop offset="96%" stopColor="#7AA7F6" stopOpacity="0.7" /><stop offset="100%" stopColor="#7AA7F6" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="home-hero-rim-inner" cx="50%" cy="50%" r="50%">
          <stop offset="86%" stopColor="transparent" /><stop offset="93%" stopColor="#2EC46E" stopOpacity="0.45" /><stop offset="98%" stopColor="#3FD582" stopOpacity="0.08" /><stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="home-hero-spec" cx="68%" cy="28%" r="32%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" /><stop offset="35%" stopColor="#CBDDFB" stopOpacity="0.14" /><stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <linearGradient id="home-hero-wire" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7AA7F6" /><stop offset="55%" stopColor="#3B72DE" /><stop offset="100%" stopColor="#2EC46E" />
        </linearGradient>
        <linearGradient id="home-hero-arc" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B72DE" stopOpacity="0" /><stop offset="50%" stopColor="#7AA7F6" stopOpacity="0.9" /><stop offset="100%" stopColor="#2EC46E" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="home-hero-cloud" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#F4F5F8" stopOpacity="0" /><stop offset="50%" stopColor="#CBDDFB" stopOpacity="0.55" /><stop offset="100%" stopColor="#F4F5F8" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="home-hero-scan" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7AA7F6" stopOpacity="0" /><stop offset="50%" stopColor="#CBDDFB" stopOpacity="0.55" /><stop offset="100%" stopColor="#7AA7F6" stopOpacity="0" />
        </linearGradient>
        <filter id="home-hero-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="home-hero-soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="10" /></filter>
        <filter id="home-hero-soft-lg" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="24" /></filter>
        <filter id="home-hero-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" /><feColorMatrix values="0 0 0 0 0.48  0 0 0 0 0.65  0 0 0 0 0.96  0 0 0 0.22 0" /><feComposite in2="SourceGraphic" operator="in" />
        </filter>
        <clipPath id="home-hero-sphere-clip"><circle cx={CX} cy={CY} r={R} /></clipPath>
      </defs>

      {/* Space + Milky Way cloud */}
      <rect width="520" height="520" fill="url(#home-hero-space)" />
      <rect width="520" height="520" fill="url(#home-hero-milky)" opacity="0.9" />
      <rect width="520" height="520" fill="url(#home-hero-milky-2)" opacity="0.7" />

      {/* Dense starfield */}
      {stars.map((s, i) => (
        <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="#D6E1F5" opacity={s.opacity}>
          {!reduce && (
            <animate attributeName="opacity" values={`${(s.opacity * 0.2).toFixed(2)};${s.opacity.toFixed(2)};${(s.opacity * 0.2).toFixed(2)}`} dur={`${s.dur}s`} begin={`${s.delay}s`} repeatCount="indefinite" />
          )}
        </circle>
      ))}

      {/* Tilted globe group */}
      <g transform={`rotate(${-TILT} ${CX} ${CY})`}>
        {/* Wide atmospheric halo — blurred */}
        <circle cx={CX} cy={CY} r={R + 38} fill="url(#home-hero-halo)" filter="url(#home-hero-soft)" />
        <circle cx={CX} cy={CY} r={R + 60} fill="url(#home-hero-halo)" opacity="0.5" filter="url(#home-hero-soft-lg)" />
        <circle cx={CX} cy={CY} r={R + 52} fill="none" stroke="#3B72DE" strokeWidth="0.4" opacity="0.28" filter="url(#home-hero-soft)" />

        {/* Holographic orbital scale rings — counter-rotating ticks */}
        {[
          { r: R * 1.12, dur: 95, dir: 1, ticks: 24, labels: ["0045", "0135", "0225", "0315"] },
          { r: R * 1.22, dur: 120, dir: -1, ticks: 24, labels: ["N", "E", "S", "W"] },
        ].map((ring, ri) => (
          <g key={`hring${ri}`}>
            <circle cx={CX} cy={CY} r={ring.r} fill="none" stroke="#3B72DE" strokeWidth="0.35" opacity="0.22" />
            <motion.g style={{ originX: `${CX}px`, originY: `${CY}px` }} animate={reduce ? undefined : { rotate: ring.dir * 360 }} transition={reduce ? undefined : { duration: ring.dur, repeat: Infinity, ease: "linear" }}>
              {Array.from({ length: ring.ticks }, (_, ti) => {
                const ang = (ti / ring.ticks) * Math.PI * 2;
                const major = ti % 6 === 0;
                const len = major ? 6 : 2.4;
                const x1 = CX + Math.cos(ang) * ring.r;
                const y1 = CY + Math.sin(ang) * ring.r;
                const x2 = CX + Math.cos(ang) * (ring.r + len);
                const y2 = CY + Math.sin(ang) * (ring.r + len);
                return <line key={`t${ri}${ti}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={major ? "#7AA7F6" : "#3B72DE"} strokeWidth={major ? 0.6 : 0.35} opacity={major ? 0.65 : 0.32} />;
              })}
              {ring.labels.map((lbl, li) => {
                const ang = (li / ring.labels.length) * Math.PI * 2;
                const labelOffset = ring.r * 0.03 + 14;
                const lx = CX + Math.cos(ang) * (ring.r + labelOffset);
                const ly = CY + Math.sin(ang) * (ring.r + labelOffset);
                return (
                  <text
                    key={`l${ri}${li}`}
                    x={lx}
                    y={ly}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="7.5"
                    fontFamily="var(--font-mono)"
                    fill="#9BC0FB"
                    opacity="0.7"
                    letterSpacing="0.6"
                    fontWeight="500"
                    paintOrder="stroke"
                    stroke="#03060C"
                    strokeWidth="0.9"
                    strokeLinejoin="round"
                  >
                    {lbl}
                  </text>
                );
              })}
            </motion.g>
          </g>
        ))}

        {/* Sphere volumetric body */}
        <circle cx={CX} cy={CY} r={R} fill="url(#home-hero-sphere)" />

        {/* Surface effects clipped to sphere */}
        <g clipPath="url(#home-hero-sphere-clip)">
          {/* Subtle material grain */}
          <circle cx={CX} cy={CY} r={R} fill="#3B72DE" filter="url(#home-hero-grain)" opacity="0.35" />
          {/* Faint atmospheric cloud bands wrapping the hemisphere */}
          <ellipse cx={CX} cy={CY - 58} rx={R * 1.05} ry="11" fill="url(#home-hero-cloud)" opacity="0.063" filter="url(#home-hero-soft)" />
          <ellipse cx={CX} cy={CY + 22} rx={R * 1.1} ry="14" fill="url(#home-hero-cloud)" opacity="0.056" filter="url(#home-hero-soft)" />
          <ellipse cx={CX} cy={CY + 92} rx={R * 1.0} ry="9" fill="url(#home-hero-cloud)" opacity="0.05" filter="url(#home-hero-soft)" />
          {/* Inner green terminator ring */}
          <circle cx={CX} cy={CY} r={R} fill="url(#home-hero-rim-inner)" />
          {/* Rim light — bright arc on visible hemisphere edge */}
          <circle cx={CX} cy={CY} r={R} fill="url(#home-hero-rim)" />
          {/* Scanning beam — sweeps visible face */}
          {!reduce && (
            <motion.rect y={CY - R} width="56" height={R * 2} fill="url(#home-hero-scan)" opacity="0.18" initial={{ x: CX - R - 60 }} animate={{ x: [CX - R - 60, CX + R + 4, CX - R - 60] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", repeatDelay: 12 }} />
          )}
          {/* Specular top-right lens-flare highlight */}
          <circle cx={CX} cy={CY} r={R} fill="url(#home-hero-spec)" />
        </g>

        {/* STATIC wireframe — parallels + meridians */}
        <g>
          {Array.from({ length: 11 }, (_, i) => {
            const lat = -75 + i * 15;
            const rx = R * Math.cos((lat * Math.PI) / 180);
            const cy = CY - R * Math.sin((lat * Math.PI) / 180);
            const weight = lat === 0 ? 0.85 : 0.3 + 0.3 * (1 - Math.abs(lat) / 90);
            return (
              <ellipse key={`p${i}`} cx={CX} cy={cy} rx={Math.max(0.1, rx)} ry={Math.max(0.1, rx * 0.22)} fill="none" stroke="url(#home-hero-wire)" strokeWidth="0.55" opacity={weight} strokeDasharray={lat === 0 ? "0" : "1.5 2.2"} />
            );
          })}
          {Array.from({ length: 12 }, (_, i) => {
            const rot = (180 / 12) * i;
            return (
              <ellipse key={`m${i}`} cx={CX} cy={CY} rx={R} ry={R * Math.abs(Math.cos((rot * Math.PI) / 180))} fill="none" stroke="url(#home-hero-wire)" strokeWidth="0.5" opacity={0.3 + (i % 3) * 0.12} strokeDasharray={i % 2 ? "0" : "1.5 2.2"} transform={`rotate(${rot} ${CX} ${CY})`} />
            );
          })}
          <circle cx={CX} cy={CY} r={R} fill="none" stroke="url(#home-hero-wire)" strokeWidth="1" opacity="0.95" />
        </g>

        {/* Great-circle arcs between hubs */}
        {arcs.map((arc) => (
          <g key={arc.id}>
            <path d={arc.d} fill="none" stroke="url(#home-hero-arc)" strokeWidth="0.8" opacity="0.55" strokeLinecap="round" />
            <path d={arc.d} fill="none" stroke="#7AA7F6" strokeWidth="1.6" opacity="0.18" strokeLinecap="round" filter="url(#home-hero-soft)" />
            {!reduce && (
              <path d={arc.d} fill="none" stroke="#CBDDFB" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="4 160" filter="url(#home-hero-glow)">
                <animate attributeName="stroke-dashoffset" from="0" to="-164" dur="5.2s" begin={`${arc.delay}s`} repeatCount="indefinite" />
              </path>
            )}
          </g>
        ))}

        {/* Ambient data-stream particles drifting along arc paths */}
        {!reduce && arcs.length > 0 && Array.from({ length: 14 }, (_, i) => {
          const path = arcs[i % arcs.length];
          const dur = 6 + seeded(i, 11) * 5;
          const delay = seeded(i, 12) * dur;
          const size = 0.9 + seeded(i, 13) * 0.7;
          const tint = i % 3 === 0 ? "#3FD582" : "#CBDDFB";
          return (
            <circle key={`pkt${i}`} r={size} fill={tint} opacity="0" filter="url(#home-hero-glow)">
              <animateMotion dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" path={path.d} />
              <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.15;0.85;1" dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" />
            </circle>
          );
        })}

        {/* Orbiting satellites */}
        {!reduce &&
          [0, 1, 2].map((i) => {
            const rx = R + 22 + i * 14;
            return (
              <g key={`sat${i}`}>
                <ellipse cx={CX} cy={CY} rx={rx} ry={rx * 0.34} fill="none" stroke="#3B72DE" strokeWidth="0.3" opacity="0.22" transform={`rotate(${i * 40 - 25} ${CX} ${CY})`} />
                <g transform={`rotate(${i * 40 - 25} ${CX} ${CY})`}>
                  <motion.circle r="2.2" fill="#F4F5F8" animate={{ cx: [CX + rx, CX - rx, CX + rx], cy: [CY, CY, CY] }} transition={{ duration: 16 + i * 4, repeat: Infinity, ease: "linear" }} filter="url(#home-hero-glow)" />
                </g>
              </g>
            );
          })}

        {/* City pins — only visible hemisphere */}
        {projected.map((o, i) => {
          if (o.z < 0.15) return null;
          const pinOpacity = 0.4 + o.z * 0.6;
          const showLabel = o.z > 0.55 && ["LDN", "HFD", "NYC", "BER"].includes(o.code);
          return (
            <g key={o.city} opacity={pinOpacity}>
              <g filter="url(#home-hero-glow)">
                <circle cx={o.x} cy={o.y} r="2.8" fill="#2EC46E" />
                {!reduce && (
                  <circle cx={o.x} cy={o.y} r="2.8" fill="none" stroke="#2EC46E" strokeWidth="0.8">
                    <animate attributeName="r" from="2.8" to="14" dur="2.8s" begin={`${i * 0.35}s`} repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.7" to="0" dur="2.8s" begin={`${i * 0.35}s`} repeatCount="indefinite" />
                  </circle>
                )}
              </g>
              {showLabel && (
                <text
                  x={o.x + 7}
                  y={o.y - 5}
                  fontSize="9"
                  fontFamily="var(--font-mono)"
                  fill="#F4F5F8"
                  letterSpacing="0.8"
                  opacity="0.9"
                  fontWeight="500"
                  paintOrder="stroke"
                  stroke="#03060C"
                  strokeWidth="1.1"
                  strokeLinejoin="round"
                >
                  {o.code}
                </text>
              )}
            </g>
          );
        })}
      </g>

      {/* LIVE chip — glass bevel */}
      <g transform="translate(260 488)">
        <rect x="-64" y="-14" width="128" height="26" rx="13" fill="#0A0F1E" opacity="0.85" />
        <rect x="-64" y="-14" width="128" height="26" rx="13" fill="none" stroke="rgba(122,167,246,0.5)" strokeWidth="0.8" />
        <rect x="-63" y="-13" width="126" height="12" rx="12" fill="rgba(255,255,255,0.06)" />
        <circle cx="-44" cy="-1" r="3" fill="#2EC46E" filter="url(#home-hero-glow)">
          {!reduce && <animate attributeName="opacity" values="0.5;1;0.5" dur="1.6s" repeatCount="indefinite" />}
        </circle>
        <text x="0" y="3" textAnchor="middle" fontSize="9" fontFamily="var(--font-mono)" fill="#DCE4F5" letterSpacing="3.2" fontWeight="500">EXCHANGE</text>
      </g>
    </svg>
  );
}
