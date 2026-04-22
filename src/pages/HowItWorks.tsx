import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ClosingCTA from "@/components/sections/ClosingCTA";
import { steps } from "@/lib/data";
import { HowItWorksHero } from "@/components/hero-art";
import BlurIn from "@/motion/text/BlurIn";

const TERMS = [
  ["Cedent", "Party transferring risk. Usually a captive or corporate risk treasury."],
  ["Sponsored cell", "Ring-fenced compartment inside our Vermont captive. Think container, not company."],
  ["Trigger", "Machine-readable condition that releases collateral. Index-based, event-based, or parametric-index-based."],
  ["Oracle set", "Feeds that confirm the trigger event. Always plural, always disclosed."],
  ["Collateral", "Capital held against the contract. Pre-funded, not post-loss."],
  ["Settlement", "On-chain transfer of collateral to the cedent once the trigger fires."],
  ["144A", "US private-placement rule that lets tokenised cells reach qualified institutional buyers."],
];

const NOT = [
  "This is not indemnity cover. We do not adjust claims after the fact.",
  "This is not a carrier. We do not write policies in our own name.",
  "This is not a broker. We do not intermediate a placement and step away.",
  "This is not a DeFi protocol. Cedents sit in Vermont law, not smart-contract law.",
];

export default function HowItWorks() {
  return (
    <>
      <section className="mesh-hero dark-scope relative overflow-hidden pt-24 pb-16 md:pt-44 md:pb-24">
        <div className="aurora" aria-hidden />
        <div className="noise" aria-hidden />
        <div
          aria-hidden
          className="orb orb-blue orb-drift pointer-events-none"
          style={{ top: "10%", left: "-80px", width: 520, height: 520, opacity: 0.32 }}
        />
        <div
          aria-hidden
          className="orb orb-green orb-drift-2 pointer-events-none"
          style={{ bottom: "15%", right: "-80px", width: 440, height: 440, opacity: 0.22 }}
        />
        <div className="container-x relative z-10 text-center">
          <BlurIn>
            <div className="chip mb-8 inline-flex">HOW IT WORKS</div>
            <h1
              className="display-lg mx-auto max-w-4xl text-text"
              style={{ fontSize: "clamp(34px, 7vw, 84px)" }}
            >
              From peril to <span className="text-gradient">settled capital</span>
              <span className="hidden md:inline"><br /></span>{" "}
              in four steps.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-white/75 md:mt-8 md:text-[19px]">
              Most risk transfer dies in paperwork. Ours doesn't. A parametric
              contract on RYSKEX moves from peril definition to settled capital
              through four deterministic steps — each one machine-readable,
              on-chain, and auditable by both sides of the trade.
            </p>
          </BlurIn>
          <div className="mx-auto mt-10 w-full max-w-[280px] md:mt-14 md:max-w-4xl">
            <HowItWorksHero />
          </div>
        </div>
      </section>

      {/* The 4 steps, large editorial blocks */}
      <section className="section-ambient relative py-20 md:py-[136px]">
        <div
          aria-hidden
          className="orb orb-blue orb-drift pointer-events-none"
          style={{ top: "15%", left: "10%", width: 480, height: 480, opacity: 0.20 }}
        />
        <div
          aria-hidden
          className="orb orb-green orb-drift-2 pointer-events-none"
          style={{ bottom: "10%", right: "5%", width: 440, height: 440, opacity: 0.16 }}
        />
        <div className="container-x relative z-10">
          <div className="relative mx-auto max-w-5xl">
            <div
              aria-hidden
              className="absolute left-8 top-0 hidden h-full w-px md:block"
              style={{
                background: "linear-gradient(to bottom, var(--accent), transparent)",
              }}
            />

            <div className="space-y-20 md:space-y-[100px]">
              {steps.map((s, i) => (
                <motion.article
                  key={s.n}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6 }}
                  className="relative md:pl-24"
                >
                  <div
                    aria-hidden
                    className="absolute left-[22px] top-2 hidden h-3 w-3 rounded-full md:block"
                    style={{
                      background: "var(--accent)",
                      boxShadow: "0 0 0 6px rgba(59,114,222,0.18), 0 0 18px rgba(59,114,222,0.6)",
                    }}
                  />
                  <div className="eyebrow mb-5">STEP {s.n}</div>
                  <h2
                    className="font-display text-[28px] leading-[1.08] text-text md:text-[52px] lit-text"
                    style={{ letterSpacing: "-0.022em" }}
                  >
                    {s.title}
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

      {/* Terminology + "what this is not" two-up */}
      <section className="section-ambient relative py-24 md:py-[136px]">
        <div
          aria-hidden
          className="orb orb-blue orb-drift pointer-events-none"
          style={{ top: "10%", left: "-80px", width: 460, height: 460, opacity: 0.20 }}
        />
        <div
          aria-hidden
          className="orb orb-green orb-drift-2 pointer-events-none"
          style={{ bottom: "10%", right: "-80px", width: 440, height: 440, opacity: 0.18 }}
        />
        <div className="container-x relative z-10 grid gap-10 md:grid-cols-2 md:gap-16">
          <div className="glass-deep relative overflow-hidden rounded-[22px] p-7 md:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-16 -right-16 h-52 w-52 rounded-full"
              style={{ background: "var(--gradient-glow-orb-blue)", filter: "blur(48px)", opacity: 0.6 }}
            />
            <div className="eyebrow mb-6">INLINE TERMINOLOGY</div>
            <dl className="divide-y divide-white/5">
              {TERMS.map(([k, v]) => (
                <div
                  key={k}
                  className="grid grid-cols-1 items-baseline gap-1.5 py-4 sm:grid-cols-[120px_1fr] sm:gap-6"
                >
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                    {k}
                  </dt>
                  <dd className="text-[14px] leading-relaxed text-white/75">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="glass-deep relative overflow-hidden rounded-[22px] p-7 md:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full"
              style={{ background: "var(--gradient-glow-orb-green)", filter: "blur(56px)", opacity: 0.6 }}
            />
            <div className="eyebrow mb-6">WHAT THIS IS NOT</div>
            <ul className="space-y-4">
              {NOT.map((n, i) => (
                <li key={i} className="flex items-start gap-4 text-[15px] leading-relaxed text-text">
                  <span className="mt-2 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                  <span>{n}</span>
                </li>
              ))}
            </ul>
            <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.14em] text-subtle">
              Four steps. Four deterministic outputs. One exchange of record.
            </p>
            <Link
              to="/contact"
              className="link-accent mt-6 inline-flex text-[14px] text-text"
            >
              Open an institutional inquiry
              <ArrowRight size={13} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
