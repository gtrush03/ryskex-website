// Use to highlight short phrases with a slowly moving brand gradient clipped to the text.
// Pure CSS animation (6s linear infinite). Reduced motion freezes the gradient in place.

import type { CSSProperties, ReactNode } from 'react';
import { useId } from 'react';
import { useReducedMotion } from './useReducedMotion';

export interface AnimatedGradientTextProps {
  children: ReactNode;
  className?: string;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p';
}

export default function AnimatedGradientText({
  children,
  className,
  as = 'span',
}: AnimatedGradientTextProps) {
  const reduced = useReducedMotion();
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const animName = `gradientShift_${uid}`;

  const style: CSSProperties = {
    backgroundImage:
      'linear-gradient(90deg, var(--accent-2), var(--accent), var(--accent-2))',
    backgroundSize: '200% 100%',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    color: 'transparent',
    animation: reduced ? 'none' : `${animName} 6s linear infinite`,
    display: 'inline-block',
  };

  const keyframes = `
    @keyframes ${animName} {
      0%   { background-position: 0% 50%; }
      100% { background-position: 200% 50%; }
    }
  `;

  if (as === 'h1') {
    return (
      <h1 className={className} style={style}>
        <style>{keyframes}</style>
        {children}
      </h1>
    );
  }
  if (as === 'h2') {
    return (
      <h2 className={className} style={style}>
        <style>{keyframes}</style>
        {children}
      </h2>
    );
  }
  if (as === 'h3') {
    return (
      <h3 className={className} style={style}>
        <style>{keyframes}</style>
        {children}
      </h3>
    );
  }
  if (as === 'p') {
    return (
      <p className={className} style={style}>
        <style>{keyframes}</style>
        {children}
      </p>
    );
  }
  return (
    <span className={className} style={style}>
      <style>{keyframes}</style>
      {children}
    </span>
  );
}
