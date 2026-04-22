// Use for scroll-triggered text or block reveals that should feel soft and cinematic.
// Defocuses from blur(12px) + Y+16 + opacity 0 on viewport entry. Reduced motion → no motion.

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../useReducedMotion';

export interface BlurInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

const EASE: [number, number, number, number] = [0.2, 0.6, 0.2, 1];

export default function BlurIn({
  children,
  delay = 0,
  duration = 700,
  className,
}: BlurInProps) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16, filter: 'blur(12px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: duration / 1000, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export { BlurIn };
