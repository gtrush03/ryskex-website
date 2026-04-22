import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { faqs } from "@/lib/data";
import BlurIn from "@/motion/text/BlurIn";

export default function FAQ() {
  const [openIdx, setOpen] = useState<number | null>(0);
  return (
    <section className="section-ambient relative py-24 md:py-[136px]">
      <div
        aria-hidden
        className="orb orb-blue orb-drift pointer-events-none"
        style={{ top: "10%", right: "-140px", width: 520, height: 520, opacity: 0.22 }}
      />
      <div
        aria-hidden
        className="orb orb-green orb-drift-2 pointer-events-none"
        style={{ bottom: "15%", left: "-120px", width: 440, height: 440, opacity: 0.18 }}
      />

      <div className="container-x relative z-10 grid gap-12 md:grid-cols-[1fr_2fr] md:gap-24">
        <BlurIn>
          <div className="eyebrow mb-5">FAQ</div>
          <h2 className="display-md text-text">
            <span className="text-gradient">Six questions</span> cedents ask on the first call.
          </h2>
          <p
            className="mt-6 max-w-[36ch] text-[14px] leading-relaxed text-muted"
            style={{ textShadow: "0 1px 2px rgba(0,0,0,0.4)" }}
          >
            Not marketing FAQs. The same six things your captive manager, your
            counsel, and your reinsurance broker will want cleared in the first
            meeting.
          </p>
        </BlurIn>

        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = openIdx === i;
            return (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className={`${isOpen ? "glass-deep" : "glass"} relative w-full rounded-2xl p-6 text-left transition-all md:p-7`}
                  style={{
                    boxShadow: isOpen
                      ? "inset 0 1px 0 rgba(244,245,248,0.10), inset 0 -1px 0 rgba(0,0,0,0.35), 0 24px 64px -24px rgba(59,114,222,0.25), 0 0 0 1px rgba(59,114,222,0.18)"
                      : undefined,
                  }}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex items-start gap-4">
                      <span className="pt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-subtle">
                        0{i + 1}
                      </span>
                      <span className="text-[15px] font-medium leading-snug text-text md:text-[16px]">
                        {f.q}
                      </span>
                    </div>
                    <span
                      className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-all"
                      style={{
                        background: isOpen ? "var(--accent)" : "var(--accent-soft)",
                        color: isOpen ? "var(--accent-fg)" : "var(--accent)",
                        boxShadow: isOpen
                          ? "0 0 0 4px rgba(59,114,222,0.18), 0 8px 24px -8px rgba(59,114,222,0.55)"
                          : "none",
                      }}
                    >
                      {isOpen ? <Minus size={14} strokeWidth={2} /> : <Plus size={14} strokeWidth={2} />}
                    </span>
                  </div>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.2, 0.6, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="ml-[42px] mr-10 mt-4 text-[14px] leading-relaxed text-muted">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
