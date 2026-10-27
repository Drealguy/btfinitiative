import Image from "next/image";
import logo from "@/assets/brand/logo.png";

// The Beyond The Fall logo (trimmed, transparent background — for light backgrounds).
// The surrounding link carries the accessible name, so the image itself is decorative.
// `eager` for the header copy, which is above the fold on every page.
export function Logo({ className = "h-14 lg:h-16", eager = false }: { className?: string; eager?: boolean }) {
  return <Image src={logo} alt="" sizes="10rem" loading={eager ? "eager" : undefined} className={`w-auto ${className}`} />;
}
