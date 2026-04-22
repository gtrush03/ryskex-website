// Use to wrap a prominent CTA (button/link) — cursor pulls it within a 120px radius, max 6px displacement.
// Spring-dampened + subtle 1.02 scale on hover. No-op on touch + reduced motion. Pointer events pass through.

import type { ReactNode, MouseEvent, ElementType } from 'react';
import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from './useReducedMotion';

export interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  as?: 'button' | 'a' | 'div';
}

const RADIUS = 120;
const MAX_DISPLACEMENT = 6;

function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || (navigator.maxTouchPoints ?? 0) > 0;
}

export default function MagneticButton({
  children,
  className,
  as = 'div',
}: MagneticButtonProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);

  const springConfig = { stiffness: 160, damping: 20, mass: 0.6 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const springScale = useSpring(scale, springConfig);

  const disabled = reduced || isTouchDevice();

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = event.clientX - cx;
    const dy = event.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > RADIUS) {
      x.set(0);
      y.set(0);
      return;
    }
    const factor = (1 - dist / RADIUS) * (MAX_DISPLACEMENT / RADIUS);
    x.set(dx * factor);
    y.set(dy * factor);
  };

  const handleEnter = () => {
    if (disabled) return;
    setHovered(true);
    scale.set(1.02);
  };

  const handleLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
    scale.set(1);
  };

  const MotionTag = motion[as] as ElementType;

  return (
    <MotionTag
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        x: disabled ? 0 : springX,
        y: disabled ? 0 : springY,
        scale: disabled ? 1 : springScale,
        display: 'inline-block',
        willChange: hovered ? 'transform' : 'auto',
      }}
    >
      {children}
    </MotionTag>
  );
}
