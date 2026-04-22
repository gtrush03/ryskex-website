import Svg from "./_Svg";
import type { BrandIconProps } from "./types";

// 45-degree outbound arrow. Used for "Read the rail spec" and secondary CTAs.
export default function ArrowUpRight(props: BrandIconProps) {
  return (
    <Svg {...props}>
      <path d="M7 17 17 7" />
      <path d="M8.5 7H17v8.5" />
    </Svg>
  );
}
