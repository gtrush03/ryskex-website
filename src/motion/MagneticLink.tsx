// Use to wrap a single interactive element (link, button) that should lean 2-3px toward the cursor on hover.
// No-ops on touch devices and when reduced motion is requested. Preserves click + focus semantics.

import type { ReactNode, MouseEvent } from 'react';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from './useReducedMotion';

export interface MagneticLinkProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

const MAX_DISPLACEMENT = 3;

function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || (navigator.maxTouchPoints ?? 0) > 0;
}

export default function MagneticLink({
  children,
  strength = 0.25,
  className,
}: MagneticLinkProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 22, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 260, damping: 22, mass: 0.35 });

  const disabled = reduced || isTouchDevice();

  const handleMove = (event: MouseEvent<HTMLSpanElement>) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);
    const pullX = Math.max(-MAX_DISPLACEMENT, Math.min(MAX_DISPLACEMENT, relX * strength));
    const pullY = Math.max(-MAX_DISPLACEMENT, Math.min(MAX_DISPLACEMENT, relY * strength));
    x.set(pullX);
    y.set(pullY);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseEnter={handleMove}
      onMouseLeave={handleLeave}
      style={{
        x: disabled ? 0 : springX,
        y: disabled ? 0 : springY,
        display: 'inline-block',
      }}
    >
      {children}
    </motion.span>
  );
}
