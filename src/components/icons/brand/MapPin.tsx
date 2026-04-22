import Svg from "./_Svg";
import type { BrandIconProps } from "./types";

// Teardrop pin with hollow center. Reads as a marker without the heavy
// lucide weight; pairs well with the 1.25px stroke.
export default function MapPin(props: BrandIconProps) {
  return (
    <Svg {...props}>
      <path d="M12 21s7-6.25 7-11.25a7 7 0 1 0-14 0C5 14.75 12 21 12 21Z" />
      <circle cx="12" cy="9.75" r="2.5" />
    </Svg>
  );
}
