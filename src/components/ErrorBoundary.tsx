import { Component, type ReactNode, type ErrorInfo, type CSSProperties } from "react";

/**
 * ErrorBoundary
 *
 * Catches render errors in the subtree and shows a branded fallback.
 * Uses inline styles so the fallback renders even if the CSS bundle fails
 * to load (worst-case route chunk error). React 19 still supports classic
 * class-based error boundaries — no new API needed.
 *
 * - `componentDidCatch` logs with a "[RYSKEX]" prefix. No analytics wired.
 * - Accepts an optional `fallback` prop to override the default UI.
 * - The Reload button calls window.location.reload(); "Go home" routes to "/".
 *   We use a plain anchor (not react-router <Link/>) because the router itself
 *   may be the thing that crashed.
 */

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

type State = {
  error: Error | null;
};

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // Branded log so it's easy to grep in browser consoles & session replays.
    // No reporting service to wire — this is the single stub point.
    // eslint-disable-next-line no-console
    console.error("[RYSKEX] Render error:", error, info?.componentStack);
  }

  private handleReload = (): void => {
    if (typeof window !== "undefined") window.location.reload();
  };

  render(): ReactNode {
    if (this.state.error === null) return this.props.children;
    if (this.props.fallback !== undefined) return this.props.fallback;

    // Inline-styled fallback — survives CSS-bundle failure.
    const wrap: CSSProperties = {
      minHeight: "100vh",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "48px 24px",
      background: "#070B14",
      color: "#F4F5F8",
      fontFamily:
        '"Geist Variable", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
    };

    const card: CSSProperties = {
      maxWidth: 560,
      width: "100%",
      textAlign: "center",
      background: "rgba(13, 18, 32, 0.72)",
      border: "1px solid rgba(244, 245, 248, 0.08)",
      borderRadius: 16,
      padding: "40px 32px",
      boxShadow:
        "0 24px 60px -28px rgba(0, 0, 0, 0.55), 0 2px 8px -3px rgba(0, 0, 0, 0.35)",
    };

    const wordmark: CSSProperties = {
      fontFamily:
        '"Instrument Serif", "Iowan Old Style", Georgia, serif',
      fontSize: 28,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "#F4F5F8",
      marginBottom: 24,
    };

    const eyebrow: CSSProperties = {
      display: "inline-block",
      fontFamily:
        '"Geist Mono Variable", ui-monospace, "SF Mono", Menlo, monospace',
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "#9AA1B2",
      padding: "6px 10px",
      border: "1px solid rgba(244, 245, 248, 0.14)",
      borderRadius: 999,
      marginBottom: 20,
    };

    const heading: CSSProperties = {
      fontFamily:
        '"Instrument Serif", "Iowan Old Style", Georgia, serif',
      fontSize: 42,
      lineHeight: 1.05,
      letterSpacing: "-0.02em",
      fontWeight: 400,
      margin: "0 0 16px",
      color: "#F4F5F8",
    };

    const body: CSSProperties = {
      fontSize: 15,
      lineHeight: 1.55,
      color: "#9AA1B2",
      margin: "0 0 28px",
    };

    const actions: CSSProperties = {
      display: "flex",
      gap: 12,
      justifyContent: "center",
      flexWrap: "wrap",
    };

    const btnPrimary: CSSProperties = {
      background: "#3B72DE",
      color: "#070B14",
      border: "1px solid #3B72DE",
      borderRadius: 999,
      padding: "10px 18px",
      fontSize: 14,
      fontWeight: 500,
      cursor: "pointer",
      fontFamily: "inherit",
    };

    const linkGhost: CSSProperties = {
      background: "transparent",
      color: "#F4F5F8",
      border: "1px solid rgba(244, 245, 248, 0.14)",
      borderRadius: 999,
      padding: "10px 18px",
      fontSize: 14,
      fontWeight: 500,
      textDecoration: "none",
      display: "inline-flex",
      alignItems: "center",
      fontFamily: "inherit",
    };

    return (
      <div role="alert" aria-live="assertive" style={wrap}>
        <div style={card}>
          <div style={wordmark}>RYSKEX</div>
          <div style={eyebrow}>500 · Render fault</div>
          <h1 style={heading}>Something broke.</h1>
          <p style={body}>
            A component failed to render. Refresh to continue — the exchange is
            still online.
          </p>
          <div style={actions}>
            <button type="button" onClick={this.handleReload} style={btnPrimary}>
              Reload
            </button>
            <a href="/" style={linkGhost}>
              Go home
            </a>
          </div>
        </div>
      </div>
    );
  }
}
