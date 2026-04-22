import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { offices } from "@/lib/data";
import BlurIn from "@/motion/text/BlurIn";
import { HartfordLandmark, LondonLandmark } from "@/components/city-art";

const LANDMARKS: Record<string, React.ComponentType<{ className?: string }>> = {
  London: LondonLandmark,
  Hartford: HartfordLandmark,
};

export default function Locations() {
  return (
    <section className="section-ambient relative py-24 md:py-[136px]">
      <div
        aria-hidden
        className="orb orb-deep orb-drift pointer-events-none"
        style={{ top: "15%", left: "-140px", width: 520, height: 520, opacity: 0.25 }}
      />
      <div
        aria-hidden
        className="orb orb-green orb-drift-2 pointer-events-none"
        style={{ bottom: "5%", right: "-100px", width: 420, height: 420, opacity: 0.18 }}
      />

      <div className="container-x relative z-10">
        <BlurIn className="mb-16 max-w-3xl">
          <div className="eyebrow mb-5">THE DESK</div>
          <h2 className="display-md text-text">
            Two offices. <span className="text-gradient">One exchange.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/75 md:text-[17px]">
            Institutional inquiries route through the office closest to you.
            Replies within two business days from a named operator.
          </p>
        </BlurIn>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {offices.map((o, i) => {
            const Landmark = LANDMARKS[o.city];
            return (
            <motion.div
              key={o.city}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="glass-deep relative overflow-hidden rounded-[22px] p-8 md:p-12"
            >
              {/* City landmark — premium custom SVG */}
              {Landmark && (
                <div
                  className="relative -mx-8 -mt-8 mb-8 h-[120px] overflow-hidden md:-mx-12 md:-mt-12 md:mb-10 md:h-[160px]"
                  style={{
                    background:
                      i === 0
                        ? "linear-gradient(180deg, rgba(59,114,222,0.14) 0%, rgba(7,11,20,0) 100%)"
                        : "linear-gradient(180deg, rgba(46,196,110,0.14) 0%, rgba(7,11,20,0) 100%)",
                    borderBottom: "1px solid var(--border-strong)",
                  }}
                >
                  <Landmark className="h-full w-full" />
                </div>
              )}

              {/* lit-map accent — soft grid, radial map fade */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.12]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                  maskImage: "radial-gradient(ellipse 55% 50% at 80% 80%, black, transparent 85%)",
                  WebkitMaskImage: "radial-gradient(ellipse 55% 50% at 80% 80%, black, transparent 85%)",
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full"
                style={{ background: "var(--gradient-glow-orb-green)", filter: "blur(60px)", opacity: 0.7 }}
              />
              {/* city-pin beacon */}
              <div
                aria-hidden
                className="pointer-events-none absolute bottom-16 right-16 h-2 w-2 rounded-full"
                style={{
                  background: i === 0 ? "var(--accent)" : "var(--accent-2)",
                  boxShadow: `0 0 20px ${i === 0 ? "rgba(59,114,222,0.9)" : "rgba(46,196,110,0.9)"}`,
                }}
              />

              <div className="relative flex items-start justify-between">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                    {o.country}
                  </div>
                  <h3
                    className="mt-3 font-display text-[44px] leading-none text-text md:text-[60px] lit-text"
                    style={{ letterSpacing: "-0.025em" }}
                  >
                    {o.city}
                  </h3>
                </div>
                <MapPin size={18} strokeWidth={1.5} className="text-accent" />
              </div>

              <div className="relative mt-10 space-y-4 text-[14px]">
                <div className="flex items-start gap-3 text-white/70">
                  <span className="mt-1.5 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                  <span className="text-text">{o.address}</span>
                </div>
                <div className="pl-4 text-[13px] italic leading-relaxed text-white/70">
                  {o.role}
                </div>
              </div>

              <div
                className="relative mt-8 flex items-center justify-between pt-5 font-mono text-[11px] text-white/70"
                style={{
                  borderTop: "1px solid transparent",
                  borderImage:
                    "linear-gradient(90deg, transparent, var(--border-strong), transparent) 1",
                }}
              >
                <span className="uppercase tracking-[0.14em]">{o.tz}</span>
                <a
                  href={`tel:${o.phone.replace(/\s/g, "")}`}
                  className="tabular transition-colors hover:text-accent"
                >
                  {o.phone}
                </a>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
