import { Link } from "react-router-dom";
import { Mail } from "@/components/icons/brand";
import Wordmark from "./Wordmark";

function XLogo() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function LIIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.339 18.339V9.66H5.562v8.679h2.777zM6.95 8.425a1.61 1.61 0 1 0 0-3.221 1.61 1.61 0 0 0 0 3.221zM18.339 18.339v-4.755c0-2.572-1.391-3.769-3.247-3.769-1.497 0-2.169.823-2.544 1.4V9.66h-2.776c.037.784 0 8.679 0 8.679h2.776v-4.847c0-.25.018-.498.091-.677.2-.498.655-1.014 1.42-1.014 1.001 0 1.402.762 1.402 1.878v4.659h2.878z" />
    </svg>
  );
}

const COLS = [
  {
    head: "Platform",
    links: [
      ["How It Works", "/how-it-works"],
      ["The Exchange (DREx)", "/platform"],
      ["VUCAWRI Index", "/platform"],
      ["Sponsored Cells", "/platform"],
      ["Arx Veritas Parametrics", "/platform"],
    ],
  },
  {
    head: "Company",
    links: [
      ["Team", "/team"],
      ["Contact", "/contact"],
      ["Press", "/contact"],
      ["Lloyd's Lab alumni", "/contact"],
    ],
  },
  {
    head: "Request",
    links: [
      ["Request a cell", "/contact"],
      ["Institutional inquiry", "/contact"],
      ["Platform brief", "/contact"],
      ["Press inquiry", "/contact"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden">
      {/* top fade — soft dissolve from page bg into footer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-48"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, var(--bg) 60%)",
          opacity: 0.6,
        }}
      />
      {/* faint horizon line — visually closes the page just under the top fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[8%] right-[8%] h-px"
        style={{
          top: 176,
          background:
            "linear-gradient(90deg, transparent 0%, var(--border-strong) 50%, transparent 100%)",
          opacity: 0.7,
        }}
      />

      {/* drifting color orbs — larger, slightly softer for richer ambience */}
      <div
        aria-hidden
        className="orb orb-blue orb-drift pointer-events-none"
        style={{ top: "-80px", left: "10%", width: 612, height: 612, opacity: 0.17 }}
      />
      <div
        aria-hidden
        className="orb orb-green orb-drift-2 pointer-events-none"
        style={{ bottom: "-120px", right: "5%", width: 540, height: 540, opacity: 0.15 }}
      />
      <div
        aria-hidden
        className="orb orb-deep orb-drift pointer-events-none"
        style={{ top: "30%", right: "30%", width: 448, height: 448, opacity: 0.13 }}
      />

      <div className="container-x relative z-10 grid gap-12 pt-24 pb-10 md:grid-cols-[1.2fr_3fr] md:gap-16">
        <div>
          <Wordmark />
          <p className="mt-6 max-w-sm font-display text-[22px] italic leading-snug text-text">
            Veritas ex Machina
          </p>
          <p className="mt-3 max-w-sm text-[13.5px] leading-relaxed text-muted">
            Truth, produced by the machine, cleared on the chain. An
            institutional parametric risk exchange — serving captives,
            syndicates and 144A buyers from London and Hartford.
          </p>
          <div className="mt-6 flex gap-2">
            {[
              { Icon: XLogo, label: "X" },
              { Icon: LIIcon, label: "LinkedIn" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="glass inline-flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:text-accent"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
          {COLS.map((col) => (
            <div key={col.head}>
              <h4 className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent">
                {col.head}
              </h4>
              <ul className="space-y-3 text-[13.5px] text-muted">
                {col.links.map(([label, to]) => (
                  <li key={label}>
                    <Link to={to} className="transition-colors hover:text-text">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div
        className="container-x relative z-10 flex flex-col items-start gap-3 py-6 text-[12px] text-subtle md:flex-row md:items-center md:justify-between"
        style={{
          borderTop: "1px solid transparent",
          borderImage:
            "linear-gradient(90deg, transparent, var(--border-strong), transparent) 1",
        }}
      >
        <p>
          © {new Date().getFullYear()} RYSKEX Inc. · New York · Hartford · London · Berlin · Veritas ex Machina — an institutional parametric risk exchange.
        </p>
        <div className="inline-flex items-center gap-4">
          <a href="mailto:desk@ryskex.io" className="inline-flex items-center gap-1.5 transition-colors hover:text-accent">
            <Mail size={12} strokeWidth={1.75} />
            desk@ryskex.io
          </a>
          <a href="#" className="transition-colors hover:text-muted">Privacy</a>
          <a href="#" className="transition-colors hover:text-muted">Terms</a>
        </div>
      </div>
    </footer>
  );
}
