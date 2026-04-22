import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { closingCta } from "@/lib/data";

export default function ClosingCTA() {
  return (
    <section className="section-ambient relative py-24 md:py-[136px]">
      {/* ambient drifting orbs — bigger & more luminous */}
      <div
        aria-hidden
        className="orb orb-blue orb-drift pointer-events-none"
        style={{ top: "10%", left: "10%", width: 560, height: 560, opacity: 0.32 }}
      />
      <div
        aria-hidden
        className="orb orb-green orb-drift-2 pointer-events-none"
        style={{ bottom: "5%", right: "10%", width: 520, height: 520, opacity: 0.26 }}
      />

      <div className="container-x relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="glass-deep relative mx-auto max-w-5xl overflow-hidden rounded-[32px] p-12 text-center md:p-24"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(70% 80% at 50% 100%, var(--gradient-glow-orb-blue) 0%, transparent 65%), radial-gradient(50% 60% at 15% 10%, var(--gradient-glow-orb-green) 0%, transparent 65%)",
              opacity: 0.85,
              zIndex: 0,
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              boxShadow: "inset 0 1px 0 rgba(244,245,248,0.10), inset 0 -1px 0 rgba(0,0,0,0.40)",
              zIndex: 1,
            }}
          />

          <div className="relative z-10">
            <div className="chip mb-8 inline-flex">{closingCta.eyebrow}</div>
            <h2 className="display-md mx-auto max-w-[18ch] text-text">
              {closingCta.title}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/75 md:text-[17px]">
              {closingCta.sub}
            </p>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              <Link to="/contact" className="btn-primary">
                {closingCta.primary}
                <ArrowRight size={15} strokeWidth={2} />
              </Link>
              <Link to="/contact" className="btn-ghost">
                {closingCta.secondary}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
