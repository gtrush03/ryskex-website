import { motion } from "framer-motion";
import { founderPullQuote, team } from "@/lib/data";
import { DURATION_SLOW, EASE_OUT_SOFT } from "@/motion/constants";

// Minimal, flush-aligned founder card. Rectangular portrait (not a circle),
// editorial type, thin rail accents. In dark mode — smoked glass with cobalt+green
// hairline. In light mode — brushed silver / platinum surface with subtle
// diagonal tooling, polished bevel, and a cool highlight.

export default function FounderQuote() {
  const marcus = team[0];
  return (
    <section className="section-ambient relative py-24 md:py-[136px]">
      <div
        aria-hidden
        className="orb orb-blue orb-drift pointer-events-none"
        style={{ top: "10%", left: "6%", width: 420, height: 420, opacity: 0.15 }}
      />
      <div
        aria-hidden
        className="orb orb-green orb-drift-2 pointer-events-none"
        style={{ bottom: "8%", right: "6%", width: 380, height: 380, opacity: 0.12 }}
      />

      <div className="container-x relative z-10">
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: DURATION_SLOW, ease: EASE_OUT_SOFT }}
          className="founder-card relative mx-auto max-w-5xl overflow-hidden rounded-[20px]"
        >
          {/* Left gradient rail — present in both modes, different hue per theme */}
          <div aria-hidden className="founder-card__rail" />

          {/* Diagonal brushing overlay — only visible in light (silver metal feel) */}
          <div aria-hidden className="founder-card__brushing" />

          <div className="relative grid gap-0 md:grid-cols-[280px_1fr]">
            {/* Portrait — flush left, full-height rectangle, minimal treatment */}
            <div className="relative aspect-[4/5] w-full overflow-hidden md:aspect-auto">
              <img
                src={marcus.image}
                alt={marcus.name}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
                style={{ filter: "contrast(1.04) saturate(1.02)" }}
              />
              {/* subtle vignette to bed the photo into the card */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, transparent 0%, transparent 60%, rgba(7,11,20,0.18) 100%)",
                }}
              />
              {/* seam from portrait into copy column */}
              <div aria-hidden className="founder-card__seam" />
            </div>

            {/* Text column */}
            <div className="p-8 md:p-14">
              <div className="mb-6 flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
                <span>Founder</span>
                <span aria-hidden className="founder-card__eyebrow-rule" />
                <span className="founder-card__eyebrow-accent">Provenance</span>
              </div>

              <blockquote
                className="font-display text-[22px] leading-[1.22] text-text md:text-[30px]"
                style={{ letterSpacing: "-0.015em" }}
              >
                {founderPullQuote.quote}
              </blockquote>

              <div className="mt-10 flex items-center gap-4">
                <span aria-hidden className="founder-card__attr-rule" />
                <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted">
                  {founderPullQuote.attribution}
                </p>
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
