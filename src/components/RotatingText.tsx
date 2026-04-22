import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/motion/useReducedMotion";

// Rotates through counterparty names for the hero sub-headline.
// Ember-gradient clip on the active word. Respects prefers-reduced-motion:
// when reduced, the word is announced statically (no interval, no transition).

export default function RotatingText({
  words,
  intervalMs = 2400,
}: {
  words: string[];
  intervalMs?: number;
}) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce || words.length < 2) return;
    const id = setInterval(() => {
      setI((x) => (x + 1) % words.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [reduce, words.length, intervalMs]);

  return (
    <span
      className="relative inline-flex min-w-[6ch] items-baseline overflow-hidden align-baseline"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[i]}
          initial={reduce ? false : { opacity: 0, y: "70%", filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: "-70%", filter: "blur(6px)" }}
          transition={{ duration: reduce ? 0.2 : 0.45, ease: [0.2, 0.6, 0.2, 1] }}
          className="inline-block text-gradient italic"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
