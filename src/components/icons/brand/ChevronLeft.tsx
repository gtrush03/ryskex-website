import Svg from "./_Svg";
import type { BrandIconProps } from "./types";

export default function ChevronLeft(props: BrandIconProps) {
  return (
    <Svg {...props}>
      <path d="M14.5 6 8.5 12l6 6" />
    </Svg>
  );
}
