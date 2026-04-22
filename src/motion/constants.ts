// Unified motion rhythm for the RYSKEX site.
// Every hand-authored transition should pull ease + duration tokens from here
// so the cadence is consistent across heroes, reveals, hovers, and diagrams.
//
// Keep the tuples `as const` so Framer Motion infers the
// [number, number, number, number] cubic-bezier type.

// --- Eases ------------------------------------------------------------------

// Primary brand ease. Soft out-curve used for 90% of reveals, chips, buttons,
// hero copy, rail diagrams. Matches `--ease` in tokens.css.
export const EASE_OUT_SOFT = [0.2, 0.6, 0.2, 1] as const;

// Symmetrical in/out, used for looping ambient motion and rotating text.
export const EASE_IN_OUT = [0.45, 0, 0.55, 1] as const;

// Expo-out style curve, reserved for snappier reveals where the content
// should "arrive" rather than "settle."
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

// --- Durations (seconds) ----------------------------------------------------

// Tiny hover / state nudges.
export const DURATION_FAST = 0.2;

// Standard reveal / chip / CTA entrance.
export const DURATION_NORMAL = 0.5;

// Headline blur-ins, rail draws, longer reveals.
export const DURATION_SLOW = 0.7;

// Epic, slow-opening set pieces (globe arrivals, big ornaments).
export const DURATION_EPIC = 1.2;

// --- Stagger ----------------------------------------------------------------

// Per-child delay step for grid / list reveals.
export const STAGGER_CHILD = 0.06;
