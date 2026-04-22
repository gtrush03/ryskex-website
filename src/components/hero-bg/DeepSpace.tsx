// A layered "window into deep space" — spinning conic, concentric hairline rings,
// floating blurred orbs, and a closing vignette for depth.

import { useMemo } from "react";
import { motion } from "framer-motion";

type Props = { className?: string };

function seeded(n: number) {
  const x = Math.sin(n * 99991) * 10000;
  return x - Math.floor(x);
}

const RINGS = [
  { size: 2000, dur: 120, dir: 1 },
  { size: 1400, dur: 80, dir: -1 },
  { size: 800, dur: 40, dir: 1 },
] as const;

export default function DeepSpace({ className = "" }: Props) {
  const orbs = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => {
        const hue = seeded(i + 7);
        const color =
          hue < 0.55
            ? "rgba(59, 114, 222, 0.35)"
            : hue < 0.85
              ? "rgba(46, 196, 110, 0.28)"
              : "rgba(244, 245, 248, 0.18)";
        return {
          left: seeded(i + 1) * 100,
          top: seeded(i + 2) * 100,
          size: 40 + seeded(i + 3) * 120,
          dx: (seeded(i + 4) - 0.5) * 60,
          dy: (seeded(i + 5) - 0.5) * 60,
          dur: 14 + seeded(i + 6) * 22,
          color,
        };
      }),
    [],
  );

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ background: "var(--bg)" }}
    >
      {/* Layer A — spinning conic */}
      <motion.div
        className="absolute left-1/2 top-1/2"
        style={{
          width: "180vmax",
          height: "180vmax",
          marginLeft: "-90vmax",
          marginTop: "-90vmax",
          background:
            "conic-gradient(from 0deg, rgba(59,114,222,0.18) 0deg, rgba(7,11,20,0) 60deg, rgba(46,196,110,0.14) 180deg, rgba(7,11,20,0) 260deg, rgba(59,114,222,0.18) 360deg)",
          filter: "blur(60px)",
          willChange: "transform",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 180, ease: "linear", repeat: Infinity }}
      />

      {/* Layer B — concentric hairline rings */}
      <div className="absolute left-1/2 top-1/2">
        {RINGS.map((r, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: r.size,
              height: r.size,
              left: -r.size / 2,
              top: -r.size / 2,
              border: "1px solid transparent",
              backgroundImage:
                "linear-gradient(var(--bg), var(--bg)), linear-gradient(135deg, rgba(59,114,222,0.55) 0%, rgba(46,196,110,0.45) 100%)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
              willChange: "transform",
            }}
            animate={{ rotate: 360 * r.dir }}
            transition={{ duration: r.dur, ease: "linear", repeat: Infinity }}
          />
        ))}
      </div>

      {/* Layer C — floating blurred orbs */}
      <div className="absolute inset-0">
        {orbs.map((o, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${o.left}%`,
              top: `${o.top}%`,
              width: o.size,
              height: o.size,
              background: o.color,
              filter: "blur(30px)",
              willChange: "transform",
            }}
            animate={{ x: [0, o.dx, 0], y: [0, o.dy, 0] }}
            transition={{
              duration: o.dur,
              ease: [0.45, 0, 0.55, 1],
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
        ))}
      </div>

      {/* Layer D — radial vignette seals the portal */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 50% 50%, transparent 0%, transparent 45%, rgba(7,11,20,0.7) 80%, rgba(7,11,20,0.95) 100%)",
        }}
      />
    </div>
  );
}
