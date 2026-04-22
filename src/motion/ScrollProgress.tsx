// Use once near the app root to render a fixed 2px claret scroll-progress line at the top of the viewport.
// Reads like a ledger index line. Hidden when prefers-reduced-motion: reduce.

import { motion, useScroll, useSpring } from 'framer-motion';
import { useReducedMotion } from './useReducedMotion';

export default function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 26,
    mass: 0.4,
    restDelta: 0.001,
  });

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        scaleX,
        transformOrigin: '0% 50%',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: 'var(--accent)',
        zIndex: 60,
        pointerEvents: 'none',
      }}
    />
  );
}
