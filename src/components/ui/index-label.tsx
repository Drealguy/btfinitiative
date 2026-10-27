type Tone = "light" | "dark" | "accent";

// Text colours per background: light panels, dark panels, and mustard (accent) panels.
const tones: Record<Tone, { label: string; number: string }> = {
  light: { label: "text-muted", number: "text-primary-ink" },
  dark: { label: "text-white/70", number: "text-sun" },
  accent: { label: "text-ink/70", number: "text-ink" },
};

// Numbered panel label — "01 / Label" with the number picked out in the accent colour.
export function IndexLabel({ index, label, tone = "light", className = "" }: { index: string; label: string; tone?: Tone; className?: string }) {
  return (
    <p className={`font-heading text-[0.75rem] leading-snug font-semibold tracking-[0.14em] uppercase ${tones[tone].label} ${className}`}>
      <span className={tones[tone].number}>{index}</span> / {label}
    </p>
  );
}
