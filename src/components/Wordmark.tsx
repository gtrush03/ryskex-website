import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";

// Real RYSKEX logo. Dark-first site — logo is dark-on-light, so invert by default,
// un-invert when `.light` class is applied to <html>.
//
// A subtle radial halo sits behind the logo so the wordmark always reads on dark hero
// backgrounds where the nav pill may be semi-transparent. The halo disappears in
// light-mode (where the logo renders dark-on-light and doesn't need lift).

export default function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      aria-label="RYSKEX — home"
      className={cn("relative inline-flex items-center", className)}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 light:hidden"
        style={{
          background:
            "radial-gradient(60% 140% at 50% 50%, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.06) 45%, transparent 75%)",
          filter: "blur(8px)",
        }}
      />
      <img
        src="/riskex-logo.svg"
        alt="RYSKEX"
        width={240}
        height={48}
        className="block h-6 w-auto max-w-[96px] select-none invert light:invert-0 md:h-7 md:max-w-none"
        draggable={false}
      />
    </Link>
  );
}
