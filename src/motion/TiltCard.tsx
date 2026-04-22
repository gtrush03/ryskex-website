// Use to add a subtle 3D mouse-tilt to cards/panels. Max 6deg at intensity=1, spring-dampened return.
// Disables on touch + reduced motion. Pointer events pass through.

import type { ReactNode, MouseEvent } from 'react';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useReducedMotion } from './useReducedMotion';

export interface TiltCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number; // 0..1, default 0.5
}

const MAX_TILT = 6; // degrees

function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || (navigator.maxTouchPoints ?? 0) > 0;
}

export default function TiltCard({
  children,
  className,
  intensity = 0.5,
}: TiltCardProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);

  // -0.5..0.5 normalized pointer position relative to card center.
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const spring = { stiffness: 180, damping: 22, mass: 0.5 };
  const springPx = useSpring(px, spring);
  const springPy = useSpring(py, spring);

  const clamped = Math.max(0, Math.min(1, intensity));
  const deg = MAX_TILT * clamped;

  // Tilt around X (from vertical pointer) and Y (from horizontal pointer).
  const rotateX = useTransform(springPy, [-0.5, 0.5], [deg, -deg]);
  const rotateY = useTransform(springPx, [-0.5, 0.5], [-deg, deg]);

  const disabled = reduced || isTouchDevice();

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;
    px.set(nx);
    py.set(ny);
  };

  const handleLeave = () => {
    px.set(0);
    py.set(0);
  };

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        perspective: 1000,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      {children}
    </motion.div>
  );
}
