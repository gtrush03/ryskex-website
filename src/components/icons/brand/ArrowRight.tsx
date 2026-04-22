import Svg from "./_Svg";
import type { BrandIconProps } from "./types";

// Horizontal shaft, sharp chevron head. Slightly wider gap than lucide's
// for a cleaner feel at small CTA sizes.
export default function ArrowRight(props: BrandIconProps) {
  return (
    <Svg {...props}>
      <path d="M4.5 12h14" />
      <path d="M13 6.5 18.5 12 13 17.5" />
    </Svg>
  );
}
