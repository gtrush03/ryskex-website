import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Send } from "@/components/icons/brand";
import { offices } from "@/lib/data";
import { ContactHero } from "@/components/hero-art";
import BlurIn from "@/motion/text/BlurIn";
import { EASE_OUT_SOFT } from "@/motion/constants";
import Meta from "@/components/Meta";

type Status = "idle" | "sending" | "sent";

const ROLES = [
  "Captive manager",
  "Broker",
  "Reinsurer",
  "Corporate risk",
  "ILS",
  "Academic",
  "Press",
  "Other",
];

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1200);
  }

  return (
    <>
      <Meta routeKey="/contact" />
      <section className="mesh-hero dark-scope relative overflow-hidden pt-24 pb-16 md:pt-44 md:pb-20">
        <div className="aurora" aria-hidden />
        <div className="noise" aria-hidden />
        <div
          aria-hidden
          className="orb orb-blue orb-drift pointer-events-none"
          style={{ top: "10%", left: "-100px", width: 480, height: 480, opacity: 0.30 }}
        />
        <div
          aria-hidden
          className="orb orb-green orb-drift-2 pointer-events-none"
          style={{ bottom: "5%", right: "-100px", width: 440, height: 440, opacity: 0.22 }}
        />
        <div className="container-x relative z-10 grid items-center gap-10 md:grid-cols-[1.3fr_1fr] md:gap-16">
          <BlurIn>
            <div className="chip mb-8 inline-flex">CONTACT</div>
            <h1
              className="display-lg max-w-[16ch] text-text"
              style={{ fontSize: "clamp(34px, 7vw, 84px)" }}
            >
              Two offices. <span className="text-gradient">One exchange.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-white/75 md:mt-8 md:text-[19px]">
              Institutional inquiries, cell-sponsorship requests, press and
              academic partnerships — route through the office closest to you.
              Replies within two business days from a named operator.
            </p>
          </BlurIn>
          <div className="mx-auto w-full max-w-[280px] md:max-w-lg">
            <ContactHero />
          </div>
        </div>
      </section>

      <section className="section-ambient relative py-16 md:py-24">
        <div
          aria-hidden
          className="orb orb-blue orb-drift pointer-events-none"
          style={{ top: "10%", left: "-120px", width: 460, height: 460, opacity: 0.18 }}
        />
        <div
          aria-hidden
          className="orb orb-green orb-drift-2 pointer-events-none"
          style={{ bottom: "5%", right: "-100px", width: 440, height: 440, opacity: 0.16 }}
        />
        <div className="container-x relative z-10 grid gap-10 md:grid-cols-[1.1fr_1fr] md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE_OUT_SOFT }}
          >
            <div className="glass-deep relative overflow-hidden rounded-[24px] p-6 md:p-12">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-20 -left-20 h-56 w-56 rounded-full"
                style={{ background: "var(--gradient-glow-orb-blue)", filter: "blur(48px)", opacity: 0.55 }}
              />
              {status === "sent" ? (
                <div className="relative z-10 py-10 text-center">
                  <div
                    className="mx-auto mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full"
                    style={{ background: "var(--accent-soft)" }}
                  >
                    <Send size={22} strokeWidth={1.75} className="text-accent" />
                  </div>
                  <h2 className="display-md text-text">Inquiry received.</h2>
                  <p className="mx-auto mt-4 max-w-md text-[15px] text-muted">
                    An operator will reply from a named RYSKEX address within
                    two business days.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="relative z-10 space-y-6">
                  <Field label="Full name">
                    <input
                      type="text"
                      required
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[14px] text-text outline-none transition-colors focus:border-accent"
                    />
                  </Field>
                  <Field label="Work email">
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[14px] text-text outline-none transition-colors focus:border-accent"
                    />
                  </Field>
                  <Field label="Organisation">
                    <input
                      type="text"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[14px] text-text outline-none transition-colors focus:border-accent"
                    />
                  </Field>
                  <Field label="Role">
                    <select
                      required
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[14px] text-text outline-none transition-colors focus:border-accent"
                    >
                      <option value="">Select your role</option>
                      {ROLES.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Peril or topic">
                    <input
                      type="text"
                      placeholder="Climate · cyber · political · innovation · reputation · equity"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[14px] text-text outline-none transition-colors focus:border-accent"
                    />
                  </Field>
                  <Field label="Message">
                    <textarea
                      rows={4}
                      required
                      className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[14px] text-text outline-none transition-colors focus:border-accent"
                      placeholder="Give us a sentence on the peril or the ask. Two lines is fine."
                    />
                  </Field>

                  <button
                    type="submit"
                    disabled={status !== "idle"}
                    className="btn-primary w-full justify-center"
                  >
                    {status === "idle" && (
                      <>
                        Send inquiry
                        <ArrowRight size={15} strokeWidth={2} />
                      </>
                    )}
                    {status === "sending" && "Sending…"}
                  </button>

                  <p className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-subtle">
                    Read every message during New York and London business
                    hours. Institutional inquiries routed to a named operator,
                    not a shared inbox.
                  </p>
                </form>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: EASE_OUT_SOFT }}
            className="space-y-6"
          >
            {offices.map((o) => (
              <div key={o.city} className="glass-deep relative overflow-hidden rounded-[22px] p-6 md:p-8">
                <div className="eyebrow mb-3">{o.country}</div>
                <h3
                  className="font-display text-[40px] leading-none text-text"
                  style={{ letterSpacing: "-0.025em" }}
                >
                  {o.city}
                </h3>
                <p className="mt-6 text-[14px] leading-relaxed text-text">
                  {o.address}
                </p>
                <p className="mt-3 text-[13px] italic leading-relaxed text-muted">
                  {o.role}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-border pt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  <span>{o.tz}</span>
                  <a
                    href={`tel:${o.phone.replace(/\s/g, "")}`}
                    className="tabular text-text transition-colors hover:text-accent"
                  >
                    {o.phone}
                  </a>
                </div>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-subtle">
                  By appointment only. Request a time via the form.
                </p>
              </div>
            ))}

            <div className="glass-deep relative overflow-hidden rounded-[22px] p-6 md:p-8">
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-16 -right-16 h-44 w-44 rounded-full"
                style={{ background: "var(--gradient-glow-orb-green)", filter: "blur(48px)", opacity: 0.55 }}
              />
              <div className="eyebrow mb-4">DIRECT ADDRESSES</div>
              <ul className="space-y-3 text-[13.5px]">
                {[
                  ["Cedents & captives", "desk@ryskex.io"],
                  ["Reinsurers & ILS", "capital@ryskex.io"],
                  ["Press & academia", "press@ryskex.io"],
                  ["General", "hello@ryskex.io"],
                ].map(([label, addr]) => (
                  <li
                    key={addr}
                    className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1"
                  >
                    <span className="text-muted">{label}</span>
                    <a href={`mailto:${addr}`} className="font-mono text-accent hover:underline">
                      {addr}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2.5 block font-mono text-[11px] uppercase tracking-[0.14em] text-muted md:mb-2">
        {label}
      </span>
      {children}
    </label>
  );
}
