import type { SVGProps } from "react";

export interface BrandIconProps extends Omit<SVGProps<SVGSVGElement>, "width" | "height"> {
  /** Pixel size for both width and height. Default 24. */
  size?: number | string;
  /** Stroke width. Default 1.25 (hairline). */
  strokeWidth?: number | string;
}
