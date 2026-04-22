import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "@/components/icons/brand";
import StatStrip from "@/components/sections/StatStrip";
import ValuesGrid from "@/components/sections/ValuesGrid";
import FounderQuote from "@/components/sections/FounderQuote";
import ClosingCTA from "@/components/sections/ClosingCTA";
import { missionContent } from "@/lib/data";
import { AboutHero } from "@/components/hero-art";
import BlurIn from "@/motion/text/BlurIn";
import { DURATION_NORMAL, EASE_OUT_SOFT } from "@/motion/constants";

export default function About() {
  const [i, setI] = useState(0);
  const current = missionContent[i];
  const next = () => setI((x) => (x + 1) % missionContent.length);
  const prev = () => setI((x) => (x - 1 + missionContent.length) % missionContent.length);

  return (
    <>
      <section className="mesh-hero dark-scope relative overflow-hidden pt-24 pb-16 md:pt-44 md:pb-24">
        <div className="aurora" aria-hidden />
        <div className="noise" aria-hidden />
        <div
          aria-hidden
          className="orb orb-blue orb-drift pointer-events-none"
          style={{ top: "10%", left: "-120px", width: 520, height: 520, opacity: 0.35 }}
        />
        <div
          aria-hidden
          className="orb orb-green orb-drift-2 pointer-events-none"
          style={{ bottom: "5%", right: "-100px", width: 460, height: 460, opacity: 0.22 }}
        />
        <div className="container-x relative z-10 grid items-center gap-10 md:grid-cols-[1.3fr_1fr] md:gap-16">
          <BlurIn>
            <div className="chip mb-8 inline-flex">THE MISSION</div>
            <h1
              className="display-lg max-w-[20ch] text-text"
              style={{ fontSize: "clamp(34px, 7vw, 84px)" }}
            >
              A risk exchange, <span className="text-gradient">not a broker.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-white/75 md:mt-8 md:text-[19px]">
              Parametric contracts should trade like commodities, with prices that
              reflect conditions in real time. RYSKEX is building the Digital Risk
              Exchange so cedents, syndicates and ILS funds transact on one order
              book, cleared in 48 hours.
            </p>
          </BlurIn>
          <div className="mx-auto w-full max-w-[280px] md:max-w-md">
            <AboutHero />
          </div>
        </div>
      </section>

      {/* Mission / Vision / Technology carousel */}
      <section className="section-ambient relative py-20 md:py-[136px]">
        <div
          aria-hidden
          className="orb orb-blue orb-drift pointer-events-none"
          style={{ top: "10%", left: "-100px", width: 480, height: 480, opacity: 0.22 }}
        />
        <div
          aria-hidden
          className="orb orb-green orb-drift-2 pointer-events-none"
          style={{ bottom: "5%", right: "-80px", width: 420, height: 420, opacity: 0.18 }}
        />
        <div className="container-x relative z-10">
          <div className="glass-deep relative mx-auto overflow-hidden rounded-[28px] p-6 md:p-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: DURATION_NORMAL, ease: EASE_OUT_SOFT }}
                className="grid items-center gap-12 md:grid-cols-2 md:gap-16"
              >
                <div>
                  <div className="eyebrow mb-6">{current.kicker}</div>
                  <h2
                    className="font-display text-[30px] leading-[1.08] text-text md:text-[52px]"
                    style={{ letterSpacing: "-0.022em" }}
                  >
                    {current.heading}
                  </h2>
                  <p className="mt-6 text-[15px] leading-relaxed text-muted md:mt-8 md:text-[18px]">
                    {current.body}
                  </p>
                </div>
                <div className="relative aspect-square overflow-hidden rounded-2xl">
                  <img
                    src={current.image}
                    alt={current.kicker}
                    loading="lazy"
                    decoding="async"
                    width={720}
                    height={720}
                    className="h-full w-full object-cover"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(45, 74, 124, 0.2) 0%, rgba(232, 178, 89, 0.25) 100%)",
                      mixBlendMode: "overlay",
                    }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex items-center justify-center gap-4">
              <button
                onClick={prev}
                aria-label="Previous"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:text-accent"
              >
                <ChevronLeft size={16} strokeWidth={2} />
              </button>
              <div className="flex gap-2">
                {missionContent.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setI(idx)}
                    aria-label={`Slide ${idx + 1}`}
                    className="h-1.5 rounded-full transition-all"
                    style={{
                      width: i === idx ? 36 : 6,
                      background: i === idx ? "var(--accent)" : "var(--border)",
                    }}
                  />
                ))}
              </div>
              <button
                onClick={next}
                aria-label="Next"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:text-accent"
              >
                <ChevronRight size={16} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <StatStrip />
      <ValuesGrid />
      <FounderQuote />
      <ClosingCTA />
    </>
  );
}
