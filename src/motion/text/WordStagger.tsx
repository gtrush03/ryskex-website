// Use when you want a heading to cascade in word-by-word (not char-by-char) with wrap-safe boundaries.
// 50ms stagger, 480ms per word. Reduced motion renders plain text.

import type { ElementType } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../useReducedMotion';

export interface WordStaggerProps {
  text: string;
  stagger?: number;
  as?: 'h1' | 'h2' | 'p' | 'span';
  className?: string;
}

const EASE: [number, number, number, number] = [0.2, 0.6, 0.2, 1];

export default function WordStagger({
  text,
  stagger = 0.05,
  as = 'span',
  className,
}: WordStaggerProps) {
  const reduced = useReducedMotion();
  const Tag = as as ElementType;

  if (reduced) return <Tag className={className}>{text}</Tag>;

  const words = text.split(/(\s+)/);

  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        style={{ display: 'inline' }}
        initial="hidden"
        animate="shown"
        aria-hidden="true"
        variants={{ hidden: {}, shown: { transition: { staggerChildren: stagger } } }}
      >
        {words.map((w, i) => {
          if (/^\s+$/.test(w)) return <span key={i} style={{ whiteSpace: 'pre' }}>{w}</span>;
          return (
            <motion.span
              key={i}
              style={{ display: 'inline-block', willChange: 'transform, opacity' }}
              variants={{
                hidden: { opacity: 0, y: 14 },
                shown: { opacity: 1, y: 0, transition: { duration: 0.48, ease: EASE } },
              }}
            >
              {w}
            </motion.span>
          );
        })}
      </motion.span>
    </Tag>
  );
}

export { WordStagger };
