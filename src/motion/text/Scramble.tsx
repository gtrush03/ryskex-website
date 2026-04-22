// Use to decode a word/phrase from random glyphs into its final text over a fixed duration.
// Good for stat labels, status flips, or reveal moments. Reduced motion renders the final text instantly.

import { useEffect, useState } from 'react';
import type { ElementType } from 'react';
import { useMotionValue, useMotionValueEvent } from 'framer-motion';
import { useReducedMotion } from '../useReducedMotion';

export interface ScrambleProps {
  text: string;
  duration?: number;
  charSet?: string;
  as?: 'h1' | 'h2' | 'p' | 'span';
  className?: string;
}

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*';

export default function Scramble({
  text,
  duration = 1200,
  charSet = DEFAULT_CHARS,
  as = 'span',
  className,
}: ScrambleProps) {
  const reduced = useReducedMotion();
  const [out, setOut] = useState<string>(text);
  const progress = useMotionValue(0);
  const Tag = as as ElementType;

  useMotionValueEvent(progress, 'change', (p) => {
    const unlocked = Math.floor(p * text.length);
    let next = '';
    for (let i = 0; i < text.length; i++) {
      if (i < unlocked || /\s/.test(text[i])) next += text[i];
      else next += charSet[Math.floor(Math.random() * charSet.length)];
    }
    setOut(next);
  });

  useEffect(() => {
    if (reduced) { setOut(text); return; }
    progress.set(0);
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / Math.max(1, duration));
      progress.set(p);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setOut(text);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, duration, reduced, progress]);

  return <Tag className={className} aria-label={text}><span aria-hidden="true">{out}</span></Tag>;
}

export { Scramble };
