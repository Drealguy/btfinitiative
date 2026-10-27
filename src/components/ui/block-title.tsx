import type { CSSProperties } from "react";
import { headingWidthEm } from "@/lib/text-metrics";

type BlockTitleProps = {
  lead: string;
  highlight: string;
  as?: "h1" | "h2";
  id?: string;
  /** Indent the highlight line so the two blocks step to the right. */
  stagger?: boolean;
  /**
   * Size the text so the lead and the highlight each fill one line of the available width.
   * `true`: phones only (size the heading with className elsewhere).
   * `"always"`: every width, up to `max`; don't pass a text size in className. Only use it
   * where the heading's column has a definite width (a grid track or full-width block).
   */
  fit?: boolean | "always";
  /** Largest size for fit="always" — any CSS length. */
  max?: string;
  /** "white" for headings on white sections: the lead block turns sun so it stays visible. */
  surface?: "tinted" | "white";
  className?: string;
};

const TRACKING = -0.035;
const PADDING_EM = 0.28; // px-[0.14em] on both sides of each block
const STAGGER_EM = { phones: 0.6, wide: 1.75 }; // matches pl-[0.6em] sm:pl-[1.75em]

// Heading set on solid blocks: the lead on white, the highlight on terracotta.
// Each wrapped line gets its own block (box-decoration-clone). Size it with className.
// Line height 1.3 matches Rethink Sans' background box, so stacked blocks meet exactly
// instead of overlapping (an overlap leaves slivers of white beside shorter lines).
export function BlockTitle({
  lead,
  highlight,
  as: Heading = "h2",
  id,
  stagger = false,
  fit = false,
  max = "4rem",
  surface = "tinted",
  className = "",
}: BlockTitleProps) {
  // Widest line in em (plus a little slack for rounding), so 100cqi / width fills the line.
  // Phones and wider screens differ only in how far the highlight line is indented.
  const widthEm = (indent: number) =>
    (Math.max(headingWidthEm(lead, TRACKING), headingWidthEm(highlight, TRACKING) + (stagger ? indent : 0)) + PADDING_EM) *
    1.03;

  const fitClass = {
    phones: "max-sm:text-[length:clamp(1.5rem,calc(100cqi/var(--fit-em-sm)),3rem)]",
    wide: "sm:text-[length:clamp(2.25rem,calc(100cqi/var(--fit-em)),var(--fit-max))]",
  };
  const fitStyle = { "--fit-em-sm": widthEm(STAGGER_EM.phones).toFixed(3), "--fit-em": widthEm(STAGGER_EM.wide).toFixed(3), "--fit-max": max };

  const heading = (
    <Heading
      id={id}
      data-reveal="title"
      style={fit ? (fitStyle as CSSProperties) : undefined}
      className={`leading-[1.3] tracking-[-0.035em] ${fit ? fitClass.phones : ""} ${fit === "always" ? fitClass.wide : ""} ${className}`}
    >
      <span className="block">
        <span className={`px-[0.14em] text-night box-decoration-clone ${surface === "white" ? "bg-sun-tint" : "bg-surface"}`}>
          {lead}
        </span>
      </span>
      <span className={`block ${stagger ? "pl-[0.6em] sm:pl-[1.75em]" : ""}`}>
        <span className="bg-primary px-[0.14em] text-primary-foreground box-decoration-clone">{highlight}</span>
      </span>
    </Heading>
  );

  // The wrapper is the size container. With fit={true} only on phones: from 640px headings
  // can sit in shrink-to-fit layouts, where a size container would collapse.
  if (!fit) return heading;
  return <div className={fit === "always" ? "@container" : "max-sm:@container"}>{heading}</div>;
}
