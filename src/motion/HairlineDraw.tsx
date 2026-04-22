// Use when a thin diagram line should draw itself on scroll into view.
// Stroke uses `currentColor` so parent text color sets the line color. Honors reduced motion (renders instantly).

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from './useReducedMotion';

export interface HairlineDrawProps {
  d: string;
  strokeWidth?: number;
  className?: string;
  duration?: number;
  viewBox?: string;
}

export default function HairlineDraw({
  d,
  strokeWidth = 1,
  className,
  duration = 360,
  viewBox = '0 0 100 100',
}: HairlineDrawProps) {
  const reduced = useReducedMotion();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const inView = useInView(svgRef, { once: true, margin: '-80px' });
  const [length, setLength] = useState<number>(1000);

  useEffect(() => {
    if (pathRef.current) {
      try {
        const measured = pathRef.current.getTotalLength();
        if (measured && Number.isFinite(measured) && measured > 0) {
          setLength(measured);
        }
      } catch {
        // Fallback stays at 1000.
      }
    }
  }, [d]);

  const shouldAnimate = !reduced && inView;

  return (
    <svg
      ref={svgRef}
      className={className}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <motion.path
        ref={pathRef}
        d={d}
        initial={reduced ? { strokeDashoffset: 0 } : { strokeDashoffset: length }}
        animate={{ strokeDashoffset: shouldAnimate ? 0 : reduced ? 0 : length }}
        transition={{ duration: duration / 1000, ease: [0.2, 0.6, 0.2, 1] }}
        style={{ strokeDasharray: length }}
      />
    </svg>
  );
}
