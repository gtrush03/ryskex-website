import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="mesh-hero grid-overlay flex min-h-[80vh] items-center justify-center pt-32 pb-24">
      <div className="container-x text-center">
        <div className="chip mb-8 inline-flex">404 · OFF-LEDGER</div>
        <h1 className="display-xl mx-auto max-w-[18ch] text-text">
          Page <span className="text-gradient">not routed.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-[16px] text-muted">
          The link you followed does not resolve on the current exchange.
          Return to the platform overview or contact the operator.
        </p>
        <div className="mt-10 flex justify-center gap-3">
          <Link to="/" className="btn-primary">
            Back to the exchange
          </Link>
          <Link to="/platform" className="btn-ghost">
            See the platform
          </Link>
        </div>
      </div>
    </section>
  );
}
