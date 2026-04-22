import Svg from "./_Svg";
import type { BrandIconProps } from "./types";

export default function X(props: BrandIconProps) {
  return (
    <Svg {...props}>
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </Svg>
  );
}
