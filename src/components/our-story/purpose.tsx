import { BlockTitle } from "@/components/ui/block-title";
import { GridBackdrop } from "@/components/ui/grid-backdrop";
import { PixelText } from "@/components/ui/pixel-text";
import { Tag } from "@/components/ui/tag";
import { purpose } from "@/content/our-story";

const number = (index: number) => String(index + 1).padStart(2, "0");

export function Purpose() {
  const lastBelief = purpose.beliefs.length - 1;

  return (
    <section aria-labelledby="purpose-title" className="section-space relative isolate overflow-hidden border-t border-line bg-paper">
      <GridBackdrop />

      <div className="container-site">
        {/* Not a flex column: the fitted heading needs the full width to measure against. */}
        <div className="text-center">
          <Tag>{purpose.label}</Tag>
          <BlockTitle
            id="purpose-title"
            lead={purpose.title.lead}
            highlight={purpose.title.highlight}
            fit
            className="mt-6 text-center text-h1"
          />
        </div>

        {/* Three beliefs as numbered panels; the last one carries the section's core idea. */}
        <ol data-reveal="stagger" className="mt-12 grid gap-px border border-line bg-line sm:mt-16 lg:grid-cols-3">
          {purpose.beliefs.map((belief, index) => {
            const featured = index === lastBelief;
            return (
              <li
                key={belief}
                className={`flex min-h-56 flex-col gap-10 p-6 sm:p-8 lg:min-h-72 ${
                  featured ? "on-dark bg-night text-white" : "bg-surface text-night"
                }`}
              >
                <PixelText value={number(index)} className={`h-8 w-auto self-start sm:h-10 ${featured ? "text-sun" : "text-primary"}`} />
                <p className="mt-auto font-heading text-h4 font-semibold tracking-tight">{belief}</p>
              </li>
            );
          })}
        </ol>

        <div data-reveal="up" className="mx-auto mt-12 max-w-3xl text-center sm:mt-16">
          <p className="text-lg text-muted">{purpose.description}</p>
          <p className="mt-6 font-heading text-h3 font-semibold tracking-tight text-night">{purpose.closing}</p>
        </div>
      </div>
    </section>
  );
}
