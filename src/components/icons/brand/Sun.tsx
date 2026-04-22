import Svg from "./_Svg";
import type { BrandIconProps } from "./types";

// Central disc + 8 rays, hairline. Cardinal rays are slightly longer than
// diagonal ones — feels hand-drawn rather than mechanical.
export default function Sun(props: BrandIconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="3.75" />
      <path d="M12 2.5v2.25" />
      <path d="M12 19.25v2.25" />
      <path d="M4.5 12H2.25" />
      <path d="M21.75 12H19.5" />
      <path d="m5.1 5.1 1.6 1.6" />
      <path d="m17.3 17.3 1.6 1.6" />
      <path d="m5.1 18.9 1.6-1.6" />
      <path d="m17.3 6.7 1.6-1.6" />
    </Svg>
  );
}
