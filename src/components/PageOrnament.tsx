// Custom page-specific animated SVG ornaments, one per route.
// All in RYSKEX brand gradient (cobalt → green), responsive, reduced-motion safe.

import { motion } from "framer-motion";

const GRADIENT_DEFS = (
  <defs>
    <linearGradient id="orn-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#3B72DE" />
      <stop offset="100%" stopColor="#2EC46E" />
    </linearGradient>
    <radialGradient id="orn-fill" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#3B72DE" stopOpacity="0.25" />
      <stop offset="100%" stopColor="#2EC46E" stopOpacity="0" />
    </radialGradient>
    <filter id="orn-glow">
      <feGaussianBlur stdDeviation="2" />
    </filter>
  </defs>
);

// ──────────────────────────────────────────────────────────
// 1. Platform — exchange topology (3 hubs, connecting rails)
// ──────────────────────────────────────────────────────────
export function ExchangeTopology({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      viewBox="0 0 320 200"
      className={`h-auto w-full ${className}`}
      role="img"
      aria-label="Exchange topology"
    >
      {GRADIENT_DEFS}

      {/* Connection paths */}
      <motion.path
        d="M 50 140 Q 130 40 160 100 Q 190 160 270 60"
        fill="none"
        stroke="url(#orn-stroke)"
        strokeWidth="1.2"
        strokeDasharray="240"
        initial={{ strokeDashoffset: 240 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      <motion.path
        d="M 50 140 L 160 100 L 270 60"
        fill="none"
        stroke="url(#orn-stroke)"
        strokeWidth="0.6"
        opacity="0.5"
        strokeDasharray="2 2"
        initial={{ strokeDashoffset: 240 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 2.4, delay: 0.3 }}
      />

      {/* 3 hubs */}
      {[
        { x: 50, y: 140, label: "CEDENTS" },
        { x: 160, y: 100, label: "EXCHANGE" },
        { x: 270, y: 60, label: "CAPITAL" },
      ].map((h, i) => (
        <g key={h.label}>
          <circle cx={h.x} cy={h.y} r="22" fill="url(#orn-fill)" />
          <circle cx={h.x} cy={h.y} r="6" fill="#0D1220" stroke="url(#orn-stroke)" strokeWidth="1.4" />
          {i === 1 && (
            <circle cx={h.x} cy={h.y} r="10" fill="none" stroke="#2EC46E" strokeWidth="0.8">
              <animate attributeName="r" from="6" to="18" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.8" to="0" dur="2.4s" repeatCount="indefinite" />
            </circle>
          )}
          <text
            x={h.x}
            y={h.y + 36}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="8"
            letterSpacing="1.5"
            fill="rgba(244,245,248,0.6)"
          >
            {h.label}
          </text>
        </g>
      ))}

      {/* Traveling pulse dot along the main path */}
      <circle r="2" fill="#2EC46E" filter="url(#orn-glow)">
        <animateMotion dur="4s" repeatCount="indefinite" path="M 50 140 Q 130 40 160 100 Q 190 160 270 60" />
      </circle>
    </motion.svg>
  );
}

// ──────────────────────────────────────────────────────────
// 2. How It Works — 4-step horizontal flow
// ──────────────────────────────────────────────────────────
export function FourStepFlow({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewBox="0 0 400 80"
      className={`h-auto w-full ${className}`}
      role="img"
      aria-label="Four step flow"
    >
      {GRADIENT_DEFS}
      <line x1="20" y1="40" x2="380" y2="40" stroke="rgba(244,245,248,0.15)" strokeWidth="0.8" strokeDasharray="2 3" />
      <motion.line
        x1="20"
        y1="40"
        x2="380"
        y2="40"
        stroke="url(#orn-stroke)"
        strokeWidth="1.2"
        strokeDasharray="360"
        initial={{ strokeDashoffset: 360 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 2.2, ease: "easeInOut" }}
      />
      {[20, 140, 260, 380].map((x, i) => (
        <g key={x}>
          <circle cx={x} cy={40} r="10" fill="#0D1220" stroke="url(#orn-stroke)" strokeWidth="1.4" />
          <text
            x={x}
            y={68}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="8"
            letterSpacing="1.5"
            fill="rgba(244,245,248,0.55)"
          >
            0{i + 1}
          </text>
        </g>
      ))}
      <circle r="3" fill="#2EC46E" filter="url(#orn-glow)">
        <animateMotion dur="5s" repeatCount="indefinite" path="M 20 40 L 380 40" />
      </circle>
    </motion.svg>
  );
}

// ──────────────────────────────────────────────────────────
// 3. About — overlapping triad (Mission / Vision / Technology)
// ──────────────────────────────────────────────────────────
export function MissionTriad({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewBox="0 0 240 200"
      className={`h-auto w-full ${className}`}
      role="img"
      aria-label="Mission, vision, technology"
    >
      {GRADIENT_DEFS}
      {[
        { cx: 90, cy: 75, label: "MISSION" },
        { cx: 150, cy: 75, label: "VISION" },
        { cx: 120, cy: 130, label: "TECH" },
      ].map((c, i) => (
        <g key={c.label}>
          <motion.circle
            cx={c.cx}
            cy={c.cy}
            r="55"
            fill="url(#orn-fill)"
            stroke="url(#orn-stroke)"
            strokeWidth="0.8"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            transition={{ duration: 0.8, delay: i * 0.15 }}
            style={{ transformOrigin: `${c.cx}px ${c.cy}px` }}
          />
          <text
            x={c.cx}
            y={c.cy + 3}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="8"
            letterSpacing="1.5"
            fill="rgba(244,245,248,0.9)"
          >
            {c.label}
          </text>
        </g>
      ))}
    </motion.svg>
  );
}

// ──────────────────────────────────────────────────────────
// 4. Team — 9-node network graph
// ──────────────────────────────────────────────────────────
export function TeamNetwork({ className = "" }: { className?: string }) {
  const nodes = [
    { x: 160, y: 50 }, // center top — Marcus
    { x: 80, y: 90 },
    { x: 240, y: 90 },
    { x: 40, y: 150 },
    { x: 120, y: 150 },
    { x: 200, y: 150 },
    { x: 280, y: 150 },
    { x: 90, y: 200 },
    { x: 230, y: 200 },
  ];
  const edges = [
    [0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6],
    [4, 7], [5, 8], [3, 7], [6, 8], [1, 2], [4, 5],
  ];
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewBox="0 0 320 240"
      className={`h-auto w-full ${className}`}
      role="img"
      aria-label="Team network"
    >
      {GRADIENT_DEFS}

      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="url(#orn-stroke)"
          strokeWidth="0.6"
          opacity="0.4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.4 + i * 0.04 }}
        />
      ))}

      {nodes.map((n, i) => (
        <motion.g
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
          style={{ transformOrigin: `${n.x}px ${n.y}px` }}
        >
          <circle
            cx={n.x}
            cy={n.y}
            r={i === 0 ? 7 : 4}
            fill="#0D1220"
            stroke={i === 0 ? "#2EC46E" : "url(#orn-stroke)"}
            strokeWidth={i === 0 ? 1.6 : 1}
          />
          {i === 0 && (
            <circle cx={n.x} cy={n.y} r="7" fill="none" stroke="#2EC46E" strokeWidth="0.8">
              <animate attributeName="r" from="7" to="16" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.7" to="0" dur="2.4s" repeatCount="indefinite" />
            </circle>
          )}
        </motion.g>
      ))}
    </motion.svg>
  );
}

// ──────────────────────────────────────────────────────────
// 5. Contact — 2 pins connected by an arc (London ↔ Hartford)
// ──────────────────────────────────────────────────────────
export function OfficeArc({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewBox="0 0 320 160"
      className={`h-auto w-full ${className}`}
      role="img"
      aria-label="London to Hartford"
    >
      {GRADIENT_DEFS}

      {/* subtle globe arc */}
      <ellipse
        cx="160"
        cy="160"
        rx="140"
        ry="40"
        fill="none"
        stroke="rgba(244,245,248,0.12)"
        strokeWidth="0.6"
        strokeDasharray="2 3"
      />

      {/* flight arc */}
      <motion.path
        d="M 60 120 Q 160 10 260 120"
        fill="none"
        stroke="url(#orn-stroke)"
        strokeWidth="1.2"
        strokeDasharray="280"
        initial={{ strokeDashoffset: 280 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />

      {/* Pins */}
      {[
        { x: 60, y: 120, label: "LONDON" },
        { x: 260, y: 120, label: "HARTFORD" },
      ].map((p) => (
        <g key={p.label}>
          <circle cx={p.x} cy={p.y} r="18" fill="url(#orn-fill)" />
          <circle cx={p.x} cy={p.y} r="5" fill="#0D1220" stroke="url(#orn-stroke)" strokeWidth="1.4" />
          <circle cx={p.x} cy={p.y} r="5" fill="none" stroke="#2EC46E" strokeWidth="0.8">
            <animate attributeName="r" from="5" to="14" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.7" to="0" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <text
            x={p.x}
            y={p.y + 30}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="8"
            letterSpacing="1.5"
            fill="rgba(244,245,248,0.6)"
          >
            {p.label}
          </text>
        </g>
      ))}

      {/* Traveling pulse along arc */}
      <circle r="2.5" fill="#2EC46E" filter="url(#orn-glow)">
        <animateMotion dur="4s" repeatCount="indefinite" path="M 60 120 Q 160 10 260 120" />
      </circle>
    </motion.svg>
  );
}
