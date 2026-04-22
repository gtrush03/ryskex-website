// Use for a continuously sweeping brand gradient on inline text (title flourishes, emphasis words).
// 5s linear loop over the brand gradient. Reduced motion renders a static gradient fill.

import type { CSSProperties, ElementType, ReactNode } from 'react';
import { useId } from 'react';
import { useReducedMotion } from '../useReducedMotion';

export interface GradientSweepProps {
  children: ReactNode;
  duration?: number;
  as?: 'h1' | 'h2' | 'p' | 'span';
  className?: string;
}

export default function GradientSweep({
  children,
  duration = 5000,
  as = 'span',
  className,
}: GradientSweepProps) {
  const reduced = useReducedMotion();
  const Tag = as as ElementType;
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const animName = `gs_sweep_${uid}`;

  const style: CSSProperties = {
    backgroundImage: 'var(--gradient-text)',
    backgroundSize: '200% 100%',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    color: 'transparent',
    display: 'inline-block',
    animation: reduced ? 'none' : `${animName} ${duration}ms linear infinite`,
  };

  const keyframes = `@keyframes ${animName} { 0% { background-position: 0% 0%; } 100% { background-position: -100% 0%; } }`;

  return (
    <Tag className={className} style={style}>
      {!reduced && <style>{keyframes}</style>}
      {children}
    </Tag>
  );
}

export { GradientSweep };
