import Svg from "./_Svg";
import type { BrandIconProps } from "./types";

export default function ChevronRight(props: BrandIconProps) {
  return (
    <Svg {...props}>
      <path d="M9.5 6 15.5 12l-6 6" />
    </Svg>
  );
}
