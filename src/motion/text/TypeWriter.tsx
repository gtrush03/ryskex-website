// Use to reveal a string character-by-character with an optional blinking caret.
// Good for terminal-flavored headlines or "hero" call-outs. Reduced motion shows full text instantly.

import { useEffect, useState } from 'react';
import type { ElementType } from 'react';
import { useReducedMotion } from '../useReducedMotion';

export interface TypeWriterProps {
  text: string;
  speed?: number;
  startDelay?: number;
  cursor?: boolean;
  as?: 'h1' | 'h2' | 'p' | 'span';
  className?: string;
}

export default function TypeWriter({
  text,
  speed = 40,
  startDelay = 0,
  cursor = true,
  as = 'span',
  className,
}: TypeWriterProps) {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState<string>(reduced ? text : '');
  const Tag = as as ElementType;

  useEffect(() => {
    if (reduced) {
      setShown(text);
      return;
    }
    setShown('');
    let i = 0;
    let tickId: ReturnType<typeof setInterval>;
    const startId = setTimeout(() => {
      tickId = setInterval(() => {
        i += 1;
        setShown(text.slice(0, i));
        if (i >= text.length) clearInterval(tickId);
      }, Math.max(1, speed));
    }, Math.max(0, startDelay));
    return () => {
      clearTimeout(startId);
      if (tickId) clearInterval(tickId);
    };
  }, [text, speed, startDelay, reduced]);

  return (
    <Tag className={className} aria-label={text}>
      <span aria-hidden="true">{shown}</span>
      {cursor && !reduced && (
        <span
          aria-hidden="true"
          style={{
            display: 'inline-block',
            width: '0.6ch',
            marginLeft: '0.05em',
            animation: 'tw-caret 1s steps(1) infinite',
          }}
        >
          |
        </span>
      )}
      <style>{`@keyframes tw-caret { 0%,49%{opacity:1} 50%,100%{opacity:0} }`}</style>
    </Tag>
  );
}

export { TypeWriter };
