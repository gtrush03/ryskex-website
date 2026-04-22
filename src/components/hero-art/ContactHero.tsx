// Hero art for Contact: stylized world arc with four city pins connected by
// great-circle arcs, one pulse dot travelling between them every 3s.

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface Props {
  className?: string;
}

interface Pin {
  id: string;
  label: string;
  code: string;
  x: number;
  y: number;
}

const PINS: Pin[] = [
  { id: "lon", label: "LONDON", code: "+44", x: 300, y: 130 },
  { id: "htf", label: "HARTFORD", code: "+1", x: 190, y: 150 },
  { id: "nyc", label: "NEW YORK", code: "+1", x: 160, y: 175 },
  { id: "ber", label: "BERLIN", code: "+49", x: 350, y: 120 },
];

interface ArcSpec {
  from: string;
  to: string;
}

const ARCS: ArcSpec[] = [
  { from: "nyc", to: "lon" },
  { from: "htf", to: "ber" },
  { from: "lon", to: "ber" },
  { from: "nyc", to: "ber" },
  { from: "htf", to: "lon" },
];

function arcPath(a: Pin, b: Pin, lift = 70): string {
  const mx = (a.x + b.x) / 2;
  const my = Math.min(a.y, b.y) - lift;
  return `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;
}

export default function ContactHero({ className }: Props) {
  const reduce = useReducedMotion();
  const [pulseIdx, setPulseIdx] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => {
      setPulseIdx(Math.floor(Math.random() * ARCS.length));
    }, 3000);
    return () => clearInterval(t);
  }, [reduce]);

  const byId = (id: string) => PINS.find((p) => p.id === id)!;

  return (
    <svg viewBox="0 0 640 320" className={className} role="img" aria-label="World arc with four connected cities">
      <defs>
        <linearGradient id="contact-hero-world" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1D4A9A" stopOpacity="0" />
          <stop offset="20%" stopColor="#3B72DE" stopOpacity="0.6" />
          <stop offset="80%" stopColor="#3B72DE" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#1D4A9A" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="contact-hero-arc" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B72DE" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#2EC46E" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#3B72DE" stopOpacity="0.2" />
        </linearGradient>
        <radialGradient id="contact-hero-bg" cx="50%" cy="45%" r="65%">
          <stop offset="0%" stopColor="#0F1A33" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#070B14" stopOpacity="1" />
        </radialGradient>
        <filter id="contact-hero-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="640" height="320" fill="url(#contact-hero-bg)" />

      {/* Stylized world — a wide abstract arc with a second softer arc beneath */}
      <path
        d="M 20 230 Q 320 60 620 230"
        fill="none"
        stroke="url(#contact-hero-world)"
        strokeWidth="1.4"
        opacity="0.85"
      />
      <path
        d="M 40 250 Q 320 100 600 250"
        fill="none"
        stroke="#3B72DE"
        strokeWidth="0.5"
        strokeDasharray="2 5"
        opacity="0.4"
      />
      <path
        d="M 60 270 Q 320 140 580 270"
        fill="none"
        stroke="#3B72DE"
        strokeWidth="0.4"
        strokeDasharray="1 6"
        opacity="0.25"
      />

      {/* Arcs */}
      {ARCS.map((a, i) => {
        const A = byId(a.from);
        const B = byId(a.to);
        const d = arcPath(A, B, 60 + i * 8);
        return (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke="url(#contact-hero-arc)"
            strokeWidth="0.9"
            opacity="0.7"
            initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, delay: 0.15 * i, ease: "easeOut" }}
          />
        );
      })}

      {/* Travelling pulse on the current random arc */}
      {!reduce && (
        <g key={pulseIdx}>
          <circle r="3.5" fill="#2EC46E" filter="url(#contact-hero-glow)">
            <animateMotion dur="2.4s" repeatCount="1" path={arcPath(byId(ARCS[pulseIdx].from), byId(ARCS[pulseIdx].to), 60 + pulseIdx * 8)} />
            <animate attributeName="opacity" values="0;1;1;0" dur="2.4s" repeatCount="1" />
          </circle>
        </g>
      )}

      {/* Pins */}
      {PINS.map((p) => (
        <g key={p.id}>
          <circle cx={p.x} cy={p.y} r="12" fill="#2EC46E" opacity="0.18" />
          <circle cx={p.x} cy={p.y} r="5" fill="#2EC46E" filter="url(#contact-hero-glow)" />
          <circle cx={p.x} cy={p.y} r="2.2" fill="#070B14" />
          {!reduce && (
            <circle cx={p.x} cy={p.y} r="5" fill="none" stroke="#2EC46E" strokeWidth="0.8">
              <animate attributeName="r" from="5" to="16" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.8" to="0" dur="2.4s" repeatCount="indefinite" />
            </circle>
          )}
          <text
            x={p.x}
            y={p.y - 14}
            textAnchor="middle"
            fontSize="9"
            fontFamily="var(--font-mono)"
            fill="#F4F5F8"
            letterSpacing="2"
          >
            {p.label}
          </text>
          <text
            x={p.x + 14}
            y={p.y + 4}
            fontSize="7"
            fontFamily="var(--font-mono)"
            fill="#8AB4F8"
            letterSpacing="1.6"
            opacity="0.85"
          >
            {p.code}
          </text>
        </g>
      ))}

      <g transform="translate(16 296)">
        <text fontSize="7" fontFamily="var(--font-mono)" fill="#8AB4F8" letterSpacing="2">
          DESKS · +44 · +1 · +1 · +49
        </text>
      </g>
    </svg>
  );
}
