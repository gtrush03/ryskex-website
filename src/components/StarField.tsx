// CSS-only twinkling starfield for hero backgrounds.
// Three layers of stars at different speeds + a slow drifting nebula.

import { useMemo } from "react";

function seeded(n: number) {
  // Deterministic pseudo-random so SSR/CSR hydration matches
  let x = Math.sin(n * 99991) * 10000;
  return x - Math.floor(x);
}

export default function StarField({
  density = 120,
  className = "",
}: {
  density?: number;
  className?: string;
}) {
  // Generate 3 layers of stars
  const layers = useMemo(() => {
    const mk = (count: number, offset: number) =>
      Array.from({ length: count }, (_, i) => {
        const r = seeded(i + offset);
        return {
          x: seeded(i + offset + 1) * 100,
          y: seeded(i + offset + 2) * 100,
          s: 0.5 + r * 1.2,
          o: 0.3 + seeded(i + offset + 3) * 0.6,
          d: 2 + seeded(i + offset + 4) * 4,
        };
      });
    return {
      far: mk(Math.round(density * 0.5), 10),
      mid: mk(Math.round(density * 0.3), 500),
      near: mk(Math.round(density * 0.2), 1000),
    };
  }, [density]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Nebula wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 10%, rgba(59,114,222,0.22) 0%, transparent 50%), radial-gradient(ellipse 70% 50% at 85% 80%, rgba(46,196,110,0.14) 0%, transparent 55%), radial-gradient(ellipse 90% 70% at 50% 50%, rgba(29,74,154,0.18) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      {/* Stars */}
      {[layers.far, layers.mid, layers.near].map((layer, li) => (
        <div key={li} className="absolute inset-0">
          {layer.map((s, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: s.s,
                height: s.s,
                opacity: s.o,
                boxShadow: `0 0 ${s.s * 2}px rgba(255,255,255,0.6)`,
                animation: `twinkle ${s.d}s ease-in-out ${i * 0.07}s infinite alternate`,
              }}
            />
          ))}
        </div>
      ))}

      <style>{`
        @keyframes twinkle {
          0%   { opacity: 0.15; }
          100% { opacity: 0.95; }
        }
      `}</style>
    </div>
  );
}
