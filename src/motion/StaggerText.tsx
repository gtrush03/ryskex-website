// Use to split a headline into characters or words and cascade each piece in on mount.
// 12px Y rise + fade, 480ms per piece, ~18ms (char) or ~60ms (word) stagger. Reduced motion renders plain text.

import type { ElementType } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from './useReducedMotion';

export interface StaggerTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'span';
  by?: 'char' | 'word';
  delay?: number;
  className?: string;
}

const EASE: [number, number, number, number] = [0.2, 0.6, 0.2, 1];

export default function StaggerText({
  text,
  as = 'span',
  by = 'char',
  delay = 0,
  className,
}: StaggerTextProps) {
  const reduced = useReducedMotion();
  const Tag = as as ElementType;

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  const pieces = by === 'word' ? text.split(/(\s+)/) : Array.from(text);
  const perStep = by === 'word' ? 0.06 : 0.018;

  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        style={{ display: 'inline-block' }}
        initial="hidden"
        animate="shown"
        aria-hidden="true"
        variants={{
          hidden: {},
          shown: {
            transition: {
              delayChildren: delay,
              staggerChildren: perStep,
            },
          },
        }}
      >
        {pieces.map((piece, i) => {
          const isWhitespace = /^\s+$/.test(piece);
          if (isWhitespace) {
            return (
              <span key={`ws-${i}`} style={{ whiteSpace: 'pre' }}>
                {piece}
              </span>
            );
          }
          return (
            <motion.span
              key={`pc-${i}`}
              style={{ display: 'inline-block', willChange: 'transform, opacity' }}
              variants={{
                hidden: { opacity: 0, y: 12 },
                shown: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.48, ease: EASE },
                },
              }}
            >
              {piece === ' ' ? ' ' : piece}
            </motion.span>
          );
        })}
      </motion.span>
    </Tag>
  );
}
