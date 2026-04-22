import { motion } from "framer-motion";
import { team } from "@/lib/data";
import { TeamHero } from "@/components/hero-art";
import BlurIn from "@/motion/text/BlurIn";
import { DURATION_NORMAL, EASE_OUT_SOFT } from "@/motion/constants";

export default function Team() {
  return (
    <>
      <section className="mesh-hero dark-scope relative overflow-hidden pt-24 pb-16 md:pt-44 md:pb-24">
        <div className="aurora" aria-hidden />
        <div className="noise" aria-hidden />
        <div
          aria-hidden
          className="orb orb-blue orb-drift pointer-events-none"
          style={{ top: "10%", left: "-100px", width: 520, height: 520, opacity: 0.30 }}
        />
        <div
          aria-hidden
          className="orb orb-green orb-drift-2 pointer-events-none"
          style={{ bottom: "5%", right: "-80px", width: 460, height: 460, opacity: 0.22 }}
        />
        <div className="container-x relative z-10 grid items-center gap-10 md:grid-cols-[1.3fr_1fr] md:gap-16">
          <BlurIn>
            <div className="chip mb-8 inline-flex">THE PEOPLE</div>
            <h1
              className="display-lg max-w-[22ch] text-text"
              style={{ fontSize: "clamp(34px, 7vw, 84px)" }}
            >
              Built by captive insiders,<span className="hidden md:inline"><br /></span>{" "}
              exchange engineers, and<span className="hidden md:inline"><br /></span>{" "}
              <span className="text-gradient">institutional researchers.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-white/75 md:mt-8 md:text-[19px]">
              Nine operators between London, Hartford, New York and Berlin.
              Captive-market veterans, blockchain engineers, and risk
              modellers — each with long-tenured institutional provenance.
            </p>
          </BlurIn>
          <div className="mx-auto w-full max-w-[280px] md:max-w-lg">
            <TeamHero />
          </div>
        </div>
      </section>

      <section className="section-ambient relative pb-24 md:pb-[136px]">
        <div
          aria-hidden
          className="orb orb-blue orb-drift pointer-events-none"
          style={{ top: "10%", left: "-120px", width: 480, height: 480, opacity: 0.18 }}
        />
        <div
          aria-hidden
          className="orb orb-green orb-drift-2 pointer-events-none"
          style={{ bottom: "5%", right: "-100px", width: 440, height: 440, opacity: 0.16 }}
        />
        <div className="container-x relative z-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: DURATION_NORMAL, delay: i * 0.04, ease: EASE_OUT_SOFT }}
                className="group relative"
              >
                <div className="glass relative aspect-[4/5] overflow-hidden rounded-[20px]">
                  <img
                    src={m.image}
                    alt={m.name}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    style={{ filter: "grayscale(1) contrast(1.05)" }}
                  />
                  {/* Colorize on hover */}
                  <img
                    src={m.image}
                    alt=""
                    aria-hidden
                    className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 40%, rgba(11, 12, 14, 0.92) 100%)",
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 transition-transform duration-500 group-hover:translate-y-full">
                    <h3 className="text-[16px] font-medium text-[color:var(--text)]" style={{ color: "#F3EFE6" }}>
                      {m.name}
                    </h3>
                    <p className="text-[12.5px]" style={{ color: "rgba(243, 239, 230, 0.6)" }}>
                      {m.title}
                    </p>
                  </div>

                  <div
                    className="absolute inset-0 flex flex-col justify-between p-7 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "linear-gradient(160deg, rgba(11, 12, 14, 0.82) 0%, rgba(45, 74, 124, 0.72) 100%)",
                    }}
                  >
                    <div className="font-display text-[60px] italic leading-none text-[color:#E8B259] opacity-40">
                      "
                    </div>
                    <div>
                      <p className="font-display text-[16px] italic leading-snug md:text-[18px]" style={{ color: "#F3EFE6" }}>
                        {m.quote}
                      </p>
                      <div className="mt-5 border-t border-white/20 pt-4">
                        <h3 className="text-[15px] font-medium" style={{ color: "#F3EFE6" }}>
                          {m.name}
                        </h3>
                        <p className="text-[12px]" style={{ color: "rgba(243, 239, 230, 0.75)" }}>
                          {m.title}
                        </p>
                        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: "#E8B259" }}>
                          {m.focus}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="mx-auto mt-16 max-w-3xl text-center font-mono text-[11px] uppercase tracking-[0.14em] text-subtle">
            London · Hartford · New York · Berlin
          </p>
        </div>
      </section>
    </>
  );
}
