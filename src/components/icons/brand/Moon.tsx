import Svg from "./_Svg";
import type { BrandIconProps } from "./types";

// Crescent — thin curve rather than lucide's chunkier bean. Reads better
// at 15px in the theme toggle.
export default function Moon(props: BrandIconProps) {
  return (
    <Svg {...props}>
      <path d="M20.25 14.5A8.25 8.25 0 0 1 9.5 3.75a8.25 8.25 0 1 0 10.75 10.75Z" />
    </Svg>
  );
}
