import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

// GlowCard — cursor-tracking spotlight card with a glow border.
// Adapted from the 21st.dev / Aceternity-style spotlight pattern.
// Uses CSS custom props --x/--xp/--y/--yp set from pointermove for smooth tracking.
// Pointer reads are coalesced via requestAnimationFrame so we never write style
// more than once per frame — keeps hover tracking crisp under load.

interface GlowCardProps {
  children?: ReactNode;
  className?: string;
  glowColor?: "blue" | "green" | "gradient";
  size?: "sm" | "md" | "lg";
  width?: string | number;
  height?: string | number;
  customSize?: boolean;
}

const glowColorMap = {
  blue: { base: 215, spread: 80 },     // cobalt hue from the logo
  green: { base: 140, spread: 80 },    // chain-link dot green
  gradient: { base: 180, spread: 140 }, // wide sweep across blue → green
};

const sizeMap = {
  sm: "w-48 h-64",
  md: "w-64 h-80",
  lg: "w-80 h-96",
};

export function GlowCard({
  children,
  className = "",
  glowColor = "gradient",
  size = "md",
  width,
  height,
  customSize = false,
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId = 0;
    let pendingX = 0;
    let pendingY = 0;
    let pending = false;

    const flush = () => {
      const el = cardRef.current;
      if (el) {
        el.style.setProperty("--x", pendingX.toFixed(2));
        el.style.setProperty("--xp", (pendingX / window.innerWidth).toFixed(3));
        el.style.setProperty("--y", pendingY.toFixed(2));
        el.style.setProperty("--yp", (pendingY / window.innerHeight).toFixed(3));
      }
      pending = false;
    };

    const syncPointer = (e: PointerEvent) => {
      pendingX = e.clientX;
      pendingY = e.clientY;
      if (pending) return;
      pending = true;
      rafId = requestAnimationFrame(flush);
    };

    document.addEventListener("pointermove", syncPointer, { passive: true });
    return () => {
      document.removeEventListener("pointermove", syncPointer);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const { base, spread } = glowColorMap[glowColor];

  const sizing = customSize ? "" : sizeMap[size];

  const style: CSSProperties & Record<string, string | number> = {
    "--base": base,
    "--spread": spread,
    "--radius": 20,
    "--border": 1.5,
    "--backdrop": "var(--glass)",
    "--backup-border": "var(--glass-border)",
    "--size": 280,
    "--outer": 1,
    "--border-size": "calc(var(--border, 1.5) * 1px)",
    "--spotlight-size": "calc(var(--size, 220) * 1px)",
    "--hue": "calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))",
    // Fill spotlight uses a theme-driven alpha (see style tag below) so the
    // inner glow stays crisp in light mode and ambient in dark.
    backgroundImage: `radial-gradient(
      var(--spotlight-size) var(--spotlight-size) at
      calc(var(--x, 0) * 1px)
      calc(var(--y, 0) * 1px),
      hsl(var(--hue, 210) 80% 60% / var(--glow-fill-alpha, 0.14)), transparent
    )`,
    backgroundColor: "var(--backdrop, transparent)",
    backgroundSize:
      "calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))",
    backgroundPosition: "50% 50%",
    backgroundAttachment: "fixed",
    border: "var(--border-size) solid var(--backup-border)",
    position: "relative",
    touchAction: "none",
    ...(width !== undefined ? { width: typeof width === "number" ? `${width}px` : width } : {}),
    ...(height !== undefined ? { height: typeof height === "number" ? `${height}px` : height } : {}),
  };

  // Per-theme tuning:
  //   dark  — ambient bloom: ~0.9 rim, 0.7 white halo, spotlight 280, fill 0.14
  //   light — crisper rim:   1.0 rim, 0.5 white halo, spotlight 220, fill 0.22
  //           (smaller radius + higher opacity so it reads against the pale bg)
  const styleTag = `
    [data-glow] {
      --glow-fill-alpha: 0.14;
      --glow-rim-alpha: 0.9;
      --glow-white-alpha: 0.7;
      --glow-rim-size-scale: 0.75;
    }
    :where(.light) [data-glow] {
      --glow-fill-alpha: 0.22;
      --glow-rim-alpha: 1;
      --glow-white-alpha: 0.5;
      --glow-rim-size-scale: 0.6;
      --size: 220;
    }
    [data-glow]::before,
    [data-glow]::after {
      pointer-events: none;
      content: "";
      position: absolute;
      inset: calc(var(--border-size) * -1);
      border: var(--border-size) solid transparent;
      border-radius: calc(var(--radius) * 1px);
      background-attachment: fixed;
      background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
      background-repeat: no-repeat;
      background-position: 50% 50%;
      mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
      mask-clip: padding-box, border-box;
      mask-composite: intersect;
    }
    [data-glow]::before {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * var(--glow-rim-size-scale)) calc(var(--spotlight-size) * var(--glow-rim-size-scale)) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 210) 85% 65% / var(--glow-rim-alpha, 0.9)), transparent 100%
      );
      filter: brightness(1.8);
    }
    :where(.light) [data-glow]::before {
      /* In light mode the brand blue is darker; crank saturation/lightness
         down slightly so the rim reads as a line, not a wash. */
      background-image: radial-gradient(
        calc(var(--spotlight-size) * var(--glow-rim-size-scale)) calc(var(--spotlight-size) * var(--glow-rim-size-scale)) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 210) 70% 45% / var(--glow-rim-alpha, 1)), transparent 100%
      );
      filter: brightness(1.15);
    }
    [data-glow]::after {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(0 0% 100% / var(--glow-white-alpha, 0.7)), transparent 100%
      );
    }
    [data-glow] [data-glow-inner] {
      position: absolute;
      inset: 0;
      will-change: filter;
      opacity: var(--outer, 1);
      border-radius: calc(var(--radius) * 1px);
      border-width: calc(var(--border-size) * 20);
      filter: blur(calc(var(--border-size) * 10));
      background: none;
      pointer-events: none;
      border: none;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styleTag }} />
      <div
        ref={cardRef}
        data-glow
        style={style}
        className={[
          sizing,
          !customSize ? "aspect-[3/4]" : "",
          "rounded-[20px] relative backdrop-blur-[8px]",
          "shadow-[0_1rem_3rem_-1rem_rgba(0,0,0,0.55)]",
          className,
        ].join(" ")}
      >
        <div data-glow-inner />
        {children}
      </div>
    </>
  );
}

export default GlowCard;
