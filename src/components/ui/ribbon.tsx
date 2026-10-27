import { BrandSquare } from "@/components/ui/brand-square";

// Endless night ribbon of words with brand-square separators. Decorative, so hidden
// from assistive tech — repeat anything important elsewhere on the page.
export function Ribbon({ items }: { items: readonly string[] }) {
  return (
    <div aria-hidden="true" className="relative overflow-hidden bg-night py-4 sm:py-5 short:py-3">
      <div className="texture-grain absolute inset-0 opacity-[0.07] mix-blend-overlay" />
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-6 pr-6 font-heading text-h3 font-semibold tracking-tight whitespace-nowrap text-white sm:gap-9 sm:pr-9"
              >
                {item}
                <BrandSquare className="size-[0.6em]" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
