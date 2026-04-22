// Use for ambient "alive" headlines: each char has a subtle idle sine-wave translate that amplifies on hover.
// Pure CSS animation with per-char delay — lightweight. Reduced motion renders static text.

import type { CSSProperties, ElementType } from 'react';
import { useId } from 'react';
import { useReducedMotion } from '../useReducedMotion';

export interface SplitWaveProps {
  text: string;
  amplitude?: number;
  speed?: number;
  as?: 'h1' | 'h2' | 'p' | 'span';
  className?: string;
}

export default function SplitWave({
  text,
  amplitude = 3,
  speed = 2600,
  as = 'span',
  className,
}: SplitWaveProps) {
  const reduced = useReducedMotion();
  const Tag = as as ElementType;
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const idle = `sw_idle_${uid}`;
  const hover = `sw_hover_${uid}`;

  if (reduced) return <Tag className={className}>{text}</Tag>;

  const chars = Array.from(text);
  const keyframes = `
    @keyframes ${idle}  { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-${amplitude}px) } }
    @keyframes ${hover} { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-${amplitude * 2}px) } }
    .${idle}-root:hover .${idle}-ch { animation-name: ${hover}; animation-duration: ${Math.max(400, speed / 2)}ms; }
  `;

  return (
    <Tag className={`${className ?? ''} ${idle}-root`.trim()} aria-label={text}>
      <style>{keyframes}</style>
      <span aria-hidden="true" style={{ display: 'inline-block' }}>
        {chars.map((c, i) => {
          const style: CSSProperties = {
            display: 'inline-block',
            whiteSpace: 'pre',
            animation: `${idle} ${speed}ms ease-in-out ${(i * 60) % speed}ms infinite`,
            willChange: 'transform',
          };
          return <span key={i} className={`${idle}-ch`} style={style}>{c === ' ' ? ' ' : c}</span>;
        })}
      </span>
    </Tag>
  );
}

export { SplitWave };
