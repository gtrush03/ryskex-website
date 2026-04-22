import Svg from "./_Svg";
import type { BrandIconProps } from "./types";

export default function Plus(props: BrandIconProps) {
  return (
    <Svg {...props}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </Svg>
  );
}
