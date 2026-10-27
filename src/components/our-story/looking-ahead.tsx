import { BlockTitle } from "@/components/ui/block-title";
import { PillText } from "@/components/ui/pill-text";
import { RisingSteps } from "@/components/ui/rising-steps";
import { lookingAhead } from "@/content/our-story";

export function LookingAhead() {
  return (
    <section aria-labelledby="ahead-title" className="on-dark section-space relative isolate overflow-hidden bg-night text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="texture-glow absolute inset-0" />
        <div className="texture-grain absolute inset-0 opacity-[0.07] mix-blend-overlay" />
        <RisingSteps className="absolute top-10 right-6 hidden w-24 md:block lg:top-16 lg:right-12 lg:w-32" />
      </div>

      <div className="container-site text-center">
        <p className="font-heading text-[0.75rem] font-semibold tracking-[0.16em] text-sun uppercase">[&nbsp;{lookingAhead.label}&nbsp;]</p>
        <BlockTitle id="ahead-title" lead={lookingAhead.title.lead} highlight={lookingAhead.title.highlight} fit className="mt-6 text-center text-h1" />

        <div data-reveal="stagger" className="mx-auto mt-12 grid max-w-5xl gap-px border border-white/10 bg-white/10 text-left sm:mt-14 md:grid-cols-3">
          {lookingAhead.paragraphs.map((paragraph) => (
            <p key={paragraph} className="bg-night p-6 text-white/75 sm:p-7">
              {paragraph}
            </p>
          ))}
        </div>

        <p data-reveal="up" className="mx-auto mt-14 max-w-5xl font-heading text-h2 leading-[1.2] font-semibold tracking-[-0.03em] text-white sm:mt-20 lg:text-h1 lg:leading-[1.15]">
          <PillText parts={lookingAhead.statement} />
        </p>
      </div>
    </section>
  );
}
