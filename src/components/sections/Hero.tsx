import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import RotatingText from "@/components/RotatingText";
import { HomeHero } from "@/components/hero-art";
import BlurIn from "@/motion/text/BlurIn";
import TrustStrip from "@/components/hero/TrustStrip";
import { hero } from "@/lib/data";

export default function Hero() {
  return (
    <section
      className="dark-scope relative overflow-hidden"
      style={{ backgroundColor: "#03060C" }}
    >
      {/* Deep gradient base — navy core into near-black */}
      <div
        aria-hidden
        className="absolute inset-0 -z-40"
        style={{
          background:
            "radial-gradient(ellipse 95% 70% at 50% -5%, #132F5E 0%, #0A1830 28%, #070B14 55%, #03060C 100%)",
        }}
      />

      {/* Mesh gradient — slowly shifts hue within brand range */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-30"
        style={{
          backgroundImage: [
            "radial-gradient(60% 40% at 22% 28%, rgba(59,114,222,0.35), transparent 70%)",
            "radial-gradient(55% 45% at 78% 18%, rgba(82,136,240,0.32), transparent 72%)",
            "radial-gradient(65% 50% at 85% 72%, rgba(46,196,110,0.18), transparent 75%)",
            "radial-gradient(50% 40% at 18% 82%, rgba(29,74,154,0.32), transparent 70%)",
            "radial-gradient(40% 30% at 50% 50%, rgba(63,213,130,0.10), transparent 78%)",
          ].join(", "),
          filter: "blur(20px)",
        }}
        animate={{
          opacity: [0.9, 1, 0.85, 1, 0.9],
          backgroundPosition: [
            "0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%",
            "4% -3%, -3% 2%, -2% -2%, 3% 3%, 0% 0%",
            "0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%",
          ],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Aurora band — drifts at the top */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -z-25"
        style={{
          top: "-10%",
          height: "45vh",
          background:
            "radial-gradient(ellipse 70% 100% at 50% 0%, rgba(82,136,240,0.42) 0%, rgba(59,114,222,0.22) 30%, transparent 70%)",
          filter: "blur(60px)",
          mixBlendMode: "screen",
        }}
        animate={{ x: [-40, 40, -40], opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Vertical light beams — subtle, travel behind content */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`beam-${i}`}
          aria-hidden
          className="pointer-events-none absolute -z-25"
          style={{
            top: "-10%",
            left: `${15 + i * 32}%`,
            width: "2px",
            height: "130vh",
            background:
              "linear-gradient(180deg, transparent 0%, rgba(122,167,246,0.18) 35%, rgba(82,136,240,0.28) 55%, transparent 100%)",
            filter: "blur(1.5px)",
            transform: `rotate(${i % 2 === 0 ? 6 : -5}deg)`,
            transformOrigin: "top center",
          }}
          animate={{ opacity: [0.0, 0.85, 0.0] }}
          transition={{
            duration: 7 + i * 2.3,
            delay: i * 2.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Starfield constellation — far depth */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-25 h-full w-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="hero-milky-way" cx="72%" cy="18%" r="55%">
            <stop offset="0%" stopColor="#6B8FD6" stopOpacity="0.22" />
            <stop offset="40%" stopColor="#3B72DE" stopOpacity="0.06" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <rect width="1600" height="900" fill="url(#hero-milky-way)" opacity="0.6" />
        {Array.from({ length: 90 }, (_, i) => {
          const x = (Math.sin(i * 127.1) * 43758.5453) % 1;
          const y = (Math.sin(i * 311.7 + 13.7) * 43758.5453) % 1;
          const r = 0.4 + (Math.abs(Math.sin(i * 91.3)) * 1.2);
          const o = 0.35 + Math.abs(Math.sin(i * 17.1)) * 0.5;
          return (
            <circle
              key={i}
              cx={Math.abs(x) * 1600}
              cy={Math.abs(y) * 900}
              r={r}
              fill="#CBD5F5"
              opacity={o}
            />
          );
        })}
      </svg>

      {/* Photo — heavy blur, texture only */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          backgroundImage: "url(/hero/06-wind-tunnel.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.22,
          filter: "blur(50px) saturate(1.25)",
          transform: "scale(1.2)",
          mixBlendMode: "screen",
        }}
      />

      {/* Drifting color blobs — brand hues */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -z-20"
        style={{
          top: "-15%",
          left: "-10%",
          width: "70vw",
          height: "70vw",
          borderRadius: "999px",
          background: "rgba(59, 114, 222, 0.32)",
          filter: "blur(150px)",
        }}
        animate={{ x: [0, 80, 0], y: [0, 40, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -z-20"
        style={{
          bottom: "-25%",
          right: "-12%",
          width: "65vw",
          height: "65vw",
          borderRadius: "999px",
          background: "rgba(46, 196, 110, 0.20)",
          filter: "blur(150px)",
        }}
        animate={{ x: [0, -60, 0], y: [0, -30, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -z-20"
        style={{
          top: "28%",
          left: "32%",
          width: "58vw",
          height: "58vw",
          borderRadius: "999px",
          background: "rgba(29, 74, 154, 0.26)",
          filter: "blur(170px)",
        }}
        animate={{ x: [0, 40, -40, 0], y: [0, 30, -20, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Smooth radial edge fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 130% 95% at 50% 50%, transparent 35%, rgba(3,6,12,0.55) 82%, rgba(3,6,12,0.92) 100%)",
        }}
      />

      {/* Content */}
      <div className="container-x relative z-10 grid items-center gap-10 pt-24 pb-16 md:grid-cols-[6fr_5fr] md:gap-14 md:pt-32 md:pb-24 lg:pt-36 lg:pb-28">
        {/* Left */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.2, 0.6, 0.2, 1] }}
            className="chip mb-10 inline-flex"
            style={{
              background:
                "linear-gradient(135deg, rgba(59,114,222,0.18) 0%, rgba(59,114,222,0.06) 100%)",
              border: "1px solid rgba(122,167,246,0.32)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 24px -12px rgba(59,114,222,0.45)",
              backdropFilter: "blur(14px)",
            }}
          >
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{
                background: "#2EC46E",
                boxShadow: "0 0 12px #2EC46E, 0 0 2px #3FD582",
              }}
            />
            {hero.eyebrow}
          </motion.div>

          <BlurIn delay={0.2}>
            <h1
              className="font-display"
              style={{
                color: "#F6F7FB",
                fontSize: "clamp(38px, 4.6vw, 62px)",
                lineHeight: 0.98,
                letterSpacing: "-0.03em",
                fontWeight: 400,
                textShadow:
                  "0 0 60px rgba(122,167,246,0.18), 0 2px 40px rgba(3,6,12,0.9), 0 1px 0 rgba(3,6,12,0.5)",
              }}
            >
              {hero.headline}
            </h1>
          </BlurIn>
          <BlurIn delay={0.35}>
            <h2
              className="font-display mt-2"
              style={{
                backgroundImage:
                  "linear-gradient(96deg, #7AA7F6 0%, #9BC0FB 28%, #5288F0 58%, #3FD582 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                fontSize: "clamp(38px, 4.6vw, 62px)",
                lineHeight: 0.98,
                letterSpacing: "-0.03em",
                fontWeight: 400,
                filter: "drop-shadow(0 0 40px rgba(82,136,240,0.28))",
              }}
            >
              {hero.headlineLine2}
            </h2>
          </BlurIn>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55, ease: [0.2, 0.6, 0.2, 1] }}
            className="mt-7 max-w-xl text-[15.5px] leading-relaxed md:text-[17px]"
            style={{ color: "rgba(244, 245, 248, 0.80)" }}
          >
            An exchange for{" "}
            <span className="inline-block align-baseline" style={{ minWidth: "14ch" }}>
              <RotatingText words={hero.rotatingCounterparties} />
            </span>
            . Triggers price on the VUCAWRI index. Settlement clears on the Redbelly rail.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7, ease: [0.2, 0.6, 0.2, 1] }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link
              to="/contact"
              className="group relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-full px-5 text-[14px] font-semibold text-white transition-all hover:-translate-y-0.5"
              style={{
                background:
                  "linear-gradient(135deg, #3B72DE 0%, #2EC46E 100%)",
                boxShadow:
                  "0 14px 32px -10px rgba(59,114,222,0.55), 0 2px 0 rgba(255,255,255,0.06) inset, inset 0 1px 0 rgba(255,255,255,0.25)",
              }}
            >
              {/* Inner bevel highlight */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 45%)",
                }}
              />
              <span className="relative z-10">{hero.primaryCta}</span>
              <ArrowRight size={15} strokeWidth={2} className="relative z-10" />
            </Link>
            <Link
              to="/how-it-works"
              className="group relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-full px-5 text-[14px] font-medium text-white/90 transition-all hover:bg-white/5"
              style={{
                background:
                  "linear-gradient(180deg, rgba(244,245,248,0.06) 0%, rgba(244,245,248,0.02) 100%)",
                border: "1px solid rgba(244, 245, 248, 0.16)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.08), 0 6px 20px -10px rgba(0,0,0,0.4)",
                backdropFilter: "blur(14px)",
              }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 50%)",
                }}
              />
              <span className="relative z-10">{hero.secondaryCta}</span>
              <ArrowUpRight size={14} strokeWidth={2} className="relative z-10" />
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mt-10 max-w-lg font-mono text-[11px] uppercase leading-relaxed"
            style={{ color: "rgba(244, 245, 248, 0.52)", letterSpacing: "0.15em" }}
          >
            {hero.provenance}
          </motion.p>
        </div>

        {/* Right — globe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.2, 0.6, 0.2, 1] }}
          className="mx-auto w-full max-w-[560px]"
        >
          <HomeHero />
        </motion.div>
      </div>

      {/* Long smooth bleed — hero backdrop fades into trust-strip base */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 z-[1]"
        style={{
          bottom: 0,
          height: "180px",
          background:
            "linear-gradient(180deg, transparent 0%, rgba(7,11,20,0.55) 55%, #070B14 100%)",
        }}
      />

      <div className="relative z-10">
        <TrustStrip />
      </div>
    </section>
  );
}
