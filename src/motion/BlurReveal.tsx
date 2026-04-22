// Use for scroll-triggered reveals that need a little more presence than `Reveal` — blur + Y + opacity.
// 700ms, plays once per scroll when ~80px before viewport edge. Reduced motion renders children in final state.

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from './useReducedMotion';
import { DURATION_SLOW, EASE_OUT_SOFT } from './constants';

export interface BlurRevealProps {
  children: ReactNode;
  delay?: number;
  amount?: 'some' | 'all';
  className?: string;
}

export default function BlurReveal({
  children,
  delay = 0,
  amount = 'some',
  className,
}: BlurRevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px', amount }}
      transition={{ duration: DURATION_SLOW, ease: EASE_OUT_SOFT, delay }}
    >
      {children}
    </motion.div>
  );
}
