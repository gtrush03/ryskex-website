import Svg from "./_Svg";
import type { BrandIconProps } from "./types";

// Envelope with a V-fold flap. Rounded corners for the body, hairline fold.
export default function Mail(props: BrandIconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="5.5" width="18" height="13" rx="2.25" />
      <path d="m4 7.5 8 5.5 8-5.5" />
    </Svg>
  );
}
