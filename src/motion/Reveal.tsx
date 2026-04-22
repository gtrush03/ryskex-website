// Use when a block of content should rise + fade in as it scrolls into view.
// Default: 8px Y rise, 240ms, once-per-session. Honors reduced motion (renders children plainly).

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from './useReducedMotion';

export interface RevealProps {
  children: ReactNode;
  delay?: number;
  amount?: 'some' | 'all';
  y?: number;
  className?: string;
}

const EASE: [number, number, number, number] = [0.2, 0.6, 0.2, 1];

export default function Reveal({
  children,
  delay = 0,
  amount = 'some',
  y = 8,
  className,
}: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px', amount }}
      transition={{ duration: 0.24, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
