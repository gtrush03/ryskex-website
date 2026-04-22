// Pure-SVG animated wireframe globe in RYSKEX brand colors.
// Cobalt meridians + parallels, green pulse dots at our real offices
// (London · Hartford · New York · Berlin). Rotates smoothly, accessible.

import { motion } from "framer-motion";
import { DURATION_EPIC, EASE_OUT_SOFT } from "@/motion/constants";

const OFFICES = [
  { city: "LONDON", lat: 51.5, lon: -0.1 },
  { city: "HARTFORD", lat: 41.76, lon: -72.67 },
  { city: "NEW YORK", lat: 40.71, lon: -74.0 },
  { city: "BERLIN", lat: 52.52, lon: 13.4 },
];

// Project a lat/lon onto our tilted 2D globe face (orthographic-ish).
function project(lat: number, lon: number, rotY = 0) {
  const R = 140;
  const cx = 160;
  const cy = 160;
  const latR = (lat * Math.PI) / 180;
  const lonR = ((lon + rotY) * Math.PI) / 180;
  const x = cx + R * Math.cos(latR) * Math.sin(lonR);
  const y = cy - R * Math.sin(latR);
  const z = Math.cos(latR) * Math.cos(lonR); // for opacity — positive = visible
  return { x, y, z };
}

export default function BrandGlobe() {
  return (
    <motion.figure
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: DURATION_EPIC, ease: EASE_OUT_SOFT }}
      className="relative mx-auto w-full max-w-[520px]"
    >
      {/* Outer ambient halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(59,114,222,0.28) 0%, rgba(46,196,110,0.12) 40%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      <svg
        viewBox="0 0 320 320"
        className="relative h-auto w-full"
        role="img"
        aria-label="Global exchange — London, Hartford, New York, Berlin"
      >
        <defs>
          <radialGradient id="bg-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1D4A9A" stopOpacity="0.18" />
            <stop offset="60%" stopColor="#070B14" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#070B14" stopOpacity="1" />
          </radialGradient>

          <linearGradient id="stroke-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B72DE" />
            <stop offset="100%" stopColor="#2EC46E" />
          </linearGradient>

          <radialGradient id="atmo" cx="50%" cy="50%" r="50%">
            <stop offset="85%" stopColor="transparent" />
            <stop offset="100%" stopColor="#3B72DE" stopOpacity="0.35" />
          </radialGradient>

          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Base sphere */}
        <circle cx="160" cy="160" r="140" fill="url(#bg-grad)" />

        {/* Atmospheric outer ring */}
        <circle cx="160" cy="160" r="150" fill="url(#atmo)" opacity="0.7" />

        {/* Rotating wireframe group */}
        <g style={{ transformOrigin: "160px 160px" }}>
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "160px 160px" }}
          >
            {/* Parallels (latitude) */}
            {[-60, -30, 0, 30, 60].map((lat, i) => {
              const rx = 140 * Math.cos((lat * Math.PI) / 180);
              const cy = 160 - 140 * Math.sin((lat * Math.PI) / 180);
              return (
                <ellipse
                  key={`p-${lat}`}
                  cx="160"
                  cy={cy}
                  rx={rx}
                  ry={rx * 0.18}
                  fill="none"
                  stroke="url(#stroke-grad)"
                  strokeWidth="0.6"
                  opacity={lat === 0 ? 0.75 : 0.45}
                  strokeDasharray={lat === 0 ? "0" : "1.5 2"}
                />
              );
            })}

            {/* Meridians (longitude) */}
            {[0, 30, 60, 90, 120, 150].map((rot) => (
              <ellipse
                key={`m-${rot}`}
                cx="160"
                cy="160"
                rx="140"
                ry={140 * Math.abs(Math.cos((rot * Math.PI) / 180))}
                fill="none"
                stroke="url(#stroke-grad)"
                strokeWidth="0.6"
                opacity={rot === 90 ? 0.35 : 0.5}
                strokeDasharray={rot % 60 === 0 ? "0" : "1.5 2"}
                transform={`rotate(${rot} 160 160)`}
              />
            ))}

            {/* Outline */}
            <circle
              cx="160"
              cy="160"
              r="140"
              fill="none"
              stroke="url(#stroke-grad)"
              strokeWidth="1"
              opacity="0.9"
            />
          </motion.g>

          {/* Office pins — not rotating, projected onto visible face */}
          {OFFICES.map((o, i) => {
            const p = project(o.lat, o.lon, 0);
            if (p.z < 0.1) return null;
            return (
              <g key={o.city} filter="url(#glow)">
                <circle cx={p.x} cy={p.y} r="2.5" fill="#2EC46E" />
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="2.5"
                  fill="none"
                  stroke="#2EC46E"
                  strokeWidth="0.8"
                  opacity="0.6"
                >
                  <animate
                    attributeName="r"
                    from="2.5"
                    to="10"
                    dur="2.6s"
                    begin={`${i * 0.4}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.7"
                    to="0"
                    dur="2.6s"
                    begin={`${i * 0.4}s`}
                    repeatCount="indefinite"
                  />
                </circle>
                <text
                  x={p.x + 8}
                  y={p.y + 3}
                  fontSize="8"
                  fontFamily="var(--font-mono)"
                  fill="#F4F5F8"
                  opacity="0.75"
                  letterSpacing="1.5"
                >
                  {o.city}
                </text>
              </g>
            );
          })}
        </g>

        {/* Center label chip */}
        <g transform="translate(160 296)">
          <rect x="-56" y="-10" width="112" height="18" rx="9" fill="#0D1220" stroke="rgba(59,114,222,0.45)" />
          <text
            x="0"
            y="3"
            textAnchor="middle"
            fontSize="8"
            fontFamily="var(--font-mono)"
            fill="#8AB4F8"
            letterSpacing="2"
          >
            EXCHANGE · LIVE
          </text>
        </g>
      </svg>

      {/* Small caption under globe */}
      <figcaption className="mt-4 text-center font-mono text-[10.5px] uppercase tracking-[0.18em] text-subtle">
        4 desks · 1 rail · 48h settlement
      </figcaption>
    </motion.figure>
  );
}
