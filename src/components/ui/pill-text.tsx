import Image, { type StaticImageData } from "next/image";

export type PillPart = { text?: string; image?: StaticImageData };

// Text with photos set inline as rounded pills (decorative). Put it inside a heading or paragraph.
export function PillText({ parts }: { parts: readonly PillPart[] }) {
  return parts.map((part, index) =>
    part.image ? (
      <span
        key={index}
        aria-hidden="true"
        className="relative mx-[0.12em] inline-block h-[0.82em] w-[1.85em] translate-y-[0.08em] overflow-hidden rounded-full ring-1 ring-white/20"
      >
        <Image src={part.image} alt="" fill placeholder="blur" sizes="8rem" className="object-cover" />
      </span>
    ) : (
      <span key={index}> {part.text} </span>
    ),
  );
}
