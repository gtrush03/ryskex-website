import { motion } from "framer-motion";
import { pressQuotes } from "@/lib/data";
import BlurIn from "@/motion/text/BlurIn";
import { EASE_OUT_SOFT, STAGGER_CHILD } from "@/motion/constants";

export default function PressStrip() {
  return (
    <section className="section-ambient relative py-24 md:py-[136px]">
      <div
        aria-hidden
        className="orb orb-deep orb-drift pointer-events-none"
        style={{ top: "10%", right: "-100px", width: 480, height: 480, opacity: 0.25 }}
      />
      <div
        aria-hidden
        className="orb orb-blue orb-drift-2 pointer-events-none"
        style={{ bottom: "10%", left: "-120px", width: 420, height: 420, opacity: 0.20 }}
      />

      <div className="container-x relative z-10">
        <BlurIn className="mb-16 max-w-3xl">
          <div className="eyebrow mb-5">IN THE RECORD</div>
          <h2 className="display-md text-text">
            What the captive press has <span className="text-gradient">said.</span>
          </h2>
        </BlurIn>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {pressQuotes.map((p, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * STAGGER_CHILD, ease: EASE_OUT_SOFT }}
              className="glass-deep relative overflow-hidden rounded-[22px] p-10"
            >
              {/* drop-cap glow behind the opening quote */}
              <div
                aria-hidden
                className="pointer-events-none absolute -left-6 -top-6 h-44 w-44 rounded-full"
                style={{
                  background: i % 2 === 0 ? "var(--gradient-glow-orb-blue)" : "var(--gradient-glow-orb-green)",
                  filter: "blur(48px)",
                  opacity: 0.7,
                }}
              />
              <span
                aria-hidden
                className="absolute left-6 top-3 font-display text-[110px] italic leading-none opacity-60"
                style={{
                  backgroundImage: "var(--gradient-text)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                "
              </span>
              <p
                className="relative font-display text-[22px] italic leading-[1.3] text-text md:text-[26px] lit-text"
                style={{ letterSpacing: "-0.012em" }}
              >
                {p.quote}
              </p>
              <footer className="relative mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                <span className="text-accent">{p.source}</span> · {p.context}
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
