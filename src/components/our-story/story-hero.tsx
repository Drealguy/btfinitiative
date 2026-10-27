import Image from "next/image";
import { BlockTitle } from "@/components/ui/block-title";
import { FactSheet } from "@/components/ui/fact-sheet";
import { GridBackdrop } from "@/components/ui/grid-backdrop";
import { SteppedFrame } from "@/components/ui/stepped-frame";
import { Tag } from "@/components/ui/tag";
import { storyHero } from "@/content/our-story";

export function StoryHero() {
  return (
    <section className="relative isolate overflow-hidden bg-paper">
      <GridBackdrop />

      <div className="container-site pt-8 pb-14 sm:pt-10 sm:pb-20 lg:pb-24">
        <div className="flex items-center justify-between gap-6">
          <Tag>{storyHero.eyebrow}</Tag>
          <p className="hidden font-heading text-[0.75rem] font-semibold tracking-[0.16em] text-muted uppercase sm:block">
            [&nbsp;{storyHero.note}&nbsp;]
          </p>
        </div>

        <div className="mt-8 grid items-center gap-10 sm:mt-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-14 xl:gap-20">
          <div>
            <BlockTitle
              as="h1"
              lead={storyHero.title.lead}
              highlight={storyHero.title.highlight}
              fit="always"
              max="5.5rem"
            />
            <p data-reveal="up" className="mt-7 max-w-xl text-lead text-muted">{storyHero.intro}</p>
            <p data-reveal="up" className="mt-6 max-w-xl border-l-2 border-primary pl-4 font-heading text-h4 font-semibold tracking-tight text-night">
              {storyHero.belief}
            </p>
            <p data-reveal="up" className="mt-6 max-w-xl text-muted">{storyHero.promise}</p>
          </div>

          <figure className="relative">
            <SteppedFrame frameClassName="aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/5] lg:max-h-[38rem]">
              <Image
                src={storyHero.image}
                alt={storyHero.imageAlt}
                fill
                preload
                placeholder="blur"
                sizes="(min-width: 80rem) 32rem, (min-width: 64rem) 40vw, 100vw"
                className="object-cover object-[50%_30%]"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-night-deep/45 to-transparent" />
            </SteppedFrame>
            <FactSheet
              facts={storyHero.facts}
              className="mt-3 sm:absolute sm:bottom-4 sm:left-4 sm:mt-0 sm:w-[19rem] lg:bottom-5 lg:left-5"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
