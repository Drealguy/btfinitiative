import type { ReactNode } from "react";

// Brand label: terracotta square marker + sun label, taken from the brand reference.
export function Tag({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span data-reveal="up" className={`inline-flex items-stretch font-heading text-[0.8125rem] leading-none font-semibold ${className}`}>
      <span aria-hidden="true" className="grid w-7 shrink-0 place-items-center bg-primary">
        <span className="size-2 bg-night" />
      </span>
      <span className="bg-sun px-2.5 py-1.5 text-night">{children}</span>
    </span>
  );
}
