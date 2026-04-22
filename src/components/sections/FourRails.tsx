// File kept for import stability — now renders the "Four convictions" block.
// Real pillars from Agent B copy deck.

import { motion } from "framer-motion";
import { pillars, pillarsSection } from "@/lib/data";
import BlurIn from "@/motion/text/BlurIn";

export default function FourRails() {
  return (
    <section className="section-ambient relative py-24 md:py-[136px]">
      <div
        aria-hidden
        className="orb orb-blue orb-drift pointer-events-none"
        style={{ top: "20%", left: "50%", width: 640, height: 640, transform: "translateX(-50%)", opacity: 0.25 }}
      />
      <div
        aria-hidden
        className="orb orb-green orb-drift-2 pointer-events-none"
        style={{ bottom: "-60px", right: "-80px", width: 420, height: 420, opacity: 0.18 }}
      />

      <div className="container-x relative z-10">
        <BlurIn className="mb-16 max-w-3xl">
          <div className="eyebrow mb-5">{pillarsSection.eyebrow}</div>
          <h2 className="display-md text-text">{pillarsSection.title}</h2>
          <p className="shadow-text-soft mt-5 max-w-2xl text-[15px] leading-relaxed text-[color:var(--muted)] md:text-[17px]">
            {pillarsSection.dek}
          </p>
        </BlurIn>

        <div className="grid gap-6 md:grid-cols-2 md:gap-7">
          {pillars.map((p, i) => {
            const glowIsBlue = i % 2 === 0;
            return (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="glass glass-deep relative overflow-hidden rounded-[22px] p-10 md:p-12"
              >
                {/* Brand-gradient glow behind the pillar number (alternating blue/green) */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -left-10 -top-10 h-44 w-44 rounded-full"
                  style={{
                    background: glowIsBlue
                      ? "var(--gradient-glow-orb-blue)"
                      : "var(--gradient-glow-orb-green)",
                    filter: "blur(48px)",
                    opacity: 0.6,
                  }}
                />

                <div className="relative flex items-center gap-4">
                  <span
                    className="inline-flex items-center justify-center rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em]"
                    style={{
                      background: "var(--accent-soft)",
                      color: "var(--accent)",
                      border: "1px solid var(--accent-ring)",
                    }}
                  >
                    {p.n}
                  </span>
                  <span className="tick-84" />
                </div>

                <h3
                  className="relative mt-8 font-display text-[28px] leading-[1.08] text-text md:text-[40px] lit-text"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {p.title}
                </h3>
                <p className="shadow-text-soft relative mt-5 max-w-[38ch] text-[16px] leading-relaxed text-[color:var(--muted)]">
                  {p.body}
                </p>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-16 max-w-2xl font-mono text-[11px] uppercase tracking-[0.14em] text-subtle">
          {pillarsSection.footer}
        </p>
      </div>
    </section>
  );
}
