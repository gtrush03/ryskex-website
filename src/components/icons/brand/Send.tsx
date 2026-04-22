import Svg from "./_Svg";
import type { BrandIconProps } from "./types";

// Paper-plane. The spec allows a filled arrowhead for Send — we keep the
// body hairline and fill the tip with currentColor so the silhouette reads
// at the 22px confirmation-screen size.
export default function Send(props: BrandIconProps) {
  return (
    <Svg {...props}>
      <path d="M21 3 10.5 13.5" />
      <path d="M21 3 14.5 21l-4-7.5L3 9.5Z" fill="currentColor" fillOpacity="0.12" />
    </Svg>
  );
}
