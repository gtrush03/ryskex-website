// Use when a KPI / stat number should count from 0 to its final value on first viewport entry.
// Tabular numerals, 900ms ease-out by default. Honors reduced motion (renders final value instantly).

import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useMotionValue, useTransform } from 'framer-motion';
import { useReducedMotion } from './useReducedMotion';

export interface CountUpProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export default function CountUp({
  value,
  duration = 900,
  prefix = '',
  suffix = '',
  decimals = 0,
  className,
}: CountUpProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (latest: number) => latest.toFixed(decimals));
  const [display, setDisplay] = useState<string>((0).toFixed(decimals));

  useEffect(() => {
    const unsubscribe = rounded.on('change', (v: string) => setDisplay(v));
    return () => unsubscribe();
  }, [rounded]);

  useEffect(() => {
    if (reduced) {
      setDisplay(value.toFixed(decimals));
      return;
    }
    if (!inView) return;

    const controls = animate(mv, value, {
      duration: duration / 1000,
      ease: [0.2, 0.6, 0.2, 1],
    });
    return () => controls.stop();
  }, [inView, reduced, value, duration, decimals, mv]);

  return (
    <span
      ref={ref}
      className={className}
      style={{ fontVariantNumeric: 'tabular-nums' }}
    >
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
