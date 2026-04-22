import { motion } from "framer-motion";
import { stats, statSection } from "@/lib/data";
import BlurIn from "@/motion/text/BlurIn";

export default function StatStrip() {
  return (
    <section className="section-ambient relative py-24 md:py-[136px]">
      {/* Ambient cobalt orbs */}
      <div
        aria-hidden
        className="orb orb-blue orb-drift pointer-events-none"
        style={{ top: "-120px", left: "-80px", width: 460, height: 460, opacity: 0.35 }}
      />
      <div
        aria-hidden
        className="orb orb-green orb-drift-2 pointer-events-none"
        style={{ bottom: "-140px", right: "-100px", width: 520, height: 520, opacity: 0.22 }}
      />

      <div className="container-x relative z-10">
        <BlurIn className="mb-16 max-w-3xl">
          <div className="eyebrow mb-5">{statSection.eyebrow}</div>
          <h2 className="display-md text-text">{statSection.title}</h2>
          <p
            className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted md:text-[17px]"
            style={{ textShadow: "0 1px 2px rgba(0,0,0,0.4)" }}
          >
            {statSection.sub}
          </p>
        </BlurIn>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.value}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.2, 0.6, 0.2, 1] }}
              className="glass-deep relative rounded-2xl p-8 md:p-10"
            >
              {/* ambient cobalt glow behind numeral */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2"
                style={{
                  width: 240,
                  height: 240,
                  background: "var(--gradient-glow-orb-blue)",
                  filter: "blur(42px)",
                  opacity: 0.55,
                  zIndex: 0,
                }}
              />
              <div className="relative z-10">
                <div className="absolute left-0 top-0 font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
                  0{i + 1}
                </div>
                <div className="mt-8 stat-numeral text-gradient lit-text">{s.value}</div>
                <p className="mt-5 max-w-[20ch] text-[14px] leading-snug text-text">
                  {s.label}
                </p>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-subtle">
                  {s.source}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
