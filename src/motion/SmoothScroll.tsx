// Use by wrapping the app (or a major section) to smooth native scroll with a spring-driven target offset.
// Lenis-free — uses Framer Motion's `useSpring` over window.scrollY. Bails on reduced motion, touch, and SSR.

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from './useReducedMotion';

export interface SmoothScrollProps {
  children: ReactNode;
  /** Spring stiffness — higher = snappier. Default 80. */
  stiffness?: number;
  /** Spring damping — higher = less overshoot. Default 20. */
  damping?: number;
  /** Spring mass. Default 0.6. */
  mass?: number;
}

function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || (navigator.maxTouchPoints ?? 0) > 0;
}

export default function SmoothScroll({
  children,
  stiffness = 80,
  damping = 20,
  mass = 0.6,
}: SmoothScrollProps) {
  const reduced = useReducedMotion();
  const target = useMotionValue(0);
  const smoothed = useSpring(target, { stiffness, damping, mass });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (reduced || isTouchDevice()) return;

    let rafId = 0;
    let active = true;

    // Initialize to current scroll position so the first frame doesn't jump.
    target.set(window.scrollY);
    smoothed.jump(window.scrollY);

    const onWheel = (event: WheelEvent) => {
      // Only hijack the default vertical scroll; let pinch-zoom / horizontal continue.
      if (event.ctrlKey || event.metaKey) return;
      event.preventDefault();
      const next = Math.max(
        0,
        Math.min(
          document.documentElement.scrollHeight - window.innerHeight,
          target.get() + event.deltaY,
        ),
      );
      target.set(next);
    };

    const onKey = (event: KeyboardEvent) => {
      const keys = ['PageDown', 'PageUp', 'Home', 'End', 'ArrowDown', 'ArrowUp', 'Space'];
      if (!keys.includes(event.key) && event.code !== 'Space') return;
      // Let browser handle — then sync once it settles.
      requestAnimationFrame(() => {
        target.set(window.scrollY);
        smoothed.jump(window.scrollY);
      });
    };

    const onResize = () => {
      target.set(window.scrollY);
      smoothed.jump(window.scrollY);
    };

    const tick = () => {
      if (!active) return;
      const y = smoothed.get();
      window.scrollTo(0, y);
      rafId = window.requestAnimationFrame(tick);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    rafId = window.requestAnimationFrame(tick);

    return () => {
      active = false;
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [reduced, target, smoothed]);

  return <>{children}</>;
}
