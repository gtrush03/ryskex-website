// RYSKEX data — v3. Source: 09-v3/copy.md (editorial deck by Agent B)
// Positioning: institutional parametric risk exchange. Register: Bloomberg / Stripe Press.
// No "crypto insurance" filler. Trade terms preserved. Numbers before adjectives.

// ──────────────────────────────────────────────────────────────
// Hero
// ──────────────────────────────────────────────────────────────
export const hero = {
  eyebrow: "PARAMETRIC RISK EXCHANGE",
  headline: "Truth from the machine.",
  headlineLine2: "Settled in 48 hours.",
  rotatingCounterparties: [
    "Captives",
    "Cedents",
    "Syndicates",
    "Cell sponsors",
    "ILS funds",
    "Corporates",
    "ESG allocators",
  ],
  sub:
    "RYSKEX runs a parametric risk exchange for captives, cedents and institutional capital. Triggers price on the VUCAWRI index. Settlement clears on the Redbelly rail.",
  primaryCta: "Request a cell",
  secondaryCta: "See how the exchange works",
  provenance:
    "Lloyd's Lab Cohort 2 & 5 · Redbelly Network · Vermont captive · 144A-eligible.",
  trustBar: [
    "LLOYD'S LAB",
    "REDBELLY NETWORK",
    "VERMONT CAPTIVE INSURANCE ASSOCIATION",
    "CONNECTICUT CAPTIVE INSURANCE FORUM",
    "ARX VERITAS",
    "MUNICH RE AMERICA",
    "CAPTIVE INTERNATIONAL",
  ],
};

// ──────────────────────────────────────────────────────────────
// Stats
// ──────────────────────────────────────────────────────────────
export const stats = [
  { value: "$175T", label: "Global capital markets we bridge", source: "Schmalbach, VCIA 2024" },
  { value: "83%", label: "Share of S&P 500 now intangible", source: "Captive International" },
  { value: "48h", label: "Settlement SLA on complex claims", source: "RYSKEX platform benchmark" },
  { value: "350×", label: "Capital markets vs reinsurance pool", source: "Schmalbach, Captive.com" },
];

export const statSection = {
  eyebrow: "THE NUMBERS THAT MAKE THE CASE",
  title: "Four figures that explain why parametric, why now, why RYSKEX.",
  sub:
    "Every number is sourced from Schmalbach's published work or from live platform benchmarks. No marketing rounding.",
};

// ──────────────────────────────────────────────────────────────
// Six rails (features)
// ──────────────────────────────────────────────────────────────
export const rails = [
  {
    n: "01",
    name: "VUCAWRI Index Engine",
    body:
      "Proprietary ML index scoring volatility, uncertainty, complexity, ambiguity. Ingests non-traditional data to price perils traditional actuaries won't touch.",
    icon: "gauge",
  },
  {
    n: "02",
    name: "Parametric Trigger Library",
    body:
      "If X, then pay Y. Pre-built triggers for climate, cyber, pandemic, political, reputation and innovation-failure perils — each machine-readable.",
    icon: "trigger",
  },
  {
    n: "03",
    name: "Sponsored Cell Captive",
    body:
      "Vermont-domiciled sponsored cell infrastructure. Cedents plug into a ring-fenced cell instead of standing up a fresh captive from scratch.",
    icon: "cell",
  },
  {
    n: "04",
    name: "On-chain Settlement",
    body:
      "Contracts clear on the Redbelly L1. Smart contracts release collateral the moment an oracle confirms the trigger event — no adjuster, no litigation.",
    icon: "chain",
  },
  {
    n: "05",
    name: "144A Distribution Rail",
    body:
      "Tokenised cells structured for 144A-grade institutional distribution. Opens parametric risk to ILS funds, pension mandates and ESG allocators.",
    icon: "fan",
  },
  {
    n: "06",
    name: "Veritas ex Machina",
    body:
      "The production environment hosting every cell, trigger and tokenised instrument. One audit trail, one oracle set, one immutable ledger of record.",
    icon: "seal",
  },
];

export const railsSection = {
  eyebrow: "THE PLATFORM",
  title: "Six rails. One exchange.",
  dek:
    "Every parametric contract on RYSKEX runs through the same six infrastructure rails — from index to cell to settlement.",
};

// ──────────────────────────────────────────────────────────────
// Four convictions
// ──────────────────────────────────────────────────────────────
export const pillars = [
  {
    n: "01",
    title: "Parametric First",
    body: "Indemnity insurance cannot price intangibles; parametric can.",
  },
  {
    n: "02",
    title: "Machine-Read Trust",
    body: "Triggers are code. Code is auditable. Adjusters are not.",
  },
  {
    n: "03",
    title: "Capital, Not Capacity",
    body: "The unlock is $175T of capital markets, not more reinsurance.",
  },
  {
    n: "04",
    title: "Cells Over Carriers",
    body: "Sponsored cells let corporates cede exotic risk in weeks.",
  },
];

export const pillarsSection = {
  eyebrow: "HOW WE THINK",
  title: "Four convictions.",
  dek:
    "The four claims Dr. Schmalbach has defended in print, on panels, and in front of Lloyd's since 2018.",
  footer: "Four convictions. One operating model. Every product on RYSKEX traces to this thesis.",
};

// ──────────────────────────────────────────────────────────────
// Mission / Vision / Technology
// ──────────────────────────────────────────────────────────────
export const missionContent = [
  {
    kicker: "THE MISSION",
    heading: "Price what carriers won't.",
    body:
      "Eighty-three percent of S&P 500 value is intangible — data, IP, carbon restraint, reputation, code. Legacy indemnity cannot classify it. RYSKEX exists to parametrise it, cell it, securitise it, and move it onto rails institutional capital will actually hold.",
    image: "https://i.imgur.com/exEIe2X.png",
  },
  {
    kicker: "THE VISION",
    heading: "A risk exchange, not a broker.",
    body:
      "Parametric contracts should trade like commodities, with prices that reflect conditions in real time. RYSKEX is building the Digital Risk Exchange — DREx — so cedents, syndicates and ILS funds transact on one order book, cleared in 48 hours.",
    image: "https://i.imgur.com/9Lrx8Ql.png",
  },
  {
    kicker: "THE TECHNOLOGY",
    heading: "VUCAWRI. Redbelly. Veritas.",
    body:
      "Three stacks, one platform. The VUCAWRI index prices the peril. The Veritas ex Machina environment hosts the cell and the instrument. Redbelly Network's compliant L1 clears settlement. Every step is instrumented, timestamped, and independently verifiable.",
    image: "https://i.imgur.com/NOH7jBJ.png",
  },
];

// ──────────────────────────────────────────────────────────────
// Values
// ──────────────────────────────────────────────────────────────
export const values = [
  {
    title: "Auditability",
    body:
      "Every trigger, oracle feed, and cell movement is timestamped on-chain and independently reconstructable by any counterparty.",
  },
  {
    title: "Speed",
    body:
      "Forty-eight hours from loss event to settled capital. No adjusters, no discovery, no litigation, no grey area.",
  },
  {
    title: "Precision",
    body:
      "Parametric contracts pay on measurable events, not narrative claims. Basis risk is priced openly, not hidden in fine print.",
  },
  {
    title: "Institutional gravity",
    body:
      "Built for captive managers, syndicates, 144A buyers and corporate treasurers — the people who read prospectuses before they read marketing.",
  },
];

// ──────────────────────────────────────────────────────────────
// Team — names/titles/portraits locked to the 9 real operators.
// Quotes upgraded per copy deck.
// ──────────────────────────────────────────────────────────────
export const team = [
  {
    name: "Dr. Marcus Schmalbach",
    title: "CEO & Co-Founder",
    image: "https://i.imgur.com/ci1ZHOZ.png",
    quote: "If X, then pay Y. That sentence is the entire product.",
    focus: "Strategic Leadership & Innovation",
  },
  {
    name: "Simon Kolkmann",
    title: "CTO & Co-Founder",
    image: "https://i.imgur.com/Iq6jFPe.png",
    quote: "We engineer the rail between a cell captive and a 144A buyer.",
    focus: "Technical Architecture & Blockchain",
  },
  {
    name: "Tatjana Winter",
    title: "Head of Business Development",
    image: "https://i.imgur.com/ljA5TSM.png",
    quote: "Cedents don't want a new carrier; they want a cell and a trigger.",
    focus: "Strategic Partnerships & Growth",
  },
  {
    name: "Dr. Yue Yin",
    title: "Head of Risk Modelling",
    image: "https://i.imgur.com/INZZaNg.png",
    quote: "VUCAWRI prices what actuarial tables were never built to see.",
    focus: "Risk Analytics & Modeling",
  },
  {
    name: "Tobias Gurtzick",
    title: "Head of Software Architecture",
    image: "https://i.imgur.com/K7RUaMQ.png",
    quote: "Every trigger is a contract. Every contract is audited twice — once by us, once by the chain.",
    focus: "System Architecture & Security",
  },
  {
    name: "Suneetha Gurtzick",
    title: "Head of AI",
    image: "https://i.imgur.com/m9QF9bZ.png",
    quote: "Machine-read perils mean machine-settled payouts. No narrative, no adjuster.",
    focus: "AI Implementation & Strategy",
  },
  {
    name: "Nils Ossenbrink",
    title: "External Advisor",
    image: "https://i.imgur.com/Vq7gnWL.png",
    quote: "Captives are the quietest vehicle in the market. We are making them tradable.",
    focus: "Insurance Strategy & Advisory",
  },
  {
    name: "Franziska Oschmann",
    title: "Research Associate",
    image: "https://i.imgur.com/jSQwjCO.png",
    quote: "Every new peril starts as a dataset nobody else is reading yet.",
    focus: "Market Research & Analysis",
  },
  {
    name: "Sara Braulik Ibañez",
    title: "Website Designer",
    image: "https://i.imgur.com/UAHWU0l.png",
    quote: "Institutional trust is a typography choice before it is a product choice.",
    focus: "UI/UX & Brand Identity",
  },
];

export const founderPullQuote = {
  quote:
    "The reinsurance market is a paddling pool compared to the ocean of global capital. Our job is to build the rail between them.",
  attribution:
    "Dr. Marcus Schmalbach · CEO & Co-Founder · Lloyd's Lab Cohorts 2 & 5",
};

// ──────────────────────────────────────────────────────────────
// Offices
// ──────────────────────────────────────────────────────────────
export const offices = [
  {
    city: "London",
    country: "United Kingdom",
    address: "Lloyd's Building · 4th Floor · One Lime Street · London EC3M 7HA, UK",
    role: "Syndicate relations · Lloyd's Lab alumni desk · European cedents",
    phone: "+44 20 7123 4567",
    tz: "GMT+0",
  },
  {
    city: "Hartford",
    country: "United States",
    address: "American Row · 5th Floor, PO Box 5056 · Hartford, CT 06102, USA",
    role: "US captive desk · Vermont cell operations · North American cedents",
    phone: "+1 860 555 0123",
    tz: "GMT-5",
  },
];

// ──────────────────────────────────────────────────────────────
// FAQ
// ──────────────────────────────────────────────────────────────
export const faqs = [
  {
    q: "What is parametric risk transfer and how is it different from indemnity cover?",
    a: "Parametric contracts pay on a pre-agreed trigger — a measured event, an index threshold, a confirmed loss parameter — rather than on a loss adjuster's reconstruction of damages. No forensic claim, no dispute over quantum. If the trigger fires, the capital moves.",
  },
  {
    q: "How does settlement clear in 48 hours?",
    a: "Our cells are held in Vermont-domiciled sponsored captive infrastructure, collateralised in advance. When the oracle set confirms the trigger event, the smart contract releases collateral directly to the cedent on the Redbelly L1. No adjuster queue, no subrogation, no reserving cycle.",
  },
  {
    q: "Which perils can RYSKEX parametrise today?",
    a: "The six PRICE categories: Political, Reputation, Innovation failure, Cyber, Climate, Equity. Flagship live products include the Arx Veritas Parametrics climate cell, PCyCO parametric cyber, and the VUCA World Policy covering the ten largest prevailing corporate risks with a secondary parent-impact trigger.",
  },
  {
    q: "Who are the counterparties on the exchange?",
    a: "Captives and their parent corporates cede risk. Reinsurers, ILS funds, pension mandates and ESG allocators take it on via tokenised participation rights structured for 144A-grade distribution. RYSKEX is the exchange and the cell sponsor — not a carrier.",
  },
  {
    q: "How do you handle basis risk?",
    a: "Basis risk is priced explicitly in every contract, not hidden inside indemnity ambiguity. The VUCAWRI index and any third-party oracle feed are disclosed, historically backtested, and independently auditable on-chain. Cedents see the gap between trigger and loss before they sign.",
  },
  {
    q: "What does onboarding a new cell look like?",
    a: "Typical path: scoping call, peril definition, trigger design against VUCAWRI or a bespoke index, collateral sizing, sponsored cell spin-up in Vermont, tokenisation on Veritas ex Machina, institutional placement. First cells have closed inside a quarter.",
  },
];

// ──────────────────────────────────────────────────────────────
// How it works — 4 steps
// ──────────────────────────────────────────────────────────────
export const steps = [
  {
    n: "01",
    title: "Define the peril.",
    body:
      "We scope the exposure with your captive manager or risk team. Output: a parametric definition, a candidate trigger, a VUCAWRI or bespoke index, and a first-cut basis-risk view.",
  },
  {
    n: "02",
    title: "Structure the cell.",
    body:
      "A sponsored cell is carved inside our Vermont captive. Collateral is sized, the trigger is encoded, and the instrument is issued on the Veritas ex Machina platform.",
  },
  {
    n: "03",
    title: "Place the capital.",
    body:
      "The tokenised cell is distributed to institutional takers — ILS funds, reinsurers, 144A buyers, ESG allocators. You see the book before it closes.",
  },
  {
    n: "04",
    title: "Settle in 48 hours.",
    body:
      "If the trigger fires, the oracle set confirms, the smart contract releases collateral, and the cedent is paid inside 48 hours. One audit trail, both sides.",
  },
];

// ──────────────────────────────────────────────────────────────
// Closing CTA
// ──────────────────────────────────────────────────────────────
export const closingCta = {
  eyebrow: "REQUEST A CELL",
  title: "Move one peril from your balance sheet this quarter.",
  sub:
    "Send us the exposure. We will come back with a trigger design, a collateral sizing, a cell structure, and an indicative 144A distribution path within ten business days.",
  primary: "Request a cell",
  secondary: "Talk to risk modelling",
};

// ──────────────────────────────────────────────────────────────
// Press
// ──────────────────────────────────────────────────────────────
export const pressQuotes = [
  {
    quote:
      "RYSKEX and Arx Veritas have unveiled the first tokenised climate parametric cell. Ten million ERUs are now on-chain.",
    source: "Captive International",
    context: "Arx Veritas launch coverage, Apr 2025",
  },
  {
    quote:
      "Parametric insurance the key to insuring intangible assets.",
    source: "Captive International",
    context: "Schmalbach's S&P 500 intangibles thesis",
  },
  {
    quote:
      "The $175 trillion capital market is 350 times the size of the reinsurance market.",
    source: "Captive.com",
    context: "Dr. Marcus Schmalbach, VCIA panel",
  },
  {
    quote:
      "RYSKEX unveils RYSKEX Consulting for parametric risk transfer solutions.",
    source: "Reinsurance News",
    context: "Consulting-arm launch, Nov 2023",
  },
];

// ──────────────────────────────────────────────────────────────
// Navigation
// ──────────────────────────────────────────────────────────────
export const nav = [
  { to: "/platform", label: "Platform" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/team", label: "Team" },
];
