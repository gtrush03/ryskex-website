/**
 * RouteSuspense
 *
 * Minimal, branded fallback for React.lazy route chunks.
 * - 2px cobalt progress bar fixed at top (indeterminate) — signals load, zero jank
 * - min-h-[60vh] spacer so the footer doesn't jump up during chunk fetch
 *
 * No layout shift on hydrate: the spacer collapses as soon as the real page
 * renders, and the top bar is `position: fixed` so it never reserves space.
 */
export default function RouteSuspense() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] overflow-hidden"
        style={{ background: "transparent" }}
      >
        <div
          className="h-full w-1/3"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, var(--accent, #3B72DE) 50%, transparent 100%)",
            animation: "rxs-indeterminate 1.1s ease-in-out infinite",
          }}
        />
      </div>
      <div className="min-h-[60vh]" aria-hidden />
      <style>{`
        @keyframes rxs-indeterminate {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </>
  );
}
