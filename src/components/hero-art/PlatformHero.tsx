// Hero art for the Platform page: a trading-floor topology with three
// tiered hubs (CEDENT · EXCHANGE CORE · CAPITAL) and animated capital flows.

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface Props {
  className?: string;
}

const HUBS = [
  { id: "cedent", label: "CEDENT", x: 90, y: 180, r: 44 },
  { id: "core", label: "EXCHANGE CORE", x: 280, y: 180, r: 60 },
  { id: "capital", label: "CAPITAL", x: 470, y: 180, r: 44 },
];

function Hub({ hub, accent, reduce }: { hub: (typeof HUBS)[number]; accent: string; reduce: boolean }) {
  return (
    <g>
      {[1.6, 1.3, 1].map((s, i) => (
        <circle
          key={i}
          cx={hub.x}
          cy={hub.y}
          r={hub.r * s}
          fill="none"
          stroke={accent}
          strokeWidth={i === 2 ? 1 : 0.5}
          opacity={i === 2 ? 0.9 : 0.25}
          strokeDasharray={i === 0 ? "2 4" : "0"}
        />
      ))}
      <circle cx={hub.x} cy={hub.y} r={hub.r * 0.62} fill="url(#platform-hero-hubfill)" opacity="0.85" />
      {Array.from({ length: 6 }, (_, i) => {
        const a = (Math.PI / 3) * i;
        return (
          <line
            key={i}
            x1={hub.x + Math.cos(a) * (hub.r * 0.2)}
            y1={hub.y + Math.sin(a) * (hub.r * 0.2)}
            x2={hub.x + Math.cos(a) * (hub.r * 0.58)}
            y2={hub.y + Math.sin(a) * (hub.r * 0.58)}
            stroke={accent}
            strokeWidth="0.5"
            opacity="0.5"
          />
        );
      })}
      <circle cx={hub.x} cy={hub.y} r="4" fill={accent}>
        {!reduce && hub.id === "core" && (
          <animate attributeName="opacity" values="0.4;1;0.4" dur="1.6s" repeatCount="indefinite" />
        )}
      </circle>
      <text
        x={hub.x}
        y={hub.y + hub.r + 22}
        textAnchor="middle"
        fontSize="9"
        fontFamily="var(--font-mono)"
        fill="#C7D4F0"
        letterSpacing="2.4"
      >
        {hub.label}
      </text>
    </g>
  );
}

export default function PlatformHero({ className }: Props) {
  const reduce = useReducedMotion();
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

  const flows = [
    { from: HUBS[0], to: HUBS[1], delay: 0 },
    { from: HUBS[0], to: HUBS[1], delay: 1.2 },
    { from: HUBS[1], to: HUBS[2], delay: 0.4 },
    { from: HUBS[1], to: HUBS[2], delay: 1.8 },
    { from: HUBS[2], to: HUBS[1], delay: 0.8 },
  ];

  return (
    <svg viewBox="0 0 560 360" className={className} role="img" aria-label="Exchange trading-floor topology">
      <defs>
        <linearGradient id="platform-hero-arc" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B72DE" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#2EC46E" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#3B72DE" stopOpacity="0.2" />
        </linearGradient>
        <radialGradient id="platform-hero-hubfill" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1D4A9A" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#070B14" stopOpacity="0" />
        </radialGradient>
        <filter id="platform-hero-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.8" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="560" height="360" fill="#070B14" />
      <g opacity="0.18" stroke="#3B72DE" strokeWidth="0.3">
        {Array.from({ length: 18 }, (_, i) => (
          <line key={`gx${i}`} x1={i * 32} y1={0} x2={i * 32} y2={360} />
        ))}
        {Array.from({ length: 12 }, (_, i) => (
          <line key={`gy${i}`} x1={0} y1={i * 32} x2={560} y2={i * 32} />
        ))}
      </g>

      {flows.map((f, i) => {
        const midY = 180 - 70 + (i % 2) * 140;
        const d = `M ${f.from.x} ${f.from.y} Q ${(f.from.x + f.to.x) / 2} ${midY} ${f.to.x} ${f.to.y}`;
        return (
          <g key={i}>
            <path d={d} fill="none" stroke="url(#platform-hero-arc)" strokeWidth="0.8" opacity="0.45" />
            {!reduce && (
              <circle r="3" fill="#2EC46E" filter="url(#platform-hero-glow)">
                <animateMotion dur="4.5s" begin={`${f.delay}s`} repeatCount="indefinite" path={d} />
                <animate attributeName="opacity" values="0;1;1;0" dur="4.5s" begin={`${f.delay}s`} repeatCount="indefinite" />
              </circle>
            )}
          </g>
        );
      })}

      <Hub hub={HUBS[0]} accent="#3B72DE" reduce={!!reduce} />
      <motion.g
        animate={reduce ? undefined : { scale: [1, 1.03, 1] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: `${HUBS[1].x}px ${HUBS[1].y}px` }}
      >
        <Hub hub={HUBS[1]} accent="#2EC46E" reduce={!!reduce} />
      </motion.g>
      <Hub hub={HUBS[2]} accent="#3B72DE" reduce={!!reduce} />

      <g transform="translate(16 16)">
        <rect x="0" y="0" width="128" height="26" rx="4" fill="#0D1220" stroke="rgba(59,114,222,0.45)" />
        <text x="10" y="11" fontSize="7" fontFamily="var(--font-mono)" fill="#8AB4F8" letterSpacing="1.8">
          VUCAWRI
        </text>
        <text x="10" y="21" fontSize="10" fontFamily="var(--font-mono)" fill="#2EC46E" letterSpacing="2">
          {vuca.toFixed(3)}
        </text>
      </g>

      <g transform="translate(416 16)" opacity="0.7">
        <text x="0" y="10" fontSize="7" fontFamily="var(--font-mono)" fill="#8AB4F8" letterSpacing="2">
          T+48H SETTLEMENT
        </text>
        <text x="0" y="22" fontSize="7" fontFamily="var(--font-mono)" fill="#6A7A99" letterSpacing="2">
          ISDA · FIX 5.0
        </text>
      </g>
    </svg>
  );
}
