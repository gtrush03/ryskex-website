import { motion } from "framer-motion";
import FeaturesGrid from "@/components/sections/FeaturesGrid";
import FourRails from "@/components/sections/FourRails";
import ClosingCTA from "@/components/sections/ClosingCTA";
import { PlatformHero } from "@/components/hero-art";
import BlurIn from "@/motion/text/BlurIn";
import { EASE_OUT_SOFT } from "@/motion/constants";
import Meta from "@/components/Meta";

const subSections = [
  {
    label: "THE EXCHANGE · DREX",
    h: "A trading venue, not a marketplace.",
    body:
      "Parametric contracts are listed, priced against the VUCAWRI index, and held open until the cell is fully subscribed. Prices adjust as conditions change. Collateral is locked on commitment, not on settlement.",
  },
  {
    label: "THE INDEX · VUCAWRI",
    h: "Prices what actuarial tables were never built to see.",
    body:
      "The VUCA World Risk Index scores volatility, uncertainty, complexity and ambiguity across a peril. It ingests non-traditional data — news velocity, supply-chain signals, political event logs, climate feeds — and produces a machine-readable score that either is the trigger or informs it. Every feed is disclosed. Every score is reproducible.",
  },
  {
    label: "THE CELL · ARX VERITAS",
    h: "Ring-fenced, Vermont-domiciled, ready on commit.",
    body:
      "Every contract sits inside a ring-fenced cell, sponsored by RYSKEX and domiciled in Vermont. Cedents do not stand up a captive from scratch — they plug into a cell, with governance and collateral rails already in place. The first cell, Arx Veritas Parametrics, went live April 2025 with ten million tokenised ERUs as collateral.",
  },
  {
    label: "THE RAIL · REDBELLY",
    h: "Compliance-native settlement L1.",
    body:
      "Redbelly is a compliance-native chain — real-world asset tokenisation, institutional-grade KYC, and transaction finality designed for regulated counterparties. Smart contracts on Redbelly release collateral the moment the oracle set confirms the trigger.",
  },
  {
    label: "THE AUDIT TRAIL",
    h: "Both sides see the same ledger.",
    body:
      "Every trigger definition, every oracle feed, every cell movement is timestamped on-chain and independently reconstructable. Both sides of a trade see the same ledger. Both sides read the same history. No side owns the truth.",
  },
];

export default function Platform() {
  return (
    <>
      <Meta routeKey="/platform" />
      <section className="mesh-hero dark-scope relative overflow-hidden pt-24 pb-16 md:pt-44 md:pb-24">
        <div className="aurora" aria-hidden />
        <div className="noise" aria-hidden />
        <div
          aria-hidden
          className="orb orb-deep orb-drift pointer-events-none"
          style={{ top: "15%", left: "-140px", width: 560, height: 560, opacity: 0.35 }}
        />
        <div
          aria-hidden
          className="orb orb-green orb-drift-2 pointer-events-none"
          style={{ bottom: "-40px", right: "-80px", width: 440, height: 440, opacity: 0.22 }}
        />
        <div className="container-x relative z-10 grid items-center gap-10 md:grid-cols-[1.3fr_1fr] md:gap-16">
          <BlurIn>
            <div className="chip mb-8 inline-flex">THE PLATFORM</div>
            <h1
              className="display-lg max-w-[22ch] text-text"
              style={{ fontSize: "clamp(34px, 7vw, 84px)" }}
            >
              Veritas ex Machina —<span className="hidden md:inline"><br /></span>{" "}
              <span className="text-gradient">the production environment</span>
              <span className="hidden md:inline"><br /></span>{" "}
              for every cell on the exchange.
            </h1>
            <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-white/75 md:mt-8 md:text-[19px]">
              Hosts the trigger definition, the collateral account, the oracle
              set, the distribution rail, and the audit trail — one
              environment, one record, both sides of every trade.
            </p>
          </BlurIn>
          <div className="relative mx-auto w-full max-w-[280px] md:max-w-[580px]">
            <PlatformHero />
          </div>
        </div>
      </section>

      {/* Sub-sections as editorial long-form */}
      <section className="section-ambient relative py-20 md:py-[136px]">
        <div
          aria-hidden
          className="orb orb-blue orb-drift pointer-events-none"
          style={{ top: "10%", left: "30%", width: 520, height: 520, opacity: 0.18 }}
        />
        <div
          aria-hidden
          className="orb orb-green orb-drift-2 pointer-events-none"
          style={{ bottom: "10%", right: "-100px", width: 440, height: 440, opacity: 0.16 }}
        />
        <div className="container-x relative z-10">
          <div className="relative grid gap-16 md:grid-cols-[1fr_2fr] md:gap-20">
            <div
              className="sticky top-28 hidden h-fit self-start md:block"
              aria-hidden
            >
              <div className="eyebrow mb-4">CONTENTS</div>
              <ul className="space-y-3 text-[13px] text-muted">
                {subSections.map((s, i) => (
                  <li key={i} className="font-mono uppercase tracking-[0.12em]">
                    0{i + 1} · {s.label.split("·")[1]?.trim() || s.label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-20 md:space-y-[100px]">
              {subSections.map((s, i) => (
                <motion.article
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: EASE_OUT_SOFT }}
                >
                  <div className="eyebrow mb-5">
                    <span className="text-subtle">0{i + 1}</span>
                    <span className="mx-2 text-border-strong">·</span>
                    {s.label}
                  </div>
                  <h2
                    className="font-display text-[28px] leading-[1.08] text-text md:text-[52px] lit-text"
                    style={{ letterSpacing: "-0.022em" }}
                  >
                    {s.h}
                  </h2>
                  <p className="mt-5 max-w-[60ch] text-[15px] leading-relaxed text-white/75 md:mt-6 md:text-[18px]">
                    {s.body}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FeaturesGrid />
      <FourRails />
      <ClosingCTA />
    </>
  );
}
