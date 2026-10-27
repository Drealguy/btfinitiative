import type { CSSProperties, ReactNode } from "react";
import { BrandSquare } from "@/components/ui/brand-square";

type SteppedFrameProps = {
  children: ReactNode;
  /** Size of one step — any CSS length. */
  step?: string;
  className?: string;
  /** Sizing for the clipped frame itself (aspect ratio, height). */
  frameClassName?: string;
};

// Photo frame cut into rising steps at the top-left and bottom-right corners,
// with brand squares sitting in the notches.
export function SteppedFrame({
  children,
  step = "clamp(1.25rem, 0.6rem + 2.4vw, 2.75rem)",
  className = "",
  frameClassName = "",
}: SteppedFrameProps) {
  return (
    <div data-reveal="image" className={`relative ${className}`} style={{ "--step": step } as CSSProperties}>
      <div className={`clip-steps relative overflow-hidden bg-night ${frameClassName}`}>{children}</div>
      <BrandSquare className="absolute top-0 left-0 size-(--step)" />
      <span aria-hidden="true" className="absolute right-0 bottom-0 size-(--step) bg-sun" />
    </div>
  );
}
