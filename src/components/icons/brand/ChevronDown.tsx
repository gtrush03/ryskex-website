import Svg from "./_Svg";
import type { BrandIconProps } from "./types";

export default function ChevronDown(props: BrandIconProps) {
  return (
    <Svg {...props}>
      <path d="M6 9.5 12 15.5l6-6" />
    </Svg>
  );
}
