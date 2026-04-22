// SEO meta registry — route path → page meta.
// Descriptions are SEO artifacts (140–160 chars, institutional tone), written for
// search result snippets. They paraphrase page intent; they do NOT duplicate
// marketing copy from data.ts verbatim.

export type RouteMeta = {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
};

const OG_IMAGE = "https://ryskex.com/hero/08-marble-slab.jpg";

export const META: Record<string, RouteMeta> = {
  "/": {
    title: "RYSKEX — Truth from the machine. Settled in 48 hours.",
    description:
      "Institutional parametric risk exchange for captives, cedents and capital. Triggers price on VUCAWRI. Settlement clears on Redbelly in 48 hours.",
    ogTitle: "RYSKEX — Truth from the machine. Settled in 48 hours.",
    ogDescription:
      "Parametric risk exchange for captives, cedents and institutional capital. Machine-priced triggers, 48-hour on-chain settlement.",
    ogImage: OG_IMAGE,
  },
  "/platform": {
    title: "Platform · RYSKEX",
    description:
      "The DREX exchange, VUCAWRI index, Arx Veritas sponsored cell and Redbelly settlement rail. A four-rail parametric architecture for institutional risk.",
    ogTitle: "Platform — A trading venue, not a marketplace.",
    ogDescription:
      "DREX exchange, VUCAWRI index, Arx Veritas cell, Redbelly rail. Four rails for institutional parametric risk.",
    ogImage: OG_IMAGE,
  },
  "/how-it-works": {
    title: "How it works · RYSKEX",
    description:
      "Machine-readable triggers, VUCAWRI-indexed pricing, ring-fenced sponsored cells and 48-hour on-chain settlement. The RYSKEX workflow, step by step.",
    ogTitle: "How RYSKEX works — cell to settlement in 48 hours.",
    ogDescription:
      "From trigger definition to VUCAWRI pricing to ring-fenced cell to 48-hour settlement on Redbelly. The institutional workflow.",
    ogImage: OG_IMAGE,
  },
  "/about": {
    title: "About · RYSKEX",
    description:
      "The mission, mandate and provenance behind RYSKEX. Lloyd's Lab alumnus, Vermont-domiciled sponsored cells, Redbelly-settled. Veritas ex Machina.",
    ogTitle: "About RYSKEX — Veritas ex Machina.",
    ogDescription:
      "Mandate, provenance and thesis behind the exchange. Lloyd's Lab alumnus. Vermont captive. Redbelly-settled.",
    ogImage: OG_IMAGE,
  },
  "/team": {
    title: "Team · RYSKEX",
    description:
      "Dr. Marcus Schmalbach and the RYSKEX operators. Parametric architects, exchange engineers, insurance veterans and institutional distribution leads.",
    ogTitle: "The operators behind RYSKEX.",
    ogDescription:
      "Dr. Marcus Schmalbach and the team building the institutional parametric risk exchange.",
    ogImage: OG_IMAGE,
  },
  "/contact": {
    title: "Contact · RYSKEX",
    description:
      "Request a cell, arrange a briefing, or open institutional distribution with RYSKEX. Direct lines for captives, cedents, syndicates and allocators.",
    ogTitle: "Contact RYSKEX — request a cell.",
    ogDescription:
      "Direct lines for captives, cedents, syndicates and institutional allocators. Request a cell or arrange a briefing.",
    ogImage: OG_IMAGE,
  },
  "*": {
    title: "Not found · RYSKEX",
    description:
      "The link you followed does not resolve on the current exchange. Return to the RYSKEX platform overview or contact the operator.",
    ogTitle: "404 · Off-ledger — RYSKEX",
    ogDescription: "The requested route does not resolve on the exchange.",
    ogImage: OG_IMAGE,
  },
};
