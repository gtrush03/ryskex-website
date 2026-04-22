// Custom hairline SVG icons for the 6 platform rails. 28×28 viewBox,
// 1.25px strokes, round caps/joins, currentColor. One line language — no fills,
// no gradients. Replaces lucide for the feature-card icon slot.

const SW = 1.25;

function S({ children }: { children: React.ReactNode }) {
  return (
    <svg
      width={28}
      height={28}
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth={SW}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

// VUCAWRI — horizontal gauge with offset tick
export const GaugeIcon = () => (
  <S>
    <path d="M4 18 A10 10 0 0 1 24 18" />
    <path d="M4 18 L24 18" opacity="0.35" />
    <path d="M16 18 L20 10" />
    <circle cx="16" cy="18" r="1.3" fill="currentColor" stroke="none" />
    <path d="M4 22 L6 22 M22 22 L24 22" opacity="0.6" />
  </S>
);

// Trigger Library — hinged bracket, half-open
export const TriggerIcon = () => (
  <S>
    <path d="M5 8 L5 22 L12 22" />
    <path d="M12 22 L22 12" />
    <circle cx="12" cy="22" r="1.2" fill="currentColor" stroke="none" />
    <path d="M5 8 L11 4" opacity="0.5" />
    <path d="M22 12 L25 14" opacity="0.6" />
  </S>
);

// Sponsored Cell — hexagonal vault with internal subdivision
export const CellIcon = () => (
  <S>
    <path d="M14 3 L24 8.5 L24 19.5 L14 25 L4 19.5 L4 8.5 Z" />
    <path d="M14 3 L14 25" opacity="0.55" />
    <path d="M4 8.5 L24 19.5" opacity="0.25" />
  </S>
);

// On-chain Settlement — three linked nodes
export const ChainIcon = () => (
  <S>
    <circle cx="6" cy="14" r="3" />
    <circle cx="14" cy="14" r="3" />
    <circle cx="22" cy="14" r="3" />
    <path d="M9 14 L11 14" />
    <path d="M17 14 L19 14" />
  </S>
);

// 144A Distribution — fan (one input, multiple outputs)
export const FanIcon = () => (
  <S>
    <path d="M4 14 L10 14" />
    <circle cx="11" cy="14" r="1.2" fill="currentColor" stroke="none" />
    <path d="M11 14 L22 6" />
    <path d="M11 14 L24 10" />
    <path d="M11 14 L24 14" />
    <path d="M11 14 L24 18" />
    <path d="M11 14 L22 22" />
  </S>
);

// Veritas ex Machina — eye + gear composite (one line)
export const SealIcon = () => (
  <S>
    <circle cx="14" cy="14" r="10" />
    <circle cx="14" cy="14" r="4" />
    <circle cx="14" cy="14" r="1.2" fill="currentColor" stroke="none" />
    <path d="M14 4 L14 6 M14 22 L14 24 M4 14 L6 14 M22 14 L24 14" opacity="0.7" />
    <path d="M7 7 L8.5 8.5 M19.5 19.5 L21 21 M7 21 L8.5 19.5 M19.5 8.5 L21 7" opacity="0.5" />
  </S>
);

// Map by icon key (matches data.ts rails[i].icon)
export const RAIL_ICONS: Record<string, React.FC> = {
  gauge: GaugeIcon,
  trigger: TriggerIcon,
  cell: CellIcon,
  chain: ChainIcon,
  fan: FanIcon,
  seal: SealIcon,
};
