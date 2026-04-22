import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { EASE_OUT_SOFT } from "@/motion/constants";
import Meta from "@/components/Meta";

/**
 * NotFound — 404 page.
 *
 * Matches the site's visual language:
 * - mesh-hero + grid-overlay backdrop for ambient brand presence
 * - Instrument Serif display "404" in the cobalt→green hairline gradient
 * - Geist body + eyebrow chip + two CTAs (primary Return home / ghost Contact)
 * - Single cobalt hairline separator under the display, echoing section rhythm
 */
export default function NotFound() {
  return (
    <>
      <Meta routeKey="*" />
      <section className="mesh-hero grid-overlay relative flex min-h-[88vh] items-center justify-center overflow-hidden pt-32 pb-24">
      {/* Soft cobalt orb behind the display — echoes hero composition */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 opacity-80"
        style={{ background: "var(--gradient-glow-orb-blue)", filter: "blur(40px)" }}
      />

      <div className="container-x text-center">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT_SOFT }}
          className="chip mb-8 inline-flex"
        >
          404 · Off-ledger
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT_SOFT, delay: 0.05 }}
          className="display-xl mx-auto max-w-[14ch] text-text"
          style={{ fontSize: "clamp(96px, 14vw, 200px)", lineHeight: 0.9 }}
        >
          <span className="text-gradient">404</span>
        </motion.h1>

        {/* Cobalt hairline separator */}
        <div
          aria-hidden
          className="mx-auto mt-6 h-px w-24"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, var(--accent) 50%, transparent 100%)",
          }}
        />

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT_SOFT, delay: 0.15 }}
          className="display-md mx-auto mt-8 max-w-[20ch] text-text"
        >
          Page <span className="text-gradient">not routed.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE_OUT_SOFT, delay: 0.22 }}
          className="shadow-text-soft mx-auto mt-5 max-w-xl text-[16px] text-muted"
        >
          The link you followed does not resolve on the current exchange.
          Return to the homepage or reach the operator directly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE_OUT_SOFT, delay: 0.3 }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          <Link to="/" className="btn-primary">
            Return home
          </Link>
          <Link to="/contact" className="btn-ghost">
            Contact us
          </Link>
        </motion.div>
      </div>
    </section>
    </>
  );
}
