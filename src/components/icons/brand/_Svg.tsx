import type { ReactNode } from "react";
import type { BrandIconProps } from "./types";

/**
 * Shared wrapper for brand icons. Handles the 24x24 viewBox, size, stroke
 * width and pass-through props so each glyph file stays focused on geometry.
 */
export default function Svg({
  size = 24,
  strokeWidth = 1.25,
  stroke = "currentColor",
  fill = "none",
  children,
  ...rest
}: BrandIconProps & { children: ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}
