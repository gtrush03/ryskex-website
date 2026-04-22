// Animated mesh gradient — four radial blobs drifting on independent easings.
// Pure CSS surfaces driven by Framer Motion, with a noise overlay for texture.

import { motion } from "framer-motion";

type Props = {
  intensity?: number;
  className?: string;
};

const NOISE_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'>
       <filter id='n'>
         <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/>
         <feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0'/>
       </filter>
       <rect width='100%' height='100%' filter='url(#n)' opacity='0.5'/>
     </svg>`,
  );

type Blob = {
  color: string;
  initial: { x: string; y: string };
  animate: { x: string[]; y: string[] };
  duration: number;
};

const BLOBS: Blob[] = [
  {
    color: "rgba(59, 114, 222, 0.85)", // cobalt TL
    initial: { x: "-10%", y: "-10%" },
    animate: { x: ["-10%", "10%", "-5%", "-10%"], y: ["-10%", "5%", "-15%", "-10%"] },
    duration: 28,
  },
  {
    color: "rgba(46, 196, 110, 0.70)", // green TR
    initial: { x: "60%", y: "-15%" },
    animate: { x: ["60%", "45%", "65%", "60%"], y: ["-15%", "5%", "-5%", "-15%"] },
    duration: 34,
  },
  {
    color: "rgba(29, 74, 154, 0.80)", // deep navy mid
    initial: { x: "20%", y: "30%" },
    animate: { x: ["20%", "35%", "10%", "20%"], y: ["30%", "15%", "40%", "30%"] },
    duration: 40,
  },
  {
    color: "rgba(7, 11, 20, 0.95)", // bg-tinted deep bottom
    initial: { x: "10%", y: "55%" },
    animate: { x: ["10%", "25%", "5%", "10%"], y: ["55%", "65%", "50%", "55%"] },
    duration: 24,
  },
];

export default function FlowMesh({ intensity = 0.7, className = "" }: Props) {
  const clamped = Math.max(0, Math.min(1, intensity));
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ background: "var(--bg)" }}
    >
      <div
        className="absolute inset-0"
        style={{ opacity: clamped, filter: "blur(100px) saturate(1.1)" }}
      >
        {BLOBS.map((b, i) => (
          <motion.div
            key={i}
            initial={b.initial}
            animate={b.animate}
            transition={{
              duration: b.duration,
              ease: [0.45, 0, 0.55, 1],
              repeat: Infinity,
              repeatType: "loop",
            }}
            style={{
              position: "absolute",
              width: "80vw",
              height: "80vh",
              borderRadius: "50%",
              background: `radial-gradient(circle at 50% 50%, ${b.color} 0%, transparent 65%)`,
              willChange: "transform",
            }}
          />
        ))}
      </div>

      {/* Noise overlay at 1% via alpha, blended for silk texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("${NOISE_SVG}")`,
          backgroundSize: "240px 240px",
          opacity: 0.08,
          mixBlendMode: "overlay",
        }}
      />

      {/* Soft edge vignette so the mesh feels contained */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 50% 50%, transparent 55%, rgba(7,11,20,0.75) 100%)",
        }}
      />
    </div>
  );
}
