// Use for small status chips — a subtle claret/accent shimmer sweeps across every few seconds.
// Self-contained styles (no global CSS). Respects reduced motion by freezing the sweep.

import type { CSSProperties, ReactNode } from 'react';
import { useId } from 'react';
import { useReducedMotion } from './useReducedMotion';

export interface ShimmerBadgeProps {
  children: ReactNode;
  tone?: 'accent' | 'mute';
  className?: string;
}

export default function ShimmerBadge({
  children,
  tone = 'accent',
  className,
}: ShimmerBadgeProps) {
  const reduced = useReducedMotion();
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const animName = `shimmerSweep_${uid}`;

  const baseBg =
    tone === 'accent' ? 'var(--accent-soft)' : 'var(--surface-2)';
  const textColor = tone === 'accent' ? 'var(--accent)' : 'var(--muted)';
  const borderColor =
    tone === 'accent' ? 'var(--accent-ring)' : 'var(--border)';

  const wrapperStyle: CSSProperties = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 10px',
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    letterSpacing: 'var(--tracking-eyebrow)',
    textTransform: 'uppercase',
    color: textColor,
    background: baseBg,
    border: `1px solid ${borderColor}`,
    borderRadius: 'var(--radius-full)',
    overflow: 'hidden',
    isolation: 'isolate',
  };

  const sweepStyle: CSSProperties = {
    content: '""',
    position: 'absolute',
    inset: 0,
    background:
      'linear-gradient(100deg, transparent 20%, rgba(255,255,255,0.45) 50%, transparent 80%)',
    transform: 'translateX(-120%)',
    animation: reduced ? 'none' : `${animName} 3.2s var(--ease) infinite`,
    pointerEvents: 'none',
    mixBlendMode: 'overlay',
    zIndex: 0,
  };

  const contentStyle: CSSProperties = {
    position: 'relative',
    zIndex: 1,
  };

  return (
    <span className={className} style={wrapperStyle}>
      <style>{`
        @keyframes ${animName} {
          0%   { transform: translateX(-120%); }
          60%  { transform: translateX(120%); }
          100% { transform: translateX(120%); }
        }
      `}</style>
      <span aria-hidden="true" style={sweepStyle} />
      <span style={contentStyle}>{children}</span>
    </span>
  );
}
