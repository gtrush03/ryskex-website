// Canvas-based depth-field particles with subtle parallax drift.
// ~200 particles across 3 depth layers — white, cobalt, green, wraps at edges.

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  r: number;
  vx: number;
  depth: number;
  color: string;
};

type Props = {
  density?: number;
  className?: string;
};

const COLORS = [
  { stop: 0.6, rgba: "rgba(244, 245, 248, 0.4)" },
  { stop: 0.85, rgba: "rgba(59, 114, 222, 0.6)" },
  { stop: 1, rgba: "rgba(46, 196, 110, 0.5)" },
];

function pickColor(r: number): string {
  for (const c of COLORS) if (r < c.stop) return c.rgba;
  return COLORS[COLORS.length - 1]!.rgba;
}

export default function ParticleField({ density = 200, className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    const mouse = { x: 0, y: 0 };
    let particles: Particle[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      particles = Array.from({ length: density }, () => {
        const layer = Math.random();
        const depth = layer < 0.5 ? 0.35 : layer < 0.8 ? 0.7 : 1;
        const r = 0.8 + Math.random() * 1.7 * depth;
        const vx = 0.05 + Math.random() * 0.25 * depth;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r,
          vx,
          depth,
          color: pickColor(Math.random()),
        };
      });
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    let rafId = 0;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      const px = (mouse.x - w / 2) * 0.008;
      const py = (mouse.y - h / 2) * 0.008;

      for (const p of particles) {
        p.x += p.vx;
        if (p.x - p.r > w) p.x = -p.r;
        if (p.x + p.r < 0) p.x = w + p.r;

        const ox = px * p.depth;
        const oy = py * p.depth;

        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.arc(p.x + ox, p.y + oy, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      rafId = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const onResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      resize();
      seed();
      if (reduced) drawStatic();
    };

    resize();
    seed();

    if (reduced) {
      drawStatic();
    } else {
      window.addEventListener("pointermove", onMove, { passive: true });
      rafId = requestAnimationFrame(tick);
    }
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
