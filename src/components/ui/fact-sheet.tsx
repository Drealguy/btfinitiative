import type { ReactNode } from "react";

type Fact = { label: string; value: string };

// Small white fact card: label/value rows, with an optional footer (e.g. a button).
export function FactSheet({ facts, className = "", children }: { facts: readonly Fact[]; className?: string; children?: ReactNode }) {
  return (
    <div data-reveal="up" className={`on-light bg-surface text-sm shadow-[0_24px_48px_-24px_rgb(42_15_17/0.55)] ${className}`}>
      <dl>
        {facts.map((fact) => (
          <div key={fact.label} className="flex items-center justify-between gap-4 border-b border-line px-4 py-3 last:border-b-0">
            <dt className="font-heading text-[0.75rem] font-semibold tracking-[0.12em] text-muted uppercase">{fact.label}</dt>
            <dd className="text-right font-bold text-night">{fact.value}</dd>
          </div>
        ))}
      </dl>
      {children && <div className="border-t border-line p-4">{children}</div>}
    </div>
  );
}
