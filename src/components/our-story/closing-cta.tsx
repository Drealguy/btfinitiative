import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/icons";
import { BlockTitle } from "@/components/ui/block-title";
import { GridBackdrop } from "@/components/ui/grid-backdrop";
import { IndexLabel } from "@/components/ui/index-label";
import { Tag } from "@/components/ui/tag";
import { closingCta } from "@/content/our-story";

const number = (index: number) => String(index + 1).padStart(2, "0");

// Closing call to action: one path per audience named in the copy. The first (getting
// support) is the primary action, so it is the dark tile.
export function ClosingCta() {
  return (
    <section aria-labelledby="closing-title" className="section-space relative isolate overflow-hidden border-t border-line bg-paper">
      <GridBackdrop />

      <div className="container-site grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
        <div>
          <Tag>{closingCta.label}</Tag>
          <BlockTitle id="closing-title" lead={closingCta.title.lead} highlight={closingCta.title.highlight} stagger fit="always" className="mt-6" />
          <p data-reveal="up" className="mt-6 max-w-xl text-lg text-muted">{closingCta.description}</p>
        </div>

        <ul data-reveal="stagger" className="grid gap-px border border-line bg-line">
          {closingCta.paths.map((path, index) => {
            const primary = index === 0;
            return (
              <li key={path.label} className="flex">
                <Link
                  href={path.href}
                  className={`group flex w-full items-center justify-between gap-6 p-5 transition-colors duration-300 sm:p-6 ${
                    primary ? "on-dark bg-night text-white hover:bg-night-deep" : "bg-surface text-night hover:bg-sun-tint"
                  }`}
                >
                  <span className="flex flex-col">
                    <IndexLabel tone={primary ? "dark" : "light"} index={number(index)} label={path.label} />
                    <span className="mt-2 font-heading text-h4 font-semibold tracking-tight">{path.text}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-3 font-bold">
                    <span className="hidden sm:inline">{path.cta}</span>
                    <span
                      className={`grid size-11 place-items-center rounded-full transition-colors duration-300 ${
                        primary ? "bg-primary text-primary-foreground" : "bg-night text-white group-hover:bg-primary group-hover:text-primary-foreground"
                      }`}
                    >
                      <ArrowUpRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      <span className="sr-only sm:hidden">{path.cta}</span>
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
