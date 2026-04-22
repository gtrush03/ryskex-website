import { motion } from "framer-motion";
import { values } from "@/lib/data";
import BlurIn from "@/motion/text/BlurIn";

export default function ValuesGrid() {
  return (
    <section className="section-ambient relative py-24 md:py-[136px]">
      <div
        aria-hidden
        className="orb orb-blue orb-drift pointer-events-none"
        style={{ top: "5%", left: "-100px", width: 480, height: 480, opacity: 0.22 }}
      />
      <div
        aria-hidden
        className="orb orb-green orb-drift-2 pointer-events-none"
        style={{ bottom: "10%", right: "-100px", width: 440, height: 440, opacity: 0.18 }}
      />

      <div className="container-x relative z-10">
        <BlurIn className="mb-16 max-w-3xl">
          <div className="eyebrow mb-5">OPERATING VALUES</div>
          <h2 className="display-md text-text">
            What cedents get <span className="text-gradient">in writing.</span>
          </h2>
        </BlurIn>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7">
          {values.map((v, i) => {
            const isBlue = i % 2 === 0;
            const arcStroke = isBlue ? "var(--accent)" : "var(--accent-2)";
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="glass-deep relative overflow-hidden rounded-[22px] p-10 md:p-12"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full"
                  style={{
                    background: isBlue
                      ? "var(--gradient-glow-orb-blue)"
                      : "var(--gradient-glow-orb-green)",
                    filter: "blur(56px)",
                    opacity: 0.55,
                  }}
                />
                <div className="relative font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
                  0{i + 1}
                </div>

                {/* Decorative quarter-arc beneath the number eyebrow */}
                <svg
                  aria-hidden
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  className="relative mt-2"
                >
                  <path
                    d="M 2 38 A 36 36 0 0 1 38 2"
                    fill="none"
                    stroke={arcStroke}
                    strokeWidth="1"
                    strokeLinecap="round"
                    opacity="0.55"
                  />
                </svg>

                <h3
                  className="relative mt-4 font-display text-[32px] leading-tight text-text lit-text"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {v.title}
                </h3>
                <p className="relative mt-4 max-w-[38ch] text-[15px] leading-relaxed text-[color:var(--muted)]">
                  {v.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
