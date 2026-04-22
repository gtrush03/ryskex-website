// Use for long horizontal/vertical scroll reveals — inner content sticks while outer scrolls.
// Exposes scroll progress (0 → 1) via render-prop: <ScrollPin>{({ progress }) => ...}</ScrollPin>.

import type { CSSProperties, ReactNode } from 'react';
import { useRef } from 'react';
import { useScroll, type MotionValue } from 'framer-motion';

export interface ScrollPinRenderProps {
  progress: MotionValue<number>;
}

export interface ScrollPinProps {
  children: ReactNode | ((props: ScrollPinRenderProps) => ReactNode);
  height?: string;
  className?: string;
  innerClassName?: string;
  innerStyle?: CSSProperties;
}

export default function ScrollPin({
  children,
  height = '200vh',
  className,
  innerClassName,
  innerStyle,
}: ScrollPinProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const rendered =
    typeof children === 'function'
      ? (children as (p: ScrollPinRenderProps) => ReactNode)({ progress: scrollYProgress })
      : children;

  return (
    <div ref={ref} className={className} style={{ position: 'relative', height }}>
      <div
        className={innerClassName}
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          ...innerStyle,
        }}
      >
        {rendered}
      </div>
    </div>
  );
}
