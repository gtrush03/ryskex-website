// Use to cascade a heading in character-by-character with a directional fade.
// ~18ms stagger, 480ms per char. Reduced motion renders plain text.

import type { ElementType } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../useReducedMotion';

export interface CharStaggerProps {
  text: string;
  stagger?: number;
  from?: 'top' | 'bottom' | 'left' | 'right';
  as?: 'h1' | 'h2' | 'p' | 'span';
  className?: string;
}

const EASE: [number, number, number, number] = [0.2, 0.6, 0.2, 1];
const OFFSETS = {
  top: { x: 0, y: -12 },
  bottom: { x: 0, y: 12 },
  left: { x: -12, y: 0 },
  right: { x: 12, y: 0 },
} as const;

export default function CharStagger({
  text,
  stagger = 0.018,
  from = 'bottom',
  as = 'span',
  className,
}: CharStaggerProps) {
  const reduced = useReducedMotion();
  const Tag = as as ElementType;

  if (reduced) return <Tag className={className}>{text}</Tag>;

  const offset = OFFSETS[from];
  const chars = Array.from(text);

  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        style={{ display: 'inline-block' }}
        initial="hidden"
        animate="shown"
        aria-hidden="true"
        variants={{ hidden: {}, shown: { transition: { staggerChildren: stagger } } }}
      >
        {chars.map((c, i) => (
          <motion.span
            key={i}
            style={{ display: 'inline-block', whiteSpace: 'pre', willChange: 'transform, opacity' }}
            variants={{
              hidden: { opacity: 0, x: offset.x, y: offset.y },
              shown: { opacity: 1, x: 0, y: 0, transition: { duration: 0.48, ease: EASE } },
            }}
          >
            {c === ' ' ? ' ' : c}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}

export { CharStagger };
