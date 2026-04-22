import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown } from "@/components/icons/brand";

// Globe section at the bottom of the home page — melts into both neighbours.
// Earth image is rendered normally (no mix-blend-mode) so it stays visible.

export default function Globe() {
  return (
    <section className="dark-scope bleed-navy-both relative w-full overflow-hidden pb-16 pt-24 font-light antialiased md:pb-24 md:pt-32">
      {/* Base colour wash — the whole section fades its own edges so no hard
          horizontal seam is ever visible where it meets the neighbours. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #070B14 0%, #0D1220 55%, #111A33 100%)",
          WebkitMaskImage:
            "linear-gradient(180deg, transparent 0%, black 18%, black 82%, transparent 100%)",
          maskImage:
            "linear-gradient(180deg, transparent 0%, black 18%, black 82%, transparent 100%)",
          zIndex: 0,
        }}
      />

      {/* Top fade — body bg at very top, dissolving into the navy scene below */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0"
        style={{
          height: 240,
          background:
            "linear-gradient(180deg, var(--bg) 0%, var(--bg) 6%, rgba(7,11,20,0.3) 55%, transparent 100%)",
          zIndex: 3,
        }}
      />

      {/* Bottom fade — section's darkest stop melts into the body bg below */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{
          height: 280,
          background:
            "linear-gradient(0deg, var(--bg) 0%, var(--bg) 6%, rgba(7,11,20,0.25) 55%, transparent 100%)",
          zIndex: 3,
        }}
      />

      {/* Side cushion fades — narrow gradients on mobile so horizontal edges
          dissolve too. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 md:hidden"
        style={{
          width: 48,
          background: "linear-gradient(90deg, var(--bg) 0%, transparent 100%)",
          zIndex: 3,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 md:hidden"
        style={{
          width: 48,
          background: "linear-gradient(270deg, var(--bg) 0%, transparent 100%)",
          zIndex: 3,
        }}
      />

      {/* Ambient side glows */}
      <div
        aria-hidden
        className="absolute right-0 top-0 h-1/2 w-1/2"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, rgba(82,136,240,0.28) 0%, rgba(7,11,20,0) 60%)",
          zIndex: 1,
        }}
      />
      <div
        aria-hidden
        className="absolute left-0 top-0 h-1/2 w-1/2 -scale-x-100"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, rgba(63,213,130,0.22) 0%, rgba(7,11,20,0) 60%)",
          zIndex: 1,
        }}
      />

      {/* Drifting orbs */}
      <div
        aria-hidden
        className="orb orb-blue orb-drift pointer-events-none"
        style={{ bottom: "-120px", left: "20%", width: 460, height: 460, opacity: 0.30, zIndex: 1 }}
      />
      <div
        aria-hidden
        className="orb orb-green orb-drift-2 pointer-events-none"
        style={{ bottom: "-160px", right: "15%", width: 420, height: 420, opacity: 0.22, zIndex: 1 }}
      />

      <div className="container-x relative z-10 mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span
            className="mb-7 inline-flex items-center gap-2 rounded-full px-3.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-[#8AB4F8]"
            style={{
              background: "rgba(59,114,222,0.08)",
              border: "1px solid rgba(82,136,240,0.35)",
              boxShadow: "inset 0 1px 0 rgba(244,245,248,0.06), 0 0 24px -4px rgba(59,114,222,0.35)",
            }}
          >
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: "#3B72DE", boxShadow: "0 0 10px #3B72DE" }}
            />
            Global risk exchange
          </span>
          <h2
            className="mx-auto mb-6 max-w-4xl font-display text-[44px] font-light leading-[1.02] text-white md:text-[64px] lg:text-[88px]"
            style={{ letterSpacing: "-0.03em", textShadow: "0 4px 48px rgba(3,6,12,0.7)" }}
          >
            $175T of capital.
            <br />
            <span
              style={{
                backgroundImage:
                  "linear-gradient(92deg, #5288F0 0%, #3FD582 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              One rail between them.
            </span>
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-[17px] leading-relaxed text-white/60 md:text-[19px]">
            RYSKEX links captive cedents to institutional capital across every
            major financial hub — London, Hartford, New York, Berlin —
            cleared on one compliance-native rail, settled in 48 hours.
          </p>

          <div className="mb-10 flex flex-col items-center justify-center gap-4 sm:mb-0 sm:flex-row">
            <Link
              to="/contact"
              className="relative w-full overflow-hidden rounded-full border border-white/12 bg-gradient-to-b from-white/10 to-white/5 px-8 py-4 text-[14px] font-medium text-white shadow-lg transition-all duration-300 hover:border-[#3B72DE]/50 hover:shadow-[0_0_24px_rgba(59,114,222,0.45)] sm:w-auto"
            >
              Request a cell
            </Link>
            <Link
              to="/how-it-works"
              className="group flex w-full items-center justify-center gap-2 text-white/70 transition-colors hover:text-white sm:w-auto"
            >
              <span>See how the exchange works</span>
              <ChevronDown size={16} strokeWidth={1.5} className="transition-transform group-hover:translate-y-0.5" />
            </Link>
          </div>
        </motion.div>

        {/* Earth — rendered normally, visible. Radial mask removes the PNG's
            rectangular edges so it dissolves into the dark scene. */}
        <motion.div
          className="relative mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.25 }}
        >
          <div
            className="relative mx-auto flex h-56 w-full items-center justify-center overflow-hidden md:h-80"
            style={{
              WebkitMaskImage:
                "radial-gradient(ellipse 72% 82% at 50% 45%, black 48%, transparent 100%)",
              maskImage:
                "radial-gradient(ellipse 72% 82% at 50% 45%, black 48%, transparent 100%)",
            }}
          >
            <img
              src="https://blocks.mvp-subha.me/assets/earth.png"
              alt="Earth"
              className="h-full w-auto max-w-none opacity-85"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Beneath the globe: simple EXCHANGE label */}
          <div className="relative mt-4 flex items-center justify-center gap-2">
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: "#3B72DE", boxShadow: "0 0 10px #3B72DE" }}
            />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.3em] text-white/70">
              EXCHANGE
            </span>
          </div>

          {/* Coordinate labels */}
          <div className="relative mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-white/40 md:gap-x-16">
            <span>London · 51.51° N</span>
            <span className="text-white/20">·</span>
            <span>Hartford · 41.76° N</span>
            <span className="text-white/20">·</span>
            <span>New York · 40.71° N</span>
            <span className="text-white/20">·</span>
            <span>Berlin · 52.52° N</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
