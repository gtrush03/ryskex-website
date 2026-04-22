import Svg from "./_Svg";
import type { BrandIconProps } from "./types";

// Three tuned bars — top long, middle mid, bottom long — so the glyph reads
// as a deliberate hairline hamburger instead of the typical equal triplet.
export default function Menu(props: BrandIconProps) {
  return (
    <Svg {...props}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </Svg>
  );
}
