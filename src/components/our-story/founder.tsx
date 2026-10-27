import Image from "next/image";
import { BlockTitle } from "@/components/ui/block-title";
import { ButtonLink } from "@/components/ui/button-link";
import { RisingSteps } from "@/components/ui/rising-steps";
import { SteppedFrame } from "@/components/ui/stepped-frame";
import { Tag } from "@/components/ui/tag";
import { founder } from "@/content/our-story";

// Sets the platform name in a paragraph apart from the surrounding text.
function withProjectName(paragraph: string) {
  const [before, after] = paragraph.split("Beyond Before");
  if (after === undefined) return paragraph;
  return (
    <>
      {before}
      <em className="font-semibold text-white not-italic">Beyond Before</em>
      {after}
    </>
  );
}

export function Founder() {
  return (
    <section aria-labelledby="founder-title" className="on-dark section-space relative isolate overflow-hidden bg-night text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="texture-glow absolute inset-0" />
        <div className="texture-grain absolute inset-0 opacity-[0.07] mix-blend-overlay" />
        <RisingSteps className="absolute right-6 bottom-10 hidden w-20 opacity-60 md:block lg:right-12 lg:w-28" />
      </div>

      <div className="container-site grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 xl:gap-24">
        <figure className="relative mx-auto w-full max-w-md lg:max-w-none">
          <SteppedFrame frameClassName="aspect-[4/5]">
            <Image
              src={founder.image}
              alt={founder.imageAlt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 30rem, 28rem"
              className="object-cover object-top"
            />
          </SteppedFrame>
          <figcaption className="absolute bottom-4 left-4 inline-flex items-center gap-2 bg-surface px-3 py-2 font-heading text-[0.75rem] leading-none font-semibold tracking-[0.12em] text-night uppercase sm:bottom-5 sm:left-5">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-primary" />
            Abayomi Alvin · Founder
          </figcaption>
        </figure>

        <div>
          <Tag>{founder.label}</Tag>
          <BlockTitle id="founder-title" lead={founder.title.lead} highlight={founder.title.highlight} stagger fit className="mt-6 text-h1" />
          <p className="mt-6 font-heading text-[0.75rem] font-semibold tracking-[0.16em] text-sun uppercase">
            [&nbsp;{founder.role}&nbsp;]
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {founder.roles.map((role) => (
              <li
                key={role}
                className="border border-white/20 px-2 py-1 font-heading text-[0.75rem] leading-none font-semibold tracking-[0.12em] text-white/75 uppercase"
              >
                # {role}
              </li>
            ))}
          </ul>

          <div data-reveal="up" className="mt-8 space-y-4 text-white/75">
            {founder.bio.map((paragraph) => (
              <p key={paragraph}>{withProjectName(paragraph)}</p>
            ))}
          </div>

          <p data-reveal="up" className="mt-8 border-l-2 border-primary pl-4 font-heading text-h4 font-semibold tracking-tight text-white">
            {founder.closing}
          </p>

          <ButtonLink href={founder.cta.href} target="_blank" rel="noopener noreferrer" size="lg" variant="light" icon className="mt-9">
            {founder.cta.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
