import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// Rotates through counterparty names for the hero sub-headline.
// Ember-gradient clip on the active word.

export default function RotatingText({ words }: { words: string[] }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setI((x) => (x + 1) % words.length);
    }, 2400);
    return () => clearInterval(id);
  }, [words.length]);

  return (
    <span className="relative inline-flex min-w-[6ch] items-baseline overflow-hidden align-baseline">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[i]}
          initial={{ opacity: 0, y: "70%", filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: "-70%", filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease: [0.2, 0.6, 0.2, 1] }}
          className="inline-block text-gradient italic"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
