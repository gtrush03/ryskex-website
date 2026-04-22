import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { rails, railsSection } from "@/lib/data";
import { RAIL_ICONS } from "@/components/RailIcons";
import GlowCard from "@/components/ui/spotlight-card";
import BlurIn from "@/motion/text/BlurIn";
import { useReducedMotion } from "@/motion/useReducedMotion";

export default function FeaturesGrid() {
  const reduced = useReducedMotion();

  return (
    <section className="section-ambient relative py-24 md:py-[136px]">
      <div
        aria-hidden
        className="orb orb-deep orb-drift pointer-events-none"
        style={{ top: "10%", left: "-120px", width: 520, height: 520, opacity: 0.28 }}
      />
      <div
        aria-hidden
        className="orb orb-green orb-drift-2 pointer-events-none"
        style={{ bottom: "5%", right: "-120px", width: 460, height: 460, opacity: 0.22 }}
      />

      <div className="container-x relative z-10">
        <BlurIn className="mb-16 max-w-3xl">
          <div className="eyebrow mb-5">{railsSection.eyebrow}</div>
          <h2 className="display-md text-text">{railsSection.title}</h2>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-[color:var(--muted)] md:text-[17px]">
            {railsSection.dek}
          </p>
        </BlurIn>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rails.map((r, i) => {
            const Icon = RAIL_ICONS[r.icon] ?? RAIL_ICONS.seal;
            const glowColor =
              i % 3 === 0 ? "blue" : i % 3 === 1 ? "green" : "gradient";
            const iconIsGreen = i % 3 === 1;
            // Decorative "rail spec" fake progress (varied across cards).
            const specPct = 42 + ((i * 11) % 45); // 42..86
            return (
              <motion.div
                key={r.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.2, 0.6, 0.2, 1] }}
                whileHover={reduced ? undefined : { scale: 1.02 }}
              >
                <GlowCard
                  glowColor={glowColor as "blue" | "green" | "gradient"}
                  customSize
                  className="group relative w-full !aspect-auto p-8 md:p-9"
                >
                  <div className="relative z-10">
                    <div className="mb-8 flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-subtle">
                        {r.n} / 06
                      </span>
                      <div
                        className={`icon-aura ${iconIsGreen ? "green" : ""}`}
                        style={{
                          color: iconIsGreen ? "var(--accent-2)" : "var(--accent)",
                          boxShadow: iconIsGreen
                            ? "0 0 0 1px rgba(46, 196, 110, 0.18), 0 6px 24px -6px rgba(46, 196, 110, 0.35)"
                            : "0 0 0 1px rgba(59, 114, 222, 0.20), 0 6px 24px -6px rgba(59, 114, 222, 0.40)",
                        }}
                      >
                        <Icon />
                      </div>
                    </div>
                    <h3 className="text-[18px] font-medium leading-tight text-text md:text-[19px]">
                      {r.name}
                    </h3>

                    {/* Decorative rail-spec progress indicator */}
                    <div
                      aria-hidden
                      className="mt-3 h-[2px] w-[40px] overflow-hidden rounded-full"
                      style={{ background: "rgba(244, 245, 248, 0.08)" }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${specPct}%`,
                          background:
                            "linear-gradient(90deg, var(--accent) 0%, rgba(59, 114, 222, 0.55) 100%)",
                        }}
                      />
                    </div>

                    <p
                      className="mt-4 text-[14px] leading-relaxed text-white/90"
                      style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)" }}
                    >
                      {r.body}
                    </p>
                    <div className="mt-7 inline-flex items-center gap-1 text-[12.5px] font-medium text-[color:var(--muted)] transition-colors group-hover:text-accent">
                      Read the rail spec
                      <ArrowUpRight size={13} strokeWidth={2} />
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
