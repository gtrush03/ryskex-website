import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

// GlowCard — cursor-tracking spotlight card with a glow border.
// Adapted from the 21st.dev / Aceternity-style spotlight pattern.
// Uses CSS custom props --x/--xp/--y/--yp set from pointermove for smooth tracking.

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
    const syncPointer = (e: PointerEvent) => {
      const { clientX: x, clientY: y } = e;
      const el = cardRef.current;
      if (!el) return;
      el.style.setProperty("--x", x.toFixed(2));
      el.style.setProperty("--xp", (x / window.innerWidth).toFixed(3));
      el.style.setProperty("--y", y.toFixed(2));
      el.style.setProperty("--yp", (y / window.innerHeight).toFixed(3));
    };
    document.addEventListener("pointermove", syncPointer);
    return () => document.removeEventListener("pointermove", syncPointer);
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
    backgroundImage: `radial-gradient(
      var(--spotlight-size) var(--spotlight-size) at
      calc(var(--x, 0) * 1px)
      calc(var(--y, 0) * 1px),
      hsl(var(--hue, 210) 80% 60% / 0.14), transparent
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

  const styleTag = `
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
        calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 210) 85% 65% / 0.9), transparent 100%
      );
      filter: brightness(1.8);
    }
    [data-glow]::after {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(0 0% 100% / 0.7), transparent 100%
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
