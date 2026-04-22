// Hero art for How It Works: a four-stage pipeline machine with contracts
// moving L→R through SCOPE · STRUCTURE · PLACE · SETTLE stations.

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface Props {
  className?: string;
}

const STATIONS = [
  { id: "scope", label: "SCOPE", x: 90 },
  { id: "structure", label: "STRUCTURE", x: 230 },
  { id: "place", label: "PLACE", x: 370 },
  { id: "settle", label: "SETTLE", x: 510 },
];

function StationIcon({ id, cx, cy, reduce }: { id: string; cx: number; cy: number; reduce: boolean }) {
  if (id === "scope") {
    return (
      <g transform={`translate(${cx} ${cy})`}>
        <rect x="-16" y="-4" width="32" height="8" rx="1.5" fill="none" stroke="#3B72DE" strokeWidth="1" />
        <circle cx="0" cy="0" r="3" fill="#2EC46E" />
        <motion.line
          x1="-14"
          y1="0"
          x2="14"
          y2="0"
          stroke="#2EC46E"
          strokeWidth="0.6"
          animate={reduce ? undefined : { rotate: [0, 360] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "0px 0px" }}
        />
      </g>
    );
  }
  if (id === "structure") {
    return (
      <g transform={`translate(${cx} ${cy})`}>
        <rect x="-14" y="-14" width="28" height="28" rx="2" fill="none" stroke="#3B72DE" strokeWidth="1" />
        <rect x="-9" y="-9" width="18" height="18" rx="1" fill="none" stroke="#2EC46E" strokeWidth="0.6" />
        <circle cx="0" cy="0" r="2.5" fill="#2EC46E" />
        <line x1="-14" y1="0" x2="-9" y2="0" stroke="#3B72DE" strokeWidth="0.8" />
        <line x1="9" y1="0" x2="14" y2="0" stroke="#3B72DE" strokeWidth="0.8" />
      </g>
    );
  }
  if (id === "place") {
    return (
      <g transform={`translate(${cx} ${cy})`}>
        <motion.g
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "0px 0px" }}
        >
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <line
              key={a}
              x1="0"
              y1="0"
              x2={Math.cos((a * Math.PI) / 180) * 14}
              y2={Math.sin((a * Math.PI) / 180) * 14}
              stroke="#3B72DE"
              strokeWidth="1"
              strokeLinecap="round"
            />
          ))}
        </motion.g>
        <circle cx="0" cy="0" r="4" fill="#070B14" stroke="#2EC46E" strokeWidth="1" />
      </g>
    );
  }
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <circle cx="0" cy="0" r="14" fill="none" stroke="#3B72DE" strokeWidth="1" />
      <circle cx="0" cy="0" r="10" fill="none" stroke="#3B72DE" strokeWidth="0.4" opacity="0.6" />
      <motion.line
        x1="0"
        y1="0"
        x2="0"
        y2="-10"
        stroke="#2EC46E"
        strokeWidth="1"
        strokeLinecap="round"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "0px 0px" }}
      />
      <motion.line
        x1="0"
        y1="0"
        x2="6"
        y2="0"
        stroke="#3B72DE"
        strokeWidth="0.8"
        strokeLinecap="round"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "0px 0px" }}
      />
      <circle cx="0" cy="0" r="1.2" fill="#2EC46E" />
    </g>
  );
}

export default function HowItWorksHero({ className }: Props) {
  const reduce = useReducedMotion();
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

  return (
    <svg viewBox="0 0 640 280" className={className} role="img" aria-label="Four-stage pipeline">
      <defs>
        <linearGradient id="how-hero-rail" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B72DE" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#3B72DE" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#2EC46E" stopOpacity="0.65" />
        </linearGradient>
        <linearGradient id="how-hero-capsule" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B72DE" />
          <stop offset="100%" stopColor="#2EC46E" />
        </linearGradient>
        <filter id="how-hero-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="b" />
          <feOffset in="b" dy="2" result="o" />
          <feMerge>
            <feMergeNode in="o" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="640" height="280" fill="#070B14" />
      <line x1="40" y1="110" x2="600" y2="110" stroke="url(#how-hero-rail)" strokeWidth="1.6" />
      <line x1="40" y1="110" x2="600" y2="110" stroke="#3B72DE" strokeWidth="0.4" strokeDasharray="2 6" opacity="0.5" />

      {STATIONS.map((st) => (
        <g key={st.id}>
          <circle cx={st.x} cy={110} r="28" fill="#0D1220" stroke="rgba(59,114,222,0.5)" strokeWidth="0.8" />
          <StationIcon id={st.id} cx={st.x} cy={110} reduce={!!reduce} />
          <text
            x={st.x}
            y={164}
            textAnchor="middle"
            fontSize="9"
            fontFamily="var(--font-mono)"
            fill="#C7D4F0"
            letterSpacing="2.4"
          >
            {st.label}
          </text>
          <rect x={st.x - 24} y={178} width="48" height="3" rx="1.5" fill="#0D1220" stroke="rgba(59,114,222,0.3)" strokeWidth="0.4" />
          {!reduce && (
            <rect x={st.x - 24} y={178} width="48" height="3" rx="1.5" fill="#2EC46E" opacity="0.85">
              <animate attributeName="width" values="0;48;48;0" dur="3.6s" begin={`${STATIONS.indexOf(st) * 0.8}s`} repeatCount="indefinite" />
            </rect>
          )}
        </g>
      ))}

      {!reduce &&
        [0, 1, 2].map((i) => (
          <motion.g
            key={i}
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: [40, 560], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: i * 2 }}
            filter="url(#how-hero-shadow)"
          >
            <rect x="-14" y="102" width="28" height="16" rx="8" fill="url(#how-hero-capsule)" opacity="0.95" />
            <rect x="-10" y="106" width="20" height="8" rx="4" fill="#070B14" opacity="0.35" />
          </motion.g>
        ))}

      <g transform="translate(560 26)">
        <rect x="0" y="0" width="64" height="24" rx="3" fill="#0D1220" stroke="rgba(46,196,110,0.55)" />
        <text x="32" y="10" textAnchor="middle" fontSize="6.5" fontFamily="var(--font-mono)" fill="#8AB4F8" letterSpacing="1.8">
          T-MINUS
        </text>
        <text x="32" y="20" textAnchor="middle" fontSize="9" fontFamily="var(--font-mono)" fill="#2EC46E" letterSpacing="2">
          {stamp}
        </text>
      </g>

      <g transform="translate(16 26)" opacity="0.7">
        <text x="0" y="10" fontSize="7" fontFamily="var(--font-mono)" fill="#8AB4F8" letterSpacing="2">
          PIPELINE · 04 STAGES
        </text>
        <text x="0" y="22" fontSize="7" fontFamily="var(--font-mono)" fill="#6A7A99" letterSpacing="2">
          CONTRACT IN FLIGHT
        </text>
      </g>
    </svg>
  );
}
