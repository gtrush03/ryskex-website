import { cn } from "@/lib/cn";

export default function Seal({
  size = 10,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn("inline-block rounded-full", className)}
      style={{
        width: size,
        height: size,
        background: "var(--accent)",
        boxShadow: "var(--shadow-seal)",
      }}
    />
  );
}
