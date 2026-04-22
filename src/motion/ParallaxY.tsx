// Use to add a subtle scroll-linked Y translate to a block (e.g. hero art, decorative card).
// Default range ±40px while the element traverses the viewport. Reduced motion: no transform.

import type { ReactNode } from 'react';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from './useReducedMotion';

type ScrollOffset =
  | 'start end'
  | 'start start'
  | 'end end'
  | 'end start'
  | 'start center'
  | 'center end'
  | 'center start'
  | 'center center'
  | 'end center';

export interface ParallaxYProps {
  children: ReactNode;
  range?: [number, number];
  offset?: [ScrollOffset, ScrollOffset];
  className?: string;
}

export default function ParallaxY({
  children,
  range = [-40, 40],
  offset = ['start end', 'end start'],
  className,
}: ParallaxYProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], range);

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} className={className} style={{ y, willChange: 'transform' }}>
      {children}
    </motion.div>
  );
}
