<div align="center">

# RYSKEX

**Truth from the machine. Settled in 48 hours.**

The institutional parametric risk exchange — a cinematic marketing site for Dr. Marcus Schmalbach's institutional-grade parametric insurance platform.

[![Live on Vercel](https://img.shields.io/badge/Live_site-ryskex--website.vercel.app-3B72DE?style=for-the-badge&logo=vercel&logoColor=white)](https://ryskex-website.vercel.app)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite 6](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind v4](https://img.shields.io/badge/Tailwind-v4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion 11](https://img.shields.io/badge/Framer_Motion-11-0055FF?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion)
[![Lighthouse A11y](https://img.shields.io/badge/Lighthouse_A11y-98-2EC46E?style=flat-square)](https://ryskex-website.vercel.app)
[![Lighthouse SEO](https://img.shields.io/badge/Lighthouse_SEO-100-2EC46E?style=flat-square)](https://ryskex-website.vercel.app)
[![License](https://img.shields.io/badge/license-UNLICENSED-lightgrey?style=flat-square)](#license)

<br/>

<img src="docs/screenshots/home-1440.png" alt="RYSKEX homepage" width="900">

</div>

---

## What is this

RYSKEX sells institutional parametric risk coverage — policies that pay out automatically when a measurable threshold breaches (wind speed, rainfall, index value), not after an adjuster argues with a claimant. The platform settles in 48 hours against public data feeds.

This repo is the **marketing site** that explains the product to insurers, reinsurers, risk managers, and treasury teams. It is *not* the exchange engine itself — it's the cinematic front door.

**Target audience:** institutional buyers (C-suite, risk officers). Everything is tuned for that — editorial typography, dark-first aesthetic, credibility strips, zero stock-photo energy.

---

## Live

<table>
<tr><td><strong>Production</strong></td><td><a href="https://ryskex-website.vercel.app">ryskex-website.vercel.app</a></td></tr>
<tr><td><strong>Status</strong></td><td>All 6 routes live · <code>200</code> across the board</td></tr>
<tr><td><strong>Deploy</strong></td><td>Vercel (auto-deploy on <code>master</code>)</td></tr>
</table>

---

## Feature highlights

| Capability | Detail |
| :-- | :-- |
| **Cinematic intro** | Play-once-per-session entrance screen — radial cobalt bloom, orbital rings draw in, wordmark unblurs, signal particle completes a half-orbit, then the whole overlay scales + fades up to reveal the site. Skippable (click, `Esc`, `Space`, `Enter`). Auto-dismisses after ~3.2 s. Respects `prefers-reduced-motion`. |
| **Dark-first, light-mode opt-in** | Canonical look is dark navy + cobalt + green. Light mode toggle ships brushed-silver founder card + token-aware text shadows. Hero sections wear a `.dark-scope` class so they stay cinematic even when the rest of the site swaps to light. |
| **Six rich hero SVG pieces** | One per page. Cursor-sprung parallax, orbital rings, 23° tilted wireframe globe with tick labels, Tower Bridge + Connecticut State Capitol SVG landmarks, pipeline diagrams, team-as-network — every page has ~400–500 lines of hand-tuned SVG. |
| **Custom 1.25 px hairline icon set** | Zero <code>lucide-react</code> imports. 14 brand icons in <code>src/components/icons/brand/</code> — ArrowRight, Mail, MapPin, Chevron{Left,Right,Down}, Plus, Minus, Menu, X, Sun, Moon, Send, and siblings. <code>currentColor</code>-driven, <code>strokeWidth</code> overridable. |
| **9 motion primitives** | `Reveal`, `BlurIn`, `CharStagger`, `WordStagger`, `StaggerText`, `GradientSweep`, `CountUp`, `HairlineDraw`, `MagneticButton`, `TiltCard`, `ParallaxY`, `ScrollPin`, `ShimmerBadge`, `AnimatedGradientText`, `SmoothScroll`, `ScrollProgress`, `MagneticLink`. All honor `prefers-reduced-motion`. |
| **Motion timing constants** | `src/motion/constants.ts` exports `EASE_OUT_SOFT`, `EASE_IN_OUT`, `EASE_OUT`, `DURATION_FAST/NORMAL/SLOW/EPIC`, `STAGGER_CHILD`. 29 files refactored to consume them for a coherent rhythm. |
| **WCAG 2.2 AA** | Skip-to-content link, global `:focus-visible` cobalt ring, mobile nav dialog with full focus trap (`Esc` + `Shift+Tab` cycling, focus restore), FAQ `aria-controls` → `role="region"` panels, single `<h1>` per page, audited alt text across every image. |
| **Code-split routes** | React.lazy per page + vendor chunking (`react-core`, `framer`, `vendor`). Main entry lands at **≈ 13 kB gzipped**; largest single chunk (`react-core`) at **≈ 74 kB gz**. Every page lazy-loads with a branded 2 px cobalt indeterminate progress bar. |
| **Cross-browser hardening** | `@supports not (backdrop-filter)` fallback for every glass surface. `@supports not (background-clip: text)` fallback to solid `--accent`. `-webkit-text-fill-color: transparent` pairing. Document overflow protection at 320 px. |
| **SEO + meta** | Per-route title/description/OG/Twitter registry at `src/lib/meta.ts`. Client-side `Meta` component updates `document.title` + upserts tags on route change. `public/sitemap.xml` + `public/robots.txt` shipped. |
| **Error + loading boundaries** | `ErrorBoundary` with inline-styled fallback (renders even if CSS fails), `role="alert"` + Reload/Home CTAs. Branded 404 page with staggered reveal. |

---

## Cinematic intro, frame by frame

```
  t=0.00s  ┃  Deep navy. Black. Nothing yet.
  t=0.10s  ┃  Radial cobalt glow blooms from centre (60 % viewport ellipse).
  t=0.30s  ┃  Three dashed orbital rings unrotate into place.
  t=0.60s  ┃  24 hairline tick marks cascade around the outer ring.
  t=0.80s  ┃  Core light pulses — scale 0.3 → 1.1 → 1.0, opacity 0 → 1 → 0.9.
  t=0.95s  ┃  "RYSKEX" wordmark drops + unblurs, letter-spacing eases 0.42em → 0.18em.
  t=1.40s  ┃  Cobalt→green hairline sweeps across beneath the wordmark.
  t=1.55s  ┃  "Truth from the machine" fades in, tracking 0.42em.
  t=1.90s  ┃  Hub codes surface bottom-centre — LDN · HFD · NYC · BER.
  t=3.20s  ┃  Whole overlay scales 1.04, blurs 8px, fades. Site revealed.
```

Click anywhere, press `Esc`/`Space`/`Enter`, or click the bottom-right **Skip** button to dismiss early. Plays once per browser session via `sessionStorage`.

---

## Lighthouse

All scored against the Vercel production build under mobile throttling.

| Route | Performance | Accessibility | Best Practices | SEO |
| :-- | --: | --: | --: | --: |
| `/` | 58 | 98 | 100 | 100 |
| `/platform` | 57 | 98 | 100 | 100 |
| `/how-it-works` | 60 | 98 | 100 | 100 |
| `/about` | 58 | 94 | 100 | 100 |
| `/team` | 56 | 98 | 100 | 100 |
| `/contact` | 60 | 98 | 100 | 100 |

**A11y 94–98** — one minor `heading-order` nit + one `target-size` on `/about`. **SEO & Best Practices 100** across the board. **Performance 56–60** is LCP/CLS-bound under mobile throttling; TBT is 0–41 ms (excellent). Full post-ship performance levers are listed in [`STATUS-final.md`](../STATUS-final.md).

---

## Bundle

```
react-core      73.46 kB gz   ████████████████████
framer          41.11 kB gz   ███████████
Home            12.43 kB gz   ███▏          ← page chunk
index.css       13.70 kB gz   ███▌
index.js        12.06 kB gz   ███           ← main entry
HowItWorks       5.82 kB gz   █▌
Platform         5.98 kB gz   █▌
Contact          5.68 kB gz   █▌
About            5.48 kB gz   █▌
Team             4.71 kB gz   █▏
FourRails        3.66 kB gz   █
```

**Total `dist/`: 2.6 MB** (including self-hosted woff2 for Instrument Serif + Geist + Geist Mono).

---

## Screenshots

<details open>
<summary><strong>Desktop — 1440 px</strong></summary>

<br/>

| | |
| :--: | :--: |
| ![Home](docs/screenshots/home-1440.png) | ![Platform](docs/screenshots/platform-1440.png) |
| **Home** · tilted globe, hub codes, TrustStrip | **Platform** · editorial long-form + custom hero art |
| ![How it works](docs/screenshots/how-1440.png) | ![About](docs/screenshots/about-1440.png) |
| **How it works** · 4-step pipeline | **About** · Mission / Vision / Tech carousel |
| ![Team](docs/screenshots/team-1440.png) | ![Contact](docs/screenshots/contact-1440.png) |
| **Team** · 9 members, greyscale → color on hover | **Contact** · two-office form + signal arc |

</details>

<details>
<summary><strong>Mobile — 390 px</strong></summary>

<br/>

| Home | Contact |
| :--: | :--: |
| <img src="docs/screenshots/home-390.png" width="280"> | <img src="docs/screenshots/contact-390.png" width="280"> |

</details>

---

## Architecture

```
07-build/
├── src/
│   ├── App.tsx                    React Router + lazy routes + ErrorBoundary + Intro
│   ├── main.tsx                   entry
│   ├── components/
│   │   ├── Intro.tsx              ← cinematic session-once entrance
│   │   ├── ErrorBoundary.tsx      inline-styled fallback, survives CSS failure
│   │   ├── Meta.tsx               per-route document.title + meta tag upsert
│   │   ├── Nav.tsx                floating pill, dialog-trap mobile menu
│   │   ├── Footer.tsx             drifting orbs + token-driven palette
│   │   ├── RouteSuspense.tsx      2 px cobalt indeterminate bar + 60 vh spacer
│   │   ├── ThemeToggle.tsx        spring cross-fade + aria-pressed
│   │   ├── ui/spotlight-card.tsx  rAF-coalesced cursor-tracking spotlight
│   │   ├── icons/brand/           14 custom 1.25 px hairline icons
│   │   ├── hero-art/              6 rich per-page SVG hero pieces (400–500 LOC each)
│   │   │   ├── HomeHero.tsx       23° tilted globe, orbital rings, particles
│   │   │   ├── PlatformHero.tsx   core engine + counter-parallax grid
│   │   │   ├── HowItWorksHero.tsx slab-float 4-step pipeline
│   │   │   ├── AboutHero.tsx      founding medallion on star chart
│   │   │   ├── TeamHero.tsx       mesh network, per-node hover reveal
│   │   │   └── ContactHero.tsx    Hartford↔London signal arc
│   │   ├── city-art/              Tower Bridge + CT State Capitol SVGs
│   │   └── sections/              Hero, StatStrip, FeaturesGrid, Globe, FAQ, …
│   ├── motion/
│   │   ├── constants.ts           EASE_OUT_SOFT, DURATION_*, STAGGER_CHILD
│   │   └── Reveal, BlurIn, CharStagger, CountUp, HairlineDraw, …
│   ├── pages/                     Home, Platform, HowItWorks, About, Team, Contact, NotFound
│   ├── lib/
│   │   ├── data.ts                copy ground truth
│   │   └── meta.ts                per-route SEO registry
│   └── styles/
│       ├── tokens.css             theme tokens (both modes)
│       ├── effects.css            13 visual effects (aurora, noise, dot-grid, beam…)
│       └── app.css                glass primitives, section-ambient, seam-fades, bleeds
├── public/
│   ├── riskex-logo.svg
│   ├── hero/                      8 Pollinations-generated hero photos
│   ├── robots.txt
│   └── sitemap.xml
├── vercel.json                    SPA rewrites + immutable asset caching + security headers
└── vite.config.ts                 manualChunks: react-core · framer · vendor
```

---

## Running locally

```bash
git clone https://github.com/gtrush03/ryskex-website.git
cd ryskex-website
npm install
npm run dev          # → http://localhost:5173
```

### Scripts

| | |
| :-- | :-- |
| `npm run dev` | Vite dev server on port 5173, HMR + HTTPS-off |
| `npm run build` | TypeScript project-refs build → Vite production build → `dist/` |
| `npm run preview` | Serves `dist/` on port 4173 |
| `npm run typecheck` | `tsc -b --noEmit` across both project refs |
| `npm run lint` | ESLint across `src/` |

### Verification (the same checks used during development)

```bash
rm -f tsconfig.app.tsbuildinfo tsconfig.node.tsbuildinfo
npm run typecheck                                                # 0 errors
for p in / /platform /how-it-works /about /team /contact; do
  curl -s -o /dev/null -w "$p → %{http_code}\n" "http://localhost:5173$p"
done                                                             # all 200
grep -rn "from \"lucide-react\"" src/                            # empty
npm run build                                                    # success
```

---

## Stack

<table>
<tr><th align="left">Framework</th><td>Vite 6 · React 19 · TypeScript strict</td></tr>
<tr><th align="left">Styling</th><td>Tailwind v4 (<code>@tailwindcss/vite</code>) · CSS custom properties for tokens · glass primitives + 13 visual effects layered in <code>effects.css</code></td></tr>
<tr><th align="left">Motion</th><td>Framer Motion 11 · 9+ motion primitives · global motion constants file · <code>prefers-reduced-motion</code> honored everywhere</td></tr>
<tr><th align="left">Routing</th><td>react-router-dom 7 · lazy per-page splits · Suspense fallback branded</td></tr>
<tr><th align="left">Typography</th><td>Instrument Serif (display) · Geist Variable (sans) · Geist Mono Variable (mono) — all self-hosted via <code>@fontsource</code></td></tr>
<tr><th align="left">Icons</th><td>14 custom 1.25 px hairline SVG icons — zero runtime icon library</td></tr>
<tr><th align="left">Deploy</th><td>Vercel — SPA rewrite, immutable asset caching, security headers</td></tr>
<tr><th align="left">Quality gates</th><td>WCAG 2.2 AA · cross-browser <code>@supports</code> fallbacks · Lighthouse a11y 98 / SEO 100 / BP 100</td></tr>
</table>

---

## Brand system

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   Primary       Cobalt      #3B72DE       --accent          │
│   Secondary     Green       #2EC46E       --accent-2        │
│   Canvas        Deep navy   #070B14       --bg (dark)       │
│   Canvas        Paper       #F7F8FB       --bg (light)      │
│   Type primary              #F4F5F8 / #0A0F1E               │
│   Type muted                #9AA1B2 / #4B5568               │
│                                                             │
│   Contrast  dark: text-text @ 19.5:1 · muted @ 8.2:1        │
│             light: text-text @ 19:1 · muted @ 7.5:1         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

Logo: `public/riskex-logo.svg` — base64-wrapped dark-on-light. Inverted in dark, un-inverted in light via `invert light:invert-0`.

---

## Deployment

Vercel auto-deploys on push to `master`. Manual deploy:

```bash
vercel deploy --prod
```

`vercel.json` configures:
- SPA rewrite (every path → `index.html`)
- `Cache-Control: public, max-age=31536000, immutable` for `/assets/*` and font files
- Security headers: `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` with camera/mic/geo disabled

---

## How this repo was built

Full development history, team-by-team agent report, and known post-ship levers live in [`STATUS-final.md`](../STATUS-final.md). Highlights:

- **4 sequential agent teams, 13 Opus 4.7 agents** — Alpha (visual polish · 4 agents) → Beta (content depth · 3) → Gamma (quality + performance · 3) → Delta (platform readiness · 3)
- **Strict file-ownership matrix** — no two agents ever touched the same file in the same phase
- **Verification between teams** — 0 TS errors, 6 routes 200, ESCP-free
- **71 files changed, +3,383 / −829** across four team commits
- **Cinematic intro** layered on top as a final creative pass

Git log:

```
cinematic intro screen
Team Delta: SEO + meta registry + ErrorBoundary + 404
Team Gamma: lazy routes + vendor chunks + WCAG 2.2 AA + cross-browser fallbacks
Team Beta:  rich per-page hero art + custom brand icons + motion constants
Team Alpha: hero polish + bleed utilities + light-mode audit + card materials
Checkpoint before final polish pass
```

---

## License

Proprietary — this site showcases RYSKEX's institutional platform on behalf of Dr. Marcus Schmalbach. Code and assets are unlicensed for external reuse. Reach out via the site's Contact page for licensing discussions.

---

<div align="center">

**Built with care. Deployed with intent.**

[Live site](https://ryskex-website.vercel.app) · [GitHub](https://github.com/gtrush03/ryskex-website) · [Report an issue](https://github.com/gtrush03/ryskex-website/issues)

</div>
